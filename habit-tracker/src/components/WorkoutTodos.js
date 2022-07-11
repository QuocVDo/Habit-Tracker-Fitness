import React, { useState, useEffect } from 'react';
import { Checkbox, Container, Button } from '@mantine/core';
import '../styles/WorkoutTodos.css';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

export default function WorkoutTodos({ dateSelected, currUser }) {
  const [todaysWorkout, setTodaysWorkout] = useState([{}]);
  const [noWorkout, setNoWorkout] = useState(false);

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

    //Async Function to Fetch Data
    const fetchData = async () => {
      const q = query(
        collection(db, 'workout-todos'),
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

          //TODO: USE THE WORKOUT PLAN AND CREATE CHECKLIST

          console.log(plan);
          setNoWorkout(false);
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
          console.log(doc.id, ' =>', doc.data());
        });
      }
    };

    //Fetch the data
    fetchData();
  }, [currUser.uid, dateSelected]);

  function printDebug() {}

  return (
    <Container className="main-container" size="md" px="md">
      <Button onClick={printDebug}>DEBUG</Button>
      {noWorkout && <p>THERE"S NO PLAN PLACEHOLDER</p>}
      <Checkbox label="Default checkbox" />
      <Checkbox label="Indeterminate checkbox" />
      <Checkbox label="Checked checkbox" />
      <Checkbox disabled label="Disabled checkbox" />
      <Checkbox disabled label="Disabled checked checkbox" />
      <Checkbox
        disabled
        indeterminate
        label="Disabled indeterminate checkbox"
      />
    </Container>
  );
}
