import React from 'react';
import { MantineProvider } from '@mantine/core';
import ApplicationShell from '../components/ApplicationShell';

export default function GettingStarted() {
  return (
    <MantineProvider>
      <ApplicationShell />
    </MantineProvider>
  );
}
