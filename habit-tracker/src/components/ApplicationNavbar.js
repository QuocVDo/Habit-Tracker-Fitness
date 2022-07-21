import React from 'react';
import { Container, ThemeIcon, Group, Divider, Anchor } from '@mantine/core';
import { FaRocket, FaInfo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ApplicationNavbar({ loggedIn, setOpened }) {
  return (
    <div>
      <Container>
        <Group>
          <ThemeIcon radius="xl" size="lg">
            <FaRocket />
          </ThemeIcon>
          <Anchor
            component={Link}
            onClick={() => {
              setOpened(false);
            }}
            to="/getting-started"
          >
            Getting Started
          </Anchor>
        </Group>
        <Group style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <ThemeIcon radius="xl" size="lg">
            <FaInfo />
          </ThemeIcon>
          <Anchor
            component={Link}
            onClick={() => {
              setOpened(false);
            }}
            to="/contact-me"
          >
            Contact Me
          </Anchor>
        </Group>
        <Divider style={{ marginBottom: '1rem' }} />

        <Anchor
          onClick={() => {
            setOpened(false);
          }}
          component={Link}
          to="/"
        >
          Home
        </Anchor>
      </Container>
    </div>
  );
}
