import React from 'react';
import { Group, ActionIcon } from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function MenuIcons() {
  return (
    <Group spacing="xs">
      <ActionIcon
        variant="default"
        radius="md"
        size="lg"
        onClick={() => {
          console.log('acitiasdftton clicked');
        }}
      >
        <FaSun />
      </ActionIcon>

      <ActionIcon
        variant="filled"
        radius="md"
        size="lg"
        onClick={() => {
          console.log('acitiasdftton clicked');
        }}
      >
        <FaMoon />
      </ActionIcon>
    </Group>
  );
}
