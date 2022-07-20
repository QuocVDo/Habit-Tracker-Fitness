import React from 'react';
import {
  Paper,
  Title,
  Divider,
  Accordion,
  ThemeIcon,
  Text,
  Space,
  List,
} from '@mantine/core';

export default function AboutMeContent() {
  return (
    <Paper shadow="md" p="md">
      <Title order={2}>Contact Me</Title>
      <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
      Hi! My name is Quoc-Zuy Do
      <Space h="md" />
      I'm a student studying computer engineering and this is the personal
      project that I built mainly to suit my own needs. There are a number of
      habit tracking apps that I have tried but either I wasn't a fan of the
      UI/UX or that the fetures were not suitable for my requirements.
      <Space h="md" />
      If you have any questions, you can contact me at my email:
      <Text color="blue">quocduyvudo@gmail.com</Text>
    </Paper>
  );
}
