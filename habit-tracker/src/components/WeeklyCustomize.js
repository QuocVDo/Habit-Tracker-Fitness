import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import '../styles/WeeklyCustomize.css';
import {
  Tabs,
  Container,
  Button,
  Group,
  Input,
  NumberInput,
  Modal,
  Alert,
  LoadingOverlay,
  Tooltip,
  TextInput,
} from '@mantine/core';
import {
  FaExclamationTriangle,
  FaCheck,
  FaExclamationCircle,
} from 'react-icons/fa';
import { showNotification } from '@mantine/notifications';

export default function WeeklyCustomize({
  currUser,
  setShowCustomize,
  setProgressUpdate,
  todaysDoc,
}) {
  const [list, setList] = useState([{}]);
  const [noWorkout, setNoWorkout] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'workouts', currUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setList(docSnap.data());
      } else {
        setNoWorkout(true);
      }
    };

    fetchData();
  }, [currUser.uid]);

  function saveWorkout() {}

  return (
    <Container>
      <Modal
        size="md"
        centered
        opened={showModal}
        onClose={() => setShowModal(false)}
      >
        <Input placeholder="Workout Name (e.g Push/Pull/Legs)" />
        <Container size="sm" p="xs" className="task-item">
          <Input variant="default" placeholder="Exercise Name" />
          <Group noWrap style={{ marginTop: '0.5rem' }}>
            <NumberInput min={1} required description="Min: 1" label="Reps" />
            <NumberInput
              min={1}
              required
              description="Range:  1-30"
              max={30}
              label="Sets"
            />
            <NumberInput description="Optional" label="Weight (lb)" />
          </Group>
        </Container>
        <Group position="center" style={{ marginTop: '1rem' }}>
          <Button onClick={saveWorkout}>Save Workout</Button>
        </Group>
      </Modal>
      <Button
        onClick={() => {
          console.log(list);
          console.log(currUser.uid);
        }}
      >
        DEBUG
      </Button>
      {noWorkout && (
        <Container className="no-workout" p="sm" size="md">
          <h2> No Workouts Today</h2>
          <p>
            We don't have any planned for the selected date. If you would like
            to plan a new workout, get started by pressing customize workout.
          </p>
        </Container>
      )}
      {list.map((element, index) => (
        <div key="index">{element}</div>
      ))}
      <Group position="center" style={{ marginTop: '0.5rem' }}>
        <Button onClick={() => setShowModal(true)}>Add Workout</Button>
      </Group>
    </Container>
  );
}
