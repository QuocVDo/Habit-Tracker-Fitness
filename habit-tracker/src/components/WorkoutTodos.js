import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  Container,
  Button,
  Group,
  Divider,
  Badge,
} from '@mantine/core';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import '../styles/WorkoutTodos.css';
import { db } from '../firebase';

export default function WorkoutTodos({ dateSelected, currUser }) {
  const [todaysWorkout, setTodaysWorkout] = useState([]);
  const [noWorkout, setNoWorkout] = useState(false);
  const [todaysDoc, setTodaysDoc] = useState();
  const [indexArray, setIndexArray] = useState([]);

  //Use Effect Function, fire upon component render
  useEffect(() => {
    //Constants used for Translating from Date to Object Key
    const dateConstants = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    //Every time we update the dependency, (select a new date) clear state
    setTodaysWorkout([]);
    setIndexArray([0]);
    setTodaysDoc();

    //Async Function to Fetch Data
    const fetchData = async () => {
      const q = query(
        collection(db, 'workout-logs'),
        where('uid', '==', currUser.uid),
        where('date', '==', dateSelected.toDateString())
      );

      //Search for selected d ate's workout log
      const querySnapshot = await getDocs(q);

      //If we looked for selected date's workout log, and found nothing
      //We need to create a new one from the workout plan.
      if (querySnapshot.empty) {
        //Fetch the workout plan
        const docRef = doc(db, 'workouts', currUser.uid);
        const docSnap = await getDoc(docRef);

        //If the WORKOUT PLAN exists, CREATE the workout-todos log
        if (docSnap.exists()) {
          //Get the appropriate workout for the day of the week
          let plan =
            docSnap.data()[
              dateConstants[dateSelected.toDateString().slice(0, 3)]
            ];

          let log = [];

          //TODO: USE THE WORKOUT PLAN AND CREATE CHECKLIST
          for (const entry in plan) {
            let workout = plan[entry];

            //DEBUG: Log exercise object {exercise, reps, set, weight}
            //console.log(workout);
            //Only add exercises that  are not  empty/null
            if (workout.exercise !== '') {
              for (let i = 0; i < workout.sets; i++) {
                let todoEntry = {
                  exercise: workout.exercise,
                  reps: workout.reps,
                  weight: workout.weight + ' lbs',
                  done: false,
                };

                //Don't show weight for  exercises with no weight
                if (workout.weight === '') {
                  todoEntry.weight = '';
                }

                //Add an index for the seperator  between different exercises
                log = [...log, todoEntry];
              }

              //UpdateIndexArray
              setIndexArray((prev) => [
                ...prev,
                Number(prev.at(-1)) + workout.sets,
              ]);
            }
          }

          //Remove last index so there is no divider after last workout
          //setIndexArray((prev) => [...prev].slice(0, -1));

          //IF THERE ARE NO WORKOUTS PLANNED for today, display message
          if (Object.keys(plan).length === 1 && plan[0].exercise === '') {
            setNoWorkout(true);
          }
          //otherwise we have Succesfully created a workout plan, now we add to database as well
          //Update the state with the generated log
          else {
            setNoWorkout(false);

            const docRef = await addDoc(collection(db, 'workout-logs'), {
              uid: currUser.uid,
              date: dateSelected.toDateString(),
              log: log,
            }).then(setTodaysWorkout(log));
            setTodaysDoc(docRef.id);
          }
        }

        //If NO WORKOUT PLAN EXISTS, show message that
        //There is no workout planned for today. User would need to
        //Create a workout using Customize Workout
        else {
          setNoWorkout(true);
        }
      }

      //If a doc already exists, retrieve the data then populate values.
      else {
        querySnapshot.forEach((doc) => {
          let log = doc.data().log;
          let temp = '';

          //Find where the  dividers are supposed to be placed
          for (let i = 0; i < log.length; i++) {
            if (log[i].exercise !== temp) {
              temp = log[i].exercise;
              setIndexArray((prev) => [...prev, i]);
            }
          }

          //Set the state to the data that we retrieved
          setTodaysWorkout(log);

          //Set the doc ID
          setTodaysDoc(doc.id);

          //Make sure that the No Workout is disabled
          setNoWorkout(false);
        });
      }
    };

    //Fetch the data
    fetchData();
  }, [currUser.uid, dateSelected]);

  function printDebug() {
    console.log(todaysWorkout);
    console.log(todaysDoc);
  }

  //Update Checkboxes and Database in one go
  async function updateCheck(val, index) {
    let updatedWorkout = [...todaysWorkout];
    updatedWorkout[index].done = val;
    setTodaysWorkout(updatedWorkout);

    //Update Database
    const docRef = doc(db, 'workout-logs', todaysDoc);
    await updateDoc(docRef, {
      log: updatedWorkout,
    });
  }

  return (
    <Container className="main-container" size="md" px="md">
      <Button onClick={printDebug}>DEBUG</Button>
      {noWorkout && <p>THERE"S NO PLAN PLACEHOLDER</p>}

      {todaysWorkout.map((element, index) => (
        <div className="todo-item" key={index}>
          {indexArray.includes(index) && (
            <Divider
              className="divider"
              labelPosition="center"
              label={element.weight}
              size="sm"
              variant="dashed"
            />
          )}
          <Group noWrap position="apart">
            <Checkbox
              size="md"
              className="checkbox"
              label={element.exercise}
              checked={element.done}
              onChange={(event) =>
                updateCheck(event.currentTarget.checked, index)
              }
            ></Checkbox>

            <Badge radius="md">{element.reps + ' reps'}</Badge>
          </Group>
        </div>
      ))}
    </Container>
  );
}
