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
  Modal,
  Alert,
} from '@mantine/core';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function WeeklyCustomize({ currUser, setShowCustomize }) {
  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState([{}]);
  const [forceRender, setForceRender] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

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

        //Create a new object to store to database
        //Object of Objects of Objects
        //The workout object has labels 0 - 6 which correspond to Sun through Sat
        //newList[0] = Sunday's Workout.
        //Each workout consists of an exercise object
        //Each exercise object has props: exercise, reps, set, and weight
        const newList = {
          0: { 0: { exercise: '', reps: null, sets: null, weight: '' } },
          1: { 0: { exercise: '', reps: null, sets: null, weight: '' } },
          2: { 0: { exercise: '', reps: null, sets: null, weight: '' } },
          3: { 0: { exercise: '', reps: null, sets: null, weight: '' } },
          4: { 0: { exercise: '', reps: null, sets: null, weight: '' } },
          5: { 0: { exercise: '', reps: null, sets: null, weight: '' } },
          6: { 0: { exercise: '', reps: null, sets: null, weight: '' } },
        };

        //Create new Doc with the new  values.
        await setDoc(newDocRef, newList).then(() => {
          //After  doc has been sucesfully created we then add it to state
          setList(newList);
          console.log('Created New Doc');
        });
      }
    };

    fetchData();
  }, [currUser.uid]);

  function TaskList() {
    //Turn object of objects into array of objects so we can use map()
    let currTask = Object.values(list[activeTab]);

    //Function to add new exercises
    function addExercise(index) {
      if (forceRender) {
      }
      let newList = list;
      newList[activeTab][index + 1] = {
        exercise: '',
        reps: null,
        sets: null,
        weight: '',
      };

      //Update list state as well as currTask
      setList(newList);
      setForceRender((e) => !e);
    }

    //Function for removing exercise
    function removeExercise(index) {
      let newList = list;
      delete newList[activeTab][index];
      setList(newList);
      setForceRender((e) => !e);
    }

    //Function for updating the exercise field
    function updateExercise(value, index) {
      let newList = list;
      newList[activeTab][index].exercise = value;
      setList(newList);
    }

    //Function for updating the reps field
    function updateReps(value, index) {
      let newList = list;
      newList[activeTab][index].reps = value;
      setList(newList);
    }

    //Function for updating the sets field
    function updateSets(value, index) {
      let newList = list;
      newList[activeTab][index].sets = value;
      setList(newList);
    }

    //Function for updating the weight field
    function updateWeight(value, index) {
      let newList = list;
      newList[activeTab][index].weight = value;
      setList(newList);
    }

    return (
      <Container p="xs">
        {currTask.map((element, index) => (
          <Container key={index} size="sm" p="xs" className="task-item">
            <Input
              defaultValue={element.exercise}
              onChange={(e) => updateExercise(e.target.value, index)}
              variant="default"
              placeholder="Exercise Name"
            />
            <Group noWrap style={{ marginTop: '0.5rem' }}>
              <NumberInput
                defaultValue={element.reps}
                onChange={(val) => updateReps(val, index)}
                label="Reps"
              />
              <NumberInput
                defaultValue={element.sets}
                onChange={(val) => updateSets(val, index)}
                label="Sets"
              />
              <NumberInput
                defaultValue={element.weight}
                onChange={(val) => updateWeight(val, index)}
                label="Weight"
              />
            </Group>
            {currTask.length - 1 === index && (
              <Group noWrap position="center" style={{ marginTop: '0.5rem' }}>
                <Button size="xs" onClick={() => addExercise(index)}>
                  +
                </Button>
                {currTask.length > 1 && (
                  <Button onClick={() => removeExercise(index)} size="xs">
                    -
                  </Button>
                )}
              </Group>
            )}
          </Container>
        ))}

        <Group position="center">
          <Button className="save-button" onClick={updateDatabase}>
            Save Changes
          </Button>
          <Button
            className="save-button"
            color="red"
            onClick={() => setCancelModal(true)}
          >
            Cancel
          </Button>
        </Group>
      </Container>
    );
  }

  //PUSH CHANGES TO DATABASE
  async function updateDatabase() {
    const docRef = doc(db, 'workouts', currUser.uid);

    //Merge will add to the old document.  The changes we push are the
    //updated list object which contains all the new state information.
    await setDoc(docRef, list).then(() => {
      console.log('Updated Doc');
    });
  }

  return (
    <div>
      <Modal
        size="md"
        centered
        opened={cancelModal}
        onClose={() => setCancelModal(false)}
      >
        <Alert icon={<FaExclamationTriangle />} title="Cancel Confirmation">
          Any changes you've made will be lost. Are you sure you want to cancel
          your customization?
        </Alert>

        <Group className="button-group" position="center" grow>
          <Button onClick={() => setCancelModal(false)}>Keep Editing</Button>
          <Button color="red" onClick={() => setShowCustomize(false)}>
            Don't Save
          </Button>
        </Group>
      </Modal>
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
    </div>
  );
}
