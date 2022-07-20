import React from 'react';
import { Grid } from '@mantine/core';
import HabitCard from '../HabitCard';
import UndrawWeights from '../../assets/undraw_weights.svg';
import UndrawDiet from '../../assets/undraw_diet.svg';
import UndrawGeneric from '../../assets/undraw_generic_habit.svg';

export default function Content({
  loggedIn,
  setShowLoginModal,
  setContentState,
}) {
  //Custom Function we are passing in as a prop to the card
  const fitnessHabitButton = () => {
    if (!loggedIn) {
      setShowLoginModal(true);
    } else {
      setContentState(1);
    }
  };

  //Custom Function we are passing in as a prop to the card
  const dietHabitButton = () => {
    if (!loggedIn) {
      setShowLoginModal(true);
    } else {
    }
  };

  //Custom Function we are passing in as a prop to the card
  const customHabitButton = () => {
    if (!loggedIn) {
      setShowLoginModal(true);
    } else {
    }
  };

  return (
    <Grid grow justify="space-around" gutter="xl" style={{ marginTop: 'auto' }}>
      <Grid.Col span={12}>
        <HabitCard
          image={UndrawWeights}
          title={'Fitness Habits'}
          func={fitnessHabitButton}
        ></HabitCard>
      </Grid.Col>
      <Grid.Col span={12}>
        <HabitCard
          image={UndrawDiet}
          title={'Eating Habits (WIP)!'}
          func={dietHabitButton}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <HabitCard
          image={UndrawGeneric}
          title={'Custom Habits (WIP)!'}
          func={customHabitButton}
        />
      </Grid.Col>
      <Grid.Col span={12}></Grid.Col>
    </Grid>
  );
}
