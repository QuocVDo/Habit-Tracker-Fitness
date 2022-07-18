import React from 'react';
import { Container, ThemeIcon, Group, Divider, Text } from '@mantine/core';
import { FaRocket, FaInfo } from 'react-icons/fa';

export default function ApplicationNavbar({ loggedIn }) {
  return (
    <div>
      <Container>
        <Group>
          <ThemeIcon radius="xl" size="lg">
            <FaRocket />
          </ThemeIcon>
          Getting Started
        </Group>
        <Group style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <ThemeIcon radius="xl" size="lg">
            <FaInfo />
          </ThemeIcon>
          About Me
        </Group>
        <Divider style={{ marginBottom: '1rem' }} />
        {!loggedIn ? <Text>NOt logged in</Text> : <Text>Logged in</Text>}
      </Container>
    </div>
  );
}
