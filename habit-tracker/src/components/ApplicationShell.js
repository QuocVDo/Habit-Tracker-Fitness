import React, { useState, useEffect } from 'react';
import Login from './Login';
import Content from './content/Content';
import Register from './Register';
import Fitness from './content/Fitness';
import ApplicationHeader from './ApplicationHeader';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { AppShell, Navbar, useMantineTheme, Modal } from '@mantine/core';
import ApplicationNavbar from './ApplicationNavbar';
import GettingStartedContent from './content/GettingStartedContent';
import AboutMeContent from './content/AboutMeContent';

export default function ApplicationShell({
  setColorScheme,
  colorScheme,
  contentState,
  setContentState,
}) {
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

  //CONDITIONAL IF COMPONENT for rendering Content Body
  //Takes in a conditinonal, and different components
  //Depending on the value of the conditional, it renders
  //A different componenet
  const IfContent = ({ conditional, children }) => {
    return children[conditional];
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
          width={{ sm: 300, lg: 400 }}
        >
          <ApplicationNavbar
            loggedIn={loggedIn}
            setOpened={setOpened}
            setContentState={setContentState}
          />
        </Navbar>
      }
      header={
        <ApplicationHeader
          opened={opened}
          setContentState={setContentState}
          setOpened={setOpened}
          theme={theme}
          setColorScheme={setColorScheme}
          colorScheme={colorScheme}
          currUser={currUser}
          loggedIn={loggedIn}
          setShowLoginModal={setShowLoginModal}
          setShowRegModal={setShowRegModal}
        />
      }
    >
      {/*Login Modal*/}
      <Modal
        size="md"
        opened={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <Login
          setShowLoginModal={setShowLoginModal}
          setShowRegModal={setShowRegModal}
        />
      </Modal>

      {/*Register Modal*/}
      <Modal
        size="sm"
        opened={showRegModal}
        onClose={() => setShowRegModal(false)}
      >
        <Register
          setShowLoginModal={setShowLoginModal}
          setShowRegModal={setShowRegModal}
        />
      </Modal>

      <IfContent conditional={contentState}>
        <Content
          loggedIn={loggedIn}
          currUser={currUser}
          setShowLoginModal={setShowLoginModal}
          setContentState={setContentState}
        />
        <Fitness setContentState={setContentState} currUser={currUser} />
        <GettingStartedContent />
        <AboutMeContent />
      </IfContent>
    </AppShell>
  );
}
