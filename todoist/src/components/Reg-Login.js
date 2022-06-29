import React, { useRef, useState } from 'react';
import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  Title,
  TextInput,
  PasswordInput,
  Button,
  Center,
  Container,
  Space,
  Group,
  Alert,
  LoadingOverlay,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function RegLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [visible, setVisible] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  const registerButton = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      emailRef.current.value = '';
      passwordRef.current.value = '';
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginButton = async () => {
    setVisible((v) => !v);
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      setAuthFailed(true);
    }
    passwordRef.current.value = '';
    setVisible((v) => !v);
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
      <Container size="xs" px="xs">
        <LoadingOverlay visible={visible} />
        <Center>
          <Title order={1}>Log In</Title>
        </Center>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            placeholder="Email"
            {...form.getInputProps('email')}
            ref={emailRef}
            icon={<FaEnvelope />}
          />
          <Space h="xs"></Space>
          <PasswordInput
            placeholder="Password"
            ref={passwordRef}
            icon={<FaLock />}
          />
          <Space h="xs"></Space>

          <Group position="right">
            <Button
              color="cyan"
              variant="gradient"
              type="submit"
              onClick={loginButton}
            >
              Log In
            </Button>
            <Button onClick={registerButton}>Register Now</Button>
          </Group>
        </form>
        <Space h="md" />
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
