import React, { useState } from 'react';
import {
  Group,
  ActionIcon,
  Button,
  Menu,
  Divider,
  Avatar,
  Text,
} from '@mantine/core';
import {
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaUserCircle,
  FaCircle,
  FaCog,
} from 'react-icons/fa';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function MenuIcons({
  setColorScheme,
  colorScheme,
  currUser,
  loggedIn,
  setShowLoginModal,
  setShowRegModal,
}) {
  //Toggle what MenuButtons show depending on color scheme
  const [showDarkButton, setShowDarkButton] = useState(
    colorScheme === 'light' ? true : false
  );

  //Sign out Button (Placeholder)
  const signOutButton = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Custom UserAvatar Display Function Component
  function UserAvatarAndEmail() {
    return (
      <Group style={{ margin: '0.75rem' }}>
        <Avatar size="lg" radius="xl" color="blue">
          {currUser.email.charAt(0).toUpperCase()}
        </Avatar>
        <div>
          <Text weight={700}>Signed in as:</Text>
          <Text size="sm" color="dimmed" weight={400}>
            {currUser.email}
          </Text>
        </div>
      </Group>
    );
  }

  return (
    <Group spacing="xs" noWrap>
      {showDarkButton ? (
        <ActionIcon
          variant="default"
          radius="md"
          size="lg"
          title="Toggle Dark Mode"
          onClick={() => {
            setColorScheme('dark');
            setShowDarkButton(false);
          }}
        >
          <FaMoon />
        </ActionIcon>
      ) : (
        <ActionIcon
          variant="default"
          radius="md"
          size="lg"
          title="Toggle Light Mode"
          onClick={() => {
            setColorScheme('light');
            setShowDarkButton(true);
          }}
        >
          <FaSun />
        </ActionIcon>
      )}
      {!loggedIn && (
        <Button
          onClick={() => {
            setShowLoginModal(true);
          }}
          variant="default"
        >
          Sign In
        </Button>
      )}
      {!loggedIn && (
        <Button
          onClick={() => {
            setShowRegModal(true);
          }}
          color="dark"
          variant="filled"
        >
          Sign Up
        </Button>
      )}

      {loggedIn && (
        <Menu
          control={
            <ActionIcon variant="default" radius="md" size="lg">
              <FaUserCircle />
            </ActionIcon>
          }
          transition="fade"
          shadow="md"
          size={350}
        >
          <UserAvatarAndEmail />

          <Divider />
          <Menu.Item icon={<FaCog />}>Settings</Menu.Item>
          <Menu.Item icon={<FaCircle />}>Placeholder</Menu.Item>
          <Menu.Item icon={<FaCircle />}>Placeholder</Menu.Item>
          <Menu.Item icon={<FaCircle />}>Placeholder</Menu.Item>

          <Divider />
          <Menu.Item
            color="red"
            icon={<FaSignOutAlt />}
            onClick={signOutButton}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      )}
    </Group>
  );
}
