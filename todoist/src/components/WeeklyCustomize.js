import React, { useState } from 'react';
import { Tabs, Container, Button, Text } from '@mantine/core';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function WeeklyCustomize({ currUser }) {
  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState([]);

  async function printThing() {
    const q = query(
      collection(db, 'Workouts'),
      where('uid', '==', currUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      console.log(doc.data().day);
    });
  }

  function TaskList({ day }) {
    return (
      <Container p="xs">
        <Button onClick={() => setList([{}])}>Clear</Button>
        <Button onClick={printThing}>Print</Button>
        {list.map((tasks, index) => (
          <TaskItem {...tasks} key={index} />
        ))}
        <Button onClick={addItem}>Add Item</Button>
      </Container>
    );
  }

  function addItem() {
    setList([
      ...list,
      {
        day: activeTab,
        uid: currUser.uid,
        exercise: 'exercise',
        sets: 'boys',
        reps: 'please',
        weight: 'work',
      },
    ]);
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
