import React, { useState, useEffect } from 'react';
import { Tabs, Container, Button, Text } from '@mantine/core';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
          console.log(doc.id, ' => ', doc.data());

          //Add all documents to the list state
          setList((prevList) => [...prevList, doc.data()]);
        });
      }
    };

    fetchData();
  }, []);

  //DEBUG FUNCTION: print out all items within the l ist
  function printList() {
    list.forEach((element) => {
      //console.log(element);
      if (element.day === activeTab.toString()) {
        console.log(element);
      }
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
        <Button onClick={() => console.log(currTask)}>
          DEBUG: Print DayObject
        </Button>
        <TaskItem {...currTask}></TaskItem>
      </Container>
    );
  }

  function TaskItem({ day, uid, exercise, sets, reps, weight }) {
    return (
      <Container p="xs">
        <Text>Day: {day}</Text>
        <Text>Uid: {uid}</Text>
        <Text>Exercise: {exercise}</Text>
        <Text>Sets: {sets}</Text>
        <Text>Reps: {reps}</Text>
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
