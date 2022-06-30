import React, { useRef, useState } from 'react';
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Title,
  TextInput,
  PasswordInput,
  Button,
  Container,
  Space,
  Group,
  Alert,
  LoadingOverlay,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReactComponent as ReactLogo } from '../assets/undraw_secure_login_pdn4.svg';

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [visible, setVisible] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  //REGISTER NEW USER
  const registerButton = async () => {
    try {
      await createUserWithEmailAndPassword(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={visible} />
      <Container size={550} px="md">
        <LoadingOverlay visible={visible} />
        <Group grow>
          <Title order={1}>Log In</Title>
          <Space w="xs"></Space>
          <ReactLogo height="100px" style={{ marginBottom: '0.5rem' }} />
        </Group>

        <Divider></Divider>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            placeholder="Email"
            {...form.getInputProps('email')}
            ref={emailRef}
            icon={<FaEnvelope />}
            style={{ marginTop: '3rem' }}
          />
          <PasswordInput
            placeholder="Password"
            ref={passwordRef}
            icon={<FaLock />}
            style={{ marginTop: '1rem' }}
          />
          <Button
            color="cyan"
            variant="gradient"
            type="submit"
            fullWidth
            onClick={registerButton}
            style={{ marginTop: '5rem' }}
          >
            LOG IN
          </Button>
        </form>
        <Space h="xl" />
        {authFailed && (
          <Alert
            icon={<FaExclamationCircle size={16} />}
            title="Oops!"
            color="red"
            radius="lg"
            withCloseButton
            onClick={() => setAuthFailed((v) => !v)}
          >
            We don't recognize your username or password. Please try again!
          </Alert>
        )}
      </Container>
    </div>
  );
}
