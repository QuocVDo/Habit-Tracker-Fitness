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
        primaryColor: 'blue',
        headings: {
          sizes: { h1: { fontSize: 40 }, h2: { fontSize: 28 } },
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
