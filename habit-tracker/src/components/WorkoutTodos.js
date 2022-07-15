import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  Container,
  Group,
  Divider,
  Badge,
  Tooltip,
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
  setDoc,
} from 'firebase/firestore';
import '../styles/WorkoutTodos.css';
import { db } from '../firebase';

export default function WorkoutTodos({
  dateSelected,
  currUser,
  updateWorkout,
  todaysDoc,
  setTodaysDoc,
  setProgressUpdate,
}) {
  const [todaysWorkout, setTodaysWorkout] = useState([]);
  const [noWorkout, setNoWorkout] = useState(false);
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

      //If there is no workout log create the todo list from workout plan
      //If there is no workout plan or the workout plan is empty then show noWorkout
      //Only push log to database for current DAY.
      if (
        querySnapshot.empty &&
        dateSelected.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
      ) {
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

          //IF THERE ARE NO WORKOUTS PLANNED for today, display message
          if (Object.keys(plan).length === 1 && plan[0].exercise === '') {
            setNoWorkout(true);
          }
          //If we succesfully created a workout, add to database if the day is today.
          else if (
            dateSelected.setHours(0, 0, 0, 0) ===
            new Date().setHours(0, 0, 0, 0)
          ) {
            setNoWorkout(false);

            const docRef = await addDoc(collection(db, 'workout-logs'), {
              uid: currUser.uid,
              date: dateSelected.toDateString(),
              log: log,
            }).then(setTodaysWorkout(log));
            setTodaysDoc(docRef.id);
          }
          //Else we created a workout, but the  date is not today so just display the plan
          //but don't  update database yet (OPTIMIZATION)
          else {
            setNoWorkout(false);
            setTodaysDoc(docRef.id);
            setTodaysWorkout(log);
          }
        }

        //If NO WORKOUT PLAN EXISTS, show message that
        //There is no workout planned for today. User would need to
        //Create a workout using Customize Workout
        else {
          setNoWorkout(true);
        }
      }

      //If no doc exists for a day in the past, display the NO Workout
      //There was no  workout planned for that day, and no workout logged for that day
      else if (
        querySnapshot.empty &&
        dateSelected.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
      ) {
        setNoWorkout(true);
      }

      //Else the query snapshot is not empty, pull the data from the database
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
  }, [currUser.uid, dateSelected, updateWorkout, setTodaysDoc]);

  //Update Checkboxes and Database in one go
  async function updateCheck(val, index) {
    let updatedWorkout = [...todaysWorkout];
    updatedWorkout[index].done = val;
    setTodaysWorkout(updatedWorkout);

    //Update workout-logs database: check off item.
    const docRef = doc(db, 'workout-logs', todaysDoc);
    await updateDoc(docRef, {
      log: updatedWorkout,
    });

    //Count the number of items complete.
    let numComplete = 0;
    for (const entry in updatedWorkout) {
      //Update numComplete every time we get a true option
      if (updatedWorkout[entry].done) {
        numComplete++;
      }
    }

    //Get docref for PROGRESS log database
    const docRefProgress = doc(db, 'workout-progress', currUser.uid);
    const docSnapProgress = await getDoc(docRefProgress);

    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    const currMonthYear = currMonth + '-' + currYear;
    const currDate = dateSelected.getDate();

    if (docSnapProgress.exists() && currMonthYear in docSnapProgress.data()) {
      let progressLog = docSnapProgress.data();

      //Remove the current day from progress log it is in the log, since you can only modify
      //the checklist of the current day, the current day is alsoways the  latest element.
      if (progressLog[currMonthYear]['complete'].includes(currDate)) {
        progressLog[currMonthYear]['complete'].pop();
      }
      if (progressLog[currMonthYear]['in_progress'].includes(currDate)) {
        progressLog[currMonthYear]['in_progress'].pop();
      }

      //If the number  of complete items = number of items in the workout
      //The day is complete add to complete.
      if (numComplete === Object.keys(updatedWorkout).length) {
        progressLog[currMonthYear]['complete'].push(currDate);
      }
      //Else if it is greater th an equal to 1 then add it to in_progress
      else if (numComplete >= 1) {
        progressLog[currMonthYear]['in_progress'].push(currDate);
      }

      //At this point we can now safely add the progressLog to the dtaabase.
      await setDoc(docRefProgress, progressLog).then(
        setProgressUpdate((e) => !e)
      );
    }
    //Print  error m essage
    else {
      console.error(
        'Error: No Progress Log found when updating progress/complete days'
      );
    }
  }

  return (
    <Container className="main-container" size="md" px="md">
      {noWorkout && (
        <Container className="no-workout" p="sm" size="md">
          <h2> No Workouts Today</h2>
          <p>
            We don't have any planned for the selected date. If you would like
            to plan a new workout, get started by pressing customize workout.
          </p>
        </Container>
      )}

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

          {dateSelected.toDateString() === new Date().toDateString() ? (
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
          ) : (
            <Group noWrap position="apart">
              <Tooltip label="You can only modify the workout log for today!">
                <Checkbox
                  size="md"
                  className="checkbox"
                  label={element.exercise}
                  checked={element.done}
                  onChange={(event) =>
                    updateCheck(event.currentTarget.checked, index)
                  }
                  disabled
                ></Checkbox>
              </Tooltip>

              <Badge radius="md">{element.reps + ' reps'}</Badge>
            </Group>
          )}
        </div>
      ))}
    </Container>
  );
}
