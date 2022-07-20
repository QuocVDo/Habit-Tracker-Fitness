import React from 'react';
import {
  Container,
  ThemeIcon,
  Group,
  Divider,
  Text,
  Anchor,
} from '@mantine/core';
import { FaRocket, FaInfo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ApplicationNavbar({ loggedIn }) {
  return (
    <div>
      <Container>
        <Group>
          <ThemeIcon radius="xl" size="lg">
            <FaRocket />
          </ThemeIcon>
          <Anchor component={Link} to="/getting-started">
            Getting Started
          </Anchor>
        </Group>
        <Group style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <ThemeIcon radius="xl" size="lg">
            <FaInfo />
          </ThemeIcon>
          <Anchor component={Link} to="/contact-me">
            Contact Me
          </Anchor>
        </Group>
        <Divider style={{ marginBottom: '1rem' }} />
        {!loggedIn ? <Text>Not logged in</Text> : <Text>Logged in</Text>}
      </Container>
    </div>
  );
}
