import React, { useState, useEffect } from 'react';
import Login from './Login';
import MenuIcons from './MenuIcons';
import { onAuthStateChanged } from 'firebase/auth';
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
  Paper,
  Modal,
} from '@mantine/core';
import Register from './Register';

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

  //State for opening and closing the Reg Modal
  const [showRegModal, setShowRegModal] = useState(false);

  //UseEffect hook + onAuthStateChanged in order to
  //Respond to changes in Authentication state.
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrUser(currentUser);
        setLoggedIn(true);
        setShowLoginModal(false);
        setShowRegModal(false);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

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
                currUser={currUser}
                loggedIn={loggedIn}
                setShowLoginModal={setShowLoginModal}
                setShowRegModal={setShowRegModal}
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
        <Login
          setShowLoginModal={setShowLoginModal}
          setShowRegModal={setShowRegModal}
        />
      </Modal>

      <Modal
        size="lg"
        opened={showRegModal}
        onClose={() => setShowRegModal(false)}
      >
        <Register
          setShowLoginModal={setShowLoginModal}
          setShowRegModal={setShowRegModal}
        />
      </Modal>

      <Paper shadow="xs" p="xl">
        <Text>Resize app to see responsive navbar in action</Text>
        <Button variant="gradient" color="cyan">
          Button
        </Button>
      </Paper>
    </AppShell>
  );
}
