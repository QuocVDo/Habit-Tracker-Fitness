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
import { doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

export default function Fitness({ setContentState, currUser }) {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [showCustomize, setShowCustomize] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [updateWorkout, setUpdateWorkout] = useState(false);
  const [todaysDoc, setTodaysDoc] = useState();

  //States for holding which days are rest days, which are complete, etc.
  const [restDays, setRestDays] = useState([]);
  const [completeDays, setCompleteDays] = useState([]);
  const [progressDays, setProgressDays] = useState([]);

  //On mount, retrieve  the data for progress
  useEffect(() => {
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    const currMonthYear = currMonth + '-' + currYear;

    //Async function to retrrieve data.
    async function fetchProgress() {
      //Search for this month's progress log
      const docRef = doc(db, 'workout-progress', currUser.uid);
      const docSnap = await getDoc(docRef);
      let progressLog = {};

      //If docSnap.exists() look to see if the current month is in there, if it isn't
      //then create one. Else we can just update  state
      if (docSnap.exists()) {
        progressLog = docSnap.data();

        //Else we need to add this current month  to the progressLog
        if (!(currMonthYear in progressLog)) {
          const arrays = {
            rest: [],
            complete: [],
            in_progress: [],
          };
          progressLog[currMonthYear] = arrays;
          await setDoc(docRef, progressLog);
        }

        //Update states
        setCompleteDays(progressLog[currMonthYear]['complete']);
        setRestDays(progressLog[currMonthYear]['rest']);
        setProgressDays(progressLog[currMonthYear]['in_progress']);
      }

      //Else we  need to make a fresh docSnap and add the current month
      else {
        //Custom object to  push to database, the monthYear is the key
        //The value is a set of arrays that keep track of completed, rest, and in progress days
        const arrays = {
          rest: [],
          complete: [],
          in_progress: [],
        };
        progressLog[currMonthYear] = arrays;
        await setDoc(docRef, progressLog);

        //Update states
        setCompleteDays(progressLog[currMonthYear]['complete']);
        setRestDays(progressLog[currMonthYear]['rest']);
        setProgressDays(progressLog[currMonthYear]['in_progress']);
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
  }, [currUser.uid]);

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
    //If date is in the completeDays array
    if (
      completeDays.includes(date.getDate()) &&
      date.getDate() !== dateSelected.getDate() &&
      date.getMonth() === dateSelected.getMonth()
    ) {
      return {
        backgroundColor: 'green',
        color: 'white',
        opacity: '0.7',
        borderRadius: '2px',
        border: '1px solid black',
      };
    }
    //If date is in the progress days
    else if (
      progressDays.includes(date.getDate()) &&
      date.getDate() !== dateSelected.getDate() &&
      date.getMonth() === dateSelected.getMonth()
    ) {
      return {
        backgroundColor: 'yellow',
        color: 'black',
        opacity: '0.6',
        border: '1px solid black',
        borderRadius: '2px',
      };
    }
  }

  //DEBUG
  function printDebug() {
    //Months are 0 - 11 (january - december)
    //console.log(dateSelected.getMonth());

    console.log(restDays);
    console.log(completeDays);
    console.log(progressDays);
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
              size="sm"
              firstDayOfWeek="sunday"
              value={dateSelected}
              weekendDays={[]}
              onChange={setDateSelected}
              dayStyle={(date) => colorDays(date)}
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
            dateSelected={dateSelected}
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
