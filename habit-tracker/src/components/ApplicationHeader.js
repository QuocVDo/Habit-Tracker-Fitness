import React from 'react';
import MenuIcons from './MenuIcons';
import { Header, MediaQuery, Burger, Group, Title } from '@mantine/core';
import { FaDumbbell } from 'react-icons/fa';

export default function ApplicationHeader({
  opened,
  setOpened,
  theme,
  setColorScheme,
  colorScheme,
  currUser,
  loggedIn,
  setShowLoginModal,
  setShowRegModal,
}) {
  return (
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

        <Group noWrap>
          <FaDumbbell size={30} color="#137aaf" />
          {loggedIn && <Title order={6}>Fitness Habits</Title>}
        </Group>

        <Group noWrap style={{ marginLeft: 'auto' }}>
          <MenuIcons
            setColorScheme={setColorScheme}
            colorScheme={colorScheme}
            currUser={currUser}
            loggedIn={loggedIn}
            setShowLoginModal={setShowLoginModal}
            setShowRegModal={setShowRegModal}
          />
        </Group>
      </div>
    </Header>
  );
}
