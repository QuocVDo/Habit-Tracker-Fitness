import React from 'react';
import {
  Paper,
  Title,
  Divider,
  Accordion,
  ThemeIcon,
  Text,
  Space,
  List,
} from '@mantine/core';
import { FaUserAlt, FaListAlt, FaCalendarAlt } from 'react-icons/fa';

export default function GettingStartedContent() {
  return (
    <Paper shadow="md" p="md">
      <Title order={2}>Getting Started</Title>
      <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
      <Accordion multiple disableIconRotation>
        <Accordion.Item
          label={<Text weight={700}>Account Creation</Text>}
          icon={
            <ThemeIcon color="violet" variant="light">
              <FaUserAlt />
            </ThemeIcon>
          }
        >
          In order to get started using the Habit Tracker, you will first need
          to make an account. You can either register a new account using your
          email by clicking the "Sign Up" button within the top bar.
          <Space h="md" />
          Alternatively you can register an account by signing in with your
          Google account. To do this you can click on the "Sign In" button, and
          then press the button that will allow you to Sign in with your Google
          acccount.
          <Space h="md" />
          Once you have made an account and signed in, you are now ready to
          begin using the Habit Tracker!
        </Accordion.Item>
        <Accordion.Item
          label={<Text weight={700}>Habit Tracking Basics</Text>}
          icon={
            <ThemeIcon color="cyan[4]" variant="light">
              <FaListAlt />
            </ThemeIcon>
          }
        >
          The Habit Tracker is split into three basic trackers. The first
          tracker is the Fitness Tracker. With the fitness tracker you can
          create customized workout plans and then track your progress over time
          as you complete your workouts.
          <Space h="md" />
          The second tracker is the Diet tracker. In a similar vein to the
          fitness tracker you will be able to create customized diet plans,{' '}
          {'(by configuring daily macronutrient targets)'} and then log what you
          ate in order to track your nuitrition over time.
          <Text color="red">This feature is still work in progress</Text>
          <Space h="md" />
          The last tracker is the Custom Habit Tracker. Here you can create a
          custom habit that you want to begin tracking as well as when you want
          to perform that habit. For example, if you want to start a daily
          meditation practice, you can set easily add this as a custom habit and
          track your adherence over time.
          <Text color="red">This feature is still work in progress</Text>
        </Accordion.Item>
        <Accordion.Item
          label={<Text weight={700}>The Fitness Tracker</Text>}
          icon={
            <ThemeIcon color="orange" variant="light">
              <FaCalendarAlt />
            </ThemeIcon>
          }
        >
          The first type of habit tracker is the fitness tracker which allows
          you to create customized workouts and check off sets as you complete
          them. Your progress is logged and can be viewed at a later date so you
          can track your progress. In order to use the fitness tracker here are
          some things to keep in mind:
          <Space h="md" />
          <List spacing="md" size="md" center type="ordered">
            <List.Item>
              By default you will have no workout plan set. In order to get
              started using the Fitness Tracker, press the "Customize Workout"
              Button and create a workout plan.
            </List.Item>
            <List.Item>
              Any exercise box with a blank exercise name will be ignored in the
              workout plan.
            </List.Item>
            <List.Item>
              If you fill out a name for an exercise, it will be treated as a
              valid exercise and you must also fill out the number of sets and
              reps for that exercise in order to proceed.
            </List.Item>
            <List.Item>
              Not all days need to have an exercise planned! If there are no
              planned exercises it will be marked as a 'rest day' and will turn
              blue on the Calendar tracker.
            </List.Item>
            <List.Item>
              After you have created a plan, the tracker will update the
              Calendar with a todo-list of workouts that you set. You are only
              allowed to modify the workout todo-list for the current day. As
              you complete sets of your planned workout, you should check off
              the corresponding items from the todo-list.
            </List.Item>
            <List.Item>
              The tracker will then update the calendar with a visual indicator
              of your progress for the day. A workout that has at least 1
              todo-item complete will turn yellow on the calendar meaning "in
              progress". If you manage to complete all the items on the
              todo-list the workout will be marked as complete and turn green on
              the calendar.
            </List.Item>
          </List>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
}
