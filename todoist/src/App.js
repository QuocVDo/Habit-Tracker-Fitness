import React, { useState, useEffect } from 'react';
import RegLogin from './components/Reg-Login';
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
  Center,
  Space,
  Paper,
} from '@mantine/core';

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [currUser, setCurrUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  //UseEffect hook + onAuthStateChanged in order to
  //Respond to changes in Authentication state.
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrUser(currentUser);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  const signOutButton = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[7]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Paper shadow="xs" p="xl">
        <Text>Resize app to see responsive navbar in action</Text>
        <Button variant="gradient" color="cyan">
          Button
        </Button>
      </Paper>
      <Space h="md" />
      <Paper shadow="xs" p="xl">
        <div styles={{ display: 'flex' }}>
          {!loggedIn ? <RegLogin /> : <p>Logged in As: {currUser?.email}</p>}
          {loggedIn && <Button onClick={signOutButton}>Sign Out</Button>}
        </div>
      </Paper>
    </AppShell>
  );
}

export default App;
