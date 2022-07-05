import React, { useState, useEffect } from 'react';
import { Tabs, Container, Button, Text } from '@mantine/core';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';

export default function WeeklyCustomize({ currUser }) {
  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState([]);

  //Use Effect, When component mounts we  will fetch the
  //workout data from the database with matching UIDs
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, 'Workouts'),
        where('uid', '==', currUser.uid)
      );

      const querySnapshot = await getDocs(q);
      //If query from database is empty log that it is empty for now
      //ideally we show a message to the user that they need to  customize
      if (querySnapshot.empty) {
        console.log('QUERY IS EMPTY');
      }
      //If query from database is not empty then we add to list
      else {
        querySnapshot.forEach((doc) => {
          // Print all documents with matching uid
          //console.log(doc.id, ' => ', doc.data());

          //Create a new object that  contains doc data + doc id
          //we use the doc id in order to update/delete the doc later
          let newItem = doc.data();
          newItem['docId'] = doc.id;

          //Add all documents to the list state
          setList((prevList) => [...prevList, newItem]);
        });
      }
    };

    fetchData();
  }, [currUser.uid]);

  //DEBUG FUNCTION: print out all items within the l ist
  function printList() {
    list.forEach((element) => {
      console.log(element);
    });
  }

  function TaskList() {
    let currTask;
    list.forEach((element) => {
      //console.log(element);
      if (element.day === activeTab.toString()) {
        currTask = element;
      }
    });
    return (
      <Container p="xs">
        <Button onClick={() => setList([{}])}>Clear</Button>
        <Button onClick={printList}>DEBUG: Print value of list</Button>
        <TaskItem {...currTask}></TaskItem>
      </Container>
    );
  }

  //PUSH CHANGES TO DATABASE
  //Takes in a reference to the doc we want to modify, as well as the object
  //containing the changes
  async function updateDoc(docRef) {
    //Merge will add to the old document.
    await setDoc(docRef, { reps: 10 }).then(() => {
      console.log('Updated Doc');
    });
  }

  function TaskItem({ day, uid, exercise, sets, reps, weight, docId }) {
    const docRef = doc(db, 'Workouts', docId);

    return (
      <Container p="xs">
        <Text>Day: {day}</Text>
        <Text>DocId: {docId}</Text>
        <Text>Uid: {uid}</Text>
        <Text>Exercise: {exercise}</Text>
        <Text>Sets: {sets}</Text>
        <Text>Reps: {reps}</Text>
        <Text>Weight: {weight}</Text>
        <Button onClick={() => updateDoc(docRef)}>Save Changes</Button>
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
