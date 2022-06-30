import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import ApplicationShell from './components/ApplicationShell';

function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: colorScheme, primaryColor: 'green' }}
    >
      <ApplicationShell setColorScheme={setColorScheme} />
    </MantineProvider>
  );
}

export default App;
