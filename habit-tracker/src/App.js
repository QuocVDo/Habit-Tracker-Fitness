import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import ApplicationShell from './components/ApplicationShell';

function App() {
  const [colorScheme, setColorScheme] = useState('dark');
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
        />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
