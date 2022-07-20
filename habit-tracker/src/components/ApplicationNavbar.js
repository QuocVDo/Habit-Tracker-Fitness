import React from 'react';
import { Container, ThemeIcon, Group, Divider, Text } from '@mantine/core';
import { FaRocket, FaInfo } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/ApplicationNavbar.css';

export default function ApplicationNavbar({ loggedIn }) {
  return (
    <div>
      <Container>
        <Group>
          <ThemeIcon radius="xl" size="lg">
            <FaRocket />
          </ThemeIcon>
          <Link className="link" to="/getting-started">
            Getting Started
          </Link>
        </Group>
        <Group style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <ThemeIcon radius="xl" size="lg">
            <FaInfo />
          </ThemeIcon>
          <Link className="link" to="/about-me">
            About Me
          </Link>
        </Group>
        <Divider style={{ marginBottom: '1rem' }} />
        {!loggedIn ? <Text>Not logged in</Text> : <Text>Logged in</Text>}
      </Container>
    </div>
  );
}
