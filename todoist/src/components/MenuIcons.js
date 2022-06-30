import React, { useState } from 'react';
import { Group, ActionIcon, Button } from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function MenuIcons({
  setColorScheme,
  colorScheme,
  currUser,
  loggedIn,
  setShowLoginModal,
}) {
  //Toggle what MenuButtons show depending on color scheme
  const [showDarkButton, setShowDarkButton] = useState(
    colorScheme === 'light' ? true : false
  );

  return (
    <Group spacing="xs">
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
        <Button color="dark" variant="filled">
          Register Now
        </Button>
      )}
    </Group>
  );
}
