import React, { useState, useEffect } from 'react';
import { Tabs, Container, Button, Text, Input } from '@mantine/core';
import { db } from '../firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';

export default function WeeklyCustomize({ currUser }) {
  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState([]);

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
      //If doc doesn't exist, log that it doesn't exist
      //Ideally we need to create a new doc and add it to state.
      else {
        console.log('Query does not exist', currUser.uid);
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
    /* FOR UPDATING A STATE ARRAY IN
    const newListState = [...list];
    newListState[0].exercise = 'Bench Press';
    setList(newListState);
    */

    const newList = { ...list };
    newList[0].exercise = 'Super Bench Press';
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
        <Button onClick={updateDatabase}>Save Changes</Button>
      </Container>
    );
  }

  //PUSH CHANGES TO DATABASE
  async function updateDatabase() {
    const docRef = doc(db, 'workouts', currUser.uid);

    //Merge will add to the old document.

    await setDoc(docRef, list, { merge: true }).then(() => {
      console.log('Updated Doc');
    });
  }

  function TaskItem({ exercise, reps, weight, sets }) {
    return (
      <Container size="md" p="xs">
        <Input placeholder="exercise"></Input>
        <Text>Exercise: {exercise}</Text>
        <Text>Reps: {reps}</Text>
        <Text> Sets: {sets} </Text>
        <Text>Weight: {weight}</Text>
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
