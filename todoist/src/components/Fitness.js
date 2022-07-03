import React from 'react';
import { Paper } from '@mantine/core';
import { Calendar } from '@mantine/dates';

export default function Fitness({ setContentState }) {
  return (
    <Paper shadow="sm" p="md">
      <button onClick={() => setContentState('')}>Back</button>
      <Calendar></Calendar>
    </Paper>
  );
}
