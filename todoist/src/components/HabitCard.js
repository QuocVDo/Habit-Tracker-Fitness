import React from 'react';
import { Card, Image, Button, Container } from '@mantine/core';

export default function HabitCard({ image, title, func }) {
  return (
    <Container size="sm">
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={image} fit="contain" height="100px" alt="Image Card" />
        </Card.Section>

        <Button
          variant="light"
          color="blue"
          fullWidth
          onClick={func}
          style={{ marginTop: 14 }}
        >
          {title}
        </Button>
      </Card>
    </Container>
  );
}
