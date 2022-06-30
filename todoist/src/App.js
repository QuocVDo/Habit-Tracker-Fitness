import React, { useState, useEffect } from 'react';
import RegLogin from './components/Reg-Login';
import MenuIcons from './components/MenuIcons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  Space,
  Paper,
  MantineProvider,
} from '@mantine/core';
import ApplicationShell from './components/ApplicationShell';

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'dark' }}
    >
      <ApplicationShell />
    </MantineProvider>
  );
}

export default App;
