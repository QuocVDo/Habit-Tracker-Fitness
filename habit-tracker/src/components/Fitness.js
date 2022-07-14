import React, { useState, useEffect } from 'react';
import {
  Paper,
  SimpleGrid,
  Center,
  ActionIcon,
  Title,
  Group,
  Button,
  Divider,
  Tooltip,
  Indicator,
} from '@mantine/core';
import { Calendar } from '@mantine/dates';
import {
  FaArrowLeft,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
  FaCloudDownloadAlt,
} from 'react-icons/fa';
import WeeklyCustomize from './WeeklyCustomize';
import WorkoutTodos from './WorkoutTodos';
import { db } from '../firebase';
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';

export default function Fitness({ setContentState, currUser }) {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [showCustomize, setShowCustomize] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [updateWorkout, setUpdateWorkout] = useState(false);
  const [todaysDoc, setTodaysDoc] = useState();

  //On mount, retrieve  the data for progress
  useEffect(() => {
    const month = dateSelected.getMonth() + 1;
    const year = dateSelected.getFullYear();
    const monthYear = month + '-' + year;

    //Async function to retrrieve data.
    async function fetchProgress() {
      const q = query(
        collection(db, 'workout-progress'),
        where('uid', '==', currUser.uid),
        where('date', '==', monthYear)
      );

      //Search for this month's progress log
      const querySnapshot = await getDocs(q);

      //If there isn't a progress log for this month then make one.
      if (querySnapshot.empty) {
        const newProgressLog = {
          uid: currUser.uid,
          date: monthYear,
          rest: [],
          completed: [],
          in_progress: [],
        };
        await addDoc(collection(db, 'workout-progress'), newProgressLog);
      }

      //Else there is already a progress log and therefore we should
      //retrieve the existing one.
      else {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      }
    }

    fetchProgress();

    /*
     * OP IDEA: Put a state in the sensitivty list, every time you add item
     * to one of the arrays, toggle that state which will force the calendar to update.
     *
     * Add to rest[] within Weekly Customize, if a day has only 1 item and that item is blank
     * its a rest day. Maybe make this have a font color that is  differnt from the others.
     *
     * Days that are skipped/no workout = just blank normal day
     *
     * In progress = Yellow, Completed = Green.
     *
     */
  }, [currUser.uid, dateSelected]);

  //Remove the workout for today.
  async function syncWorkout() {
    await deleteDoc(doc(db, 'workout-logs', todaysDoc)).then(
      setUpdateWorkout((e) => !e)
    );
  }

  //Function that can apply styles to the days.
  //Have an array of days that we want to style
  //If the array.includes(date.getDate()) then return the styling you want.
  function colorDays(date) {
    const array = [15, 16];
    if (
      array.includes(date.getDate()) &&
      date.getDate() !== dateSelected.getDate()
    ) {
      return { backgroundColor: 'green', color: 'white' };
    }
  }

  //DEBUG
  function printDebug() {
    //Months are 0 - 11 (january - december)
    //console.log(dateSelected.getMonth());

    console.log(currUser.uid);
  }

  return (
    <SimpleGrid cols={1}>
      <Paper shadow="sm" p="md">
        <Group>
          <Button onClick={printDebug}>DEBUG</Button>
          <ActionIcon onClick={() => setContentState(0)}>
            <FaArrowLeft size={20} />
          </ActionIcon>
          <ActionIcon
            style={{ marginLeft: 'auto' }}
            onClick={() => setShowCalendar((e) => !e)}
          >
            {showCalendar ? (
              <FaChevronUp title="Hide Calendar" />
            ) : (
              <FaChevronDown title="Show Calendar" />
            )}
          </ActionIcon>
        </Group>

        <Center>
          <Title order={3}> Fitness Tracker</Title>
        </Center>
        <Center>
          {showCalendar && (
            <Calendar
              firstDayOfWeek="sunday"
              value={dateSelected}
              weekendDays={[]}
              onChange={setDateSelected}
              dayStyle={(date) => colorDays(date)}
              renderDay={(date) => {
                const day = date.getDate();

                return (
                  <Indicator
                    size={6}
                    color="red"
                    offset={8}
                    disabled={date > 0}
                  >
                    <div>{day}</div>
                  </Indicator>
                );
              }}
            />
          )}
        </Center>
      </Paper>

      <Paper shadow="sm" p="md">
        <Group style={{ marginBottom: '1rem' }} grow>
          <Title order={4}>
            {!showCustomize ? (
              <Group noWrap position="apart">
                Today's Workout{' '}
                <Group noWrap>
                  {dateSelected.setHours(0, 0, 0, 0) ===
                    new Date().setHours(0, 0, 0, 0) && (
                    <Tooltip
                      withArrow
                      wrapLines
                      color="dark"
                      width={300}
                      position="bottom"
                      placement="end"
                      label="Clear today's workout log and sync any changes made to today's plan from the database."
                    >
                      <ActionIcon variant="light" onClick={syncWorkout}>
                        <FaCloudDownloadAlt />
                      </ActionIcon>
                    </Tooltip>
                  )}
                  <Button
                    variant="gradient"
                    size="xs"
                    onClick={() => setShowCustomize((e) => !e)}
                  >
                    Customize
                  </Button>
                </Group>
              </Group>
            ) : (
              <Group position="apart">
                Customize Workout
                <Tooltip
                  withArrow
                  wrapLines
                  width={400}
                  position="bottom"
                  placement="end"
                  label="Select the day  that you want to modify. Any changes you make will update the planned workouts for all FUTURE dates. In other words, the planned workouts won't show up for days that have already passed."
                >
                  <FaInfoCircle />
                </Tooltip>
              </Group>
            )}
          </Title>
        </Group>
        <Divider />

        {showCustomize ? (
          <WeeklyCustomize
            currUser={currUser}
            setShowCustomize={setShowCustomize}
          />
        ) : (
          <WorkoutTodos
            currUser={currUser}
            dateSelected={dateSelected}
            updateWorkout={updateWorkout}
            todaysDoc={todaysDoc}
            setTodaysDoc={setTodaysDoc}
          />
        )}
      </Paper>
    </SimpleGrid>
  );
}
