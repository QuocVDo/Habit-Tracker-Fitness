import React, { useState } from 'react';
import { Group, ActionIcon } from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function MenuIcons({ setColorScheme }) {
  const [showDarkButton, setShowDarkButton] = useState(false);
  return (
    <Group spacing="xs">
      {showDarkButton ? (
        <ActionIcon
          variant="default"
          radius="md"
          size="lg"
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
          onClick={() => {
            setColorScheme('light');
            setShowDarkButton(true);
          }}
        >
          <FaSun />
        </ActionIcon>
      )}
    </Group>
  );
}
