import React, { useState, useEffect } from 'react';
import { Tabs, Container, Button, Text } from '@mantine/core';
import { db } from '../firebase';
import { getDoc, doc, setDoc } from 'firebase/firestore';

export default function WeeklyCustomize({ currUser }) {
  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState({});

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

  function TaskList() {
    let currTask = list[activeTab];
    return (
      <Container p="xs">
        <Button onClick={() => setList([{}])}>Clear</Button>
        <Button onClick={printList}>DEBUG: Print value of list</Button>
        <TaskItem {...currTask}></TaskItem>
      </Container>
    );
  }

  //PUSH CHANGES TO DATABASE
  //Takes in the id of the doc we want to modify
  //containing the changes
  async function updateDatabase() {
    const docRef = doc(db, 'Workouts', currUser.uid);
    //Merge will add to the old document.
    await setDoc(docRef, { reps: 10 }, { merge: true }).then(() => {
      console.log('Updated Doc');
    });
  }

  function TaskItem({ exercise, reps, weight }) {
    return (
      <Container p="xs">
        <Text>Exercise: {exercise}</Text>
        <Text>Reps: {reps}</Text>
        <Text>Weight: {weight}</Text>
        <Button onClick={updateDatabase}>Save Changes</Button>
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
