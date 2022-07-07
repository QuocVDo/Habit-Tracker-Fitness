import React, { useState } from 'react';
import {
  Paper,
  SimpleGrid,
  Center,
  ActionIcon,
  Title,
  Group,
  Button,
  Divider,
} from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import WeeklyCustomize from './WeeklyCustomize';

export default function Fitness({ setContentState, currUser }) {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [showCustomize, setShowCustomize] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  return (
    <SimpleGrid cols={1}>
      <Paper shadow="sm" p="md">
        <Group>
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
              <FaChevronDown ttitle="Show Calendar" />
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
              onChange={setDateSelected}
            />
          )}
        </Center>
      </Paper>

      <Paper shadow="sm" p="md">
        <Group style={{ marginBottom: '1rem' }} grow>
          <Title order={4}>
            {!showCustomize ? "Today's Workout" : 'Customize Workout'}
          </Title>
          {!showCustomize && (
            <Button
              compact
              variant="gradient"
              size="xs"
              onClick={() => setShowCustomize((e) => !e)}
            >
              Customize Workout
            </Button>
          )}
        </Group>
        <Divider />

        {showCustomize && (
          <WeeklyCustomize
            currUser={currUser}
            setShowCustomize={setShowCustomize}
          />
        )}
      </Paper>
    </SimpleGrid>
  );
}
