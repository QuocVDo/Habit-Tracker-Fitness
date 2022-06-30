import React, { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import ApplicationShell from './components/ApplicationShell';

function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: colorScheme,
        primaryColor: 'green',
        headings: {
          fontFamily: 'Roboto, sans-serif',
          sizes: { h1: { fontSize: 40 } },
        },
      }}
    >
      <ApplicationShell
        setColorScheme={setColorScheme}
        colorScheme={colorScheme}
      />
    </MantineProvider>
  );
}

export default App;
