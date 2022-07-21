import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import ApplicationShell from '../components/ApplicationShell';

export default function ContactMe({ colorScheme, setColorScheme }) {
  //State for knowing what main content to render
  const [contentState, setContentState] = useState(3);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: colorScheme,
        primaryColor: 'blue',
        headings: {
          sizes: { h1: { fontSize: 40 }, h2: { fontSize: 28 } },
        },
      }}
    >
      <NotificationsProvider position="bottom-right">
        <ApplicationShell
          setColorScheme={setColorScheme}
          colorScheme={colorScheme}
          contentState={contentState}
          setContentState={setContentState}
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}
