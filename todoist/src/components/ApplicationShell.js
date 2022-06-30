import React, { useState, useEffect } from 'react';
import Login from './Login';
import MenuIcons from './MenuIcons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
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
  Modal,
} from '@mantine/core';

export default function ApplicationShell({ setColorScheme, colorScheme }) {
  const theme = useMantineTheme();

  //For Burger Icon and Navbar
  const [opened, setOpened] = useState(false);

  //Keep track of current user  Data
  const [currUser, setCurrUser] = useState({});

  //keep track whether somone is logged in or not
  const [loggedIn, setLoggedIn] = useState(false);

  //State for opening and closing the LOGIN MODAL
  const [showLoginModal, setShowLoginModal] = useState(false);

  //Display Login MOdal

  //UseEffect hook + onAuthStateChanged in order to
  //Respond to changes in Authentication state.
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrUser(currentUser);
        setLoggedIn(true);
        setShowLoginModal(false);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  //Sign out Button (Placeholder)
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
        <Footer height={40} p="md">
          <Text>Application Footer</Text>
        </Footer>
      }
      header={
        <Header height={60} p="md">
          <div style={{ display: 'flex', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[7]}
                mr="xl"
              />
            </MediaQuery>
            <div style={{ marginLeft: 'auto' }}>
              <MenuIcons
                setColorScheme={setColorScheme}
                colorScheme={colorScheme}
                user={currUser}
                loggedIn={loggedIn}
                setShowLoginModal={setShowLoginModal}
              />
            </div>
          </div>
        </Header>
      }
    >
      {/*Login Modal*/}
      <Modal
        size="lg"
        opened={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <Login />
      </Modal>

      <Paper shadow="xs" p="xl">
        <Text>Resize app to see responsive navbar in action</Text>
        <Button variant="gradient" color="cyan">
          Button
        </Button>
      </Paper>
      <Space h="md" />
      <Paper shadow="xs" p="xl">
        <div styles={{ display: 'flex' }}>
          {!loggedIn ? (
            <Login />
          ) : (
            <Text>
              Logged in as:{' '}
              <span style={{ color: '#03cffc' }}>{currUser?.email}</span>
            </Text>
          )}
          {loggedIn && <Button onClick={signOutButton}>Sign Out</Button>}
        </div>
      </Paper>
    </AppShell>
  );
}
