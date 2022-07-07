import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import '../styles/WeeklyCustomize.css';
import {
  Tabs,
  Container,
  Button,
  Group,
  Input,
  NumberInput,
  Center,
} from '@mantine/core';

export default function WeeklyCustomize({ currUser }) {
  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState([{}]);

  //Use Effect, When component mounts we  will fetch the
  //workout data from the database with matching UIDs
  useEffect(() => {
    const fetchData = async () => {
      //Get a reference to the doc, then fetch teh doc
      const docRef = doc(db, 'workouts', currUser.uid);
      const docSnap = await getDoc(docRef);

      //If the doc exists then we add to state
      if (docSnap.exists()) {
        setList(docSnap.data());
      }

      //If doc doesn't exist, create a new blank one for the user.
      else {
        //Create a new doc reference
        const newDocRef = doc(db, 'workouts', currUser.uid);

        //Create a new object to store do database
        const newList = {
          0: { exercise: '', reps: null, sets: null, weight: '' },
          1: { exercise: '', reps: null, sets: null, weight: '' },
          2: { exercise: '', reps: null, sets: null, weight: '' },
          3: { exercise: '', reps: null, sets: null, weight: '' },
          4: { exercise: '', reps: null, sets: null, weight: '' },
          5: { exercise: '', reps: null, sets: null, weight: '' },
          6: { exercise: '', reps: null, sets: null, weight: '' },
        };

        //Create new Doc with the new  values.
        await setDoc(newDocRef, newList, { merge: true }).then(() => {
          //After  doc has been sucesfully created we then add it to state
          setList(newList);
          console.log('Created New Doc');
        });
      }
    };

    fetchData();
  }, [currUser.uid]);

  //DEBUG FUNCTION: print out all items within the l ist
  function printList() {
    console.log(list);
  }

  //DEBUG FUNCTION: general purpose
  function printDebug() {
    //How to update an object state
    //Copy the state object using the  spread operator into new variable
    //Modify the new variable
    //Set the state  =  new variable.
    console.log('DEBUG');
    const newList = { ...list };
    newList[1].sets = 7;
    setList(newList);
  }

  function TaskList() {
    let currTask = list[activeTab];
    return (
      <Container p="xs">
        <Button onClick={() => setList([{}])}>Clear</Button>
        <Button onClick={printList}>DEBUG: Print value of list</Button>
        <Button onClick={printDebug}>DEBUG</Button>
        <TaskItem {...currTask}></TaskItem>
        <Center>
          <Button className="save-button" onClick={updateDatabase}>
            Save Changes
          </Button>
        </Center>
      </Container>
    );
  }

  //PUSH CHANGES TO DATABASE
  async function updateDatabase() {
    const docRef = doc(db, 'workouts', currUser.uid);

    //Merge will add to the old document.  The changes we push are the
    //updated list object which contains all the new state information.
    await setDoc(docRef, list, { merge: true }).then(() => {
      console.log('Updated Doc');
    });
  }

  //Each exercise get's a task  item to render.
  //An exercise is stored as an object with properties: exercise, reps, sets, weight
  function TaskItem({ exercise, reps, weight, sets }) {
    //Function to update exercise
    function updateExercise(exercise) {
      const newList = { ...list };
      newList[activeTab].exercise = exercise;
      setList(newList);
    }

    //Function to update sets
    function updateSets(sets) {
      const newList = { ...list };
      newList[activeTab].sets = sets;
      setList(newList);
    }

    //Function to update reps
    function updateReps(reps) {
      const newList = { ...list };
      newList[activeTab].reps = reps;
      setList(newList);
    }

    //Function to update weight
    function updateWeight(weight) {
      const newList = { ...list };
      newList[activeTab].weight = weight;
      setList(newList);
    }
    return (
      <Container size="sm" p="md" className="task-item">
        <Input
          value={exercise}
          onChange={(e) => updateExercise(e.target.value)}
          title="Exercise"
          variant="default"
          autoFocus
          placeholder="Bench Press..."
        />
        <Group noWrap style={{ marginTop: '0.5rem' }}>
          <NumberInput
            value={reps}
            onChange={(val) => updateReps(val)}
            label="Reps"
          />
          <NumberInput
            value={sets}
            onChange={(val) => updateSets(val)}
            label="Sets"
          />
          <NumberInput
            value={weight}
            onChange={(val) => updateWeight(val)}
            label="Weight"
          />
        </Group>
        <Group noWrap position="center" style={{ marginTop: '0.5rem' }}>
          <Button size="xs">+</Button>
          <Button size="xs">-</Button>
        </Group>
      </Container>
    );
  }

  return (
    <Tabs
      active={activeTab}
      onTabChange={setActiveTab}
      grow
      style={{ marginTop: '1rem' }}
      variant="default"
      tabPadding="xs"
    >
      <Tabs.Tab label="Sun">
        <TaskList />
      </Tabs.Tab>
      <Tabs.Tab label="Mon">
        <TaskList />
      </Tabs.Tab>
      <Tabs.Tab label="Tue">
        <TaskList />
      </Tabs.Tab>
      <Tabs.Tab label="Wed">
        <TaskList />
      </Tabs.Tab>
      <Tabs.Tab label="Thu">
        <TaskList />
      </Tabs.Tab>
      <Tabs.Tab label="Fri">
        <TaskList />
      </Tabs.Tab>
      <Tabs.Tab label="Sat">
        <TaskList />
      </Tabs.Tab>
    </Tabs>
  );
}
