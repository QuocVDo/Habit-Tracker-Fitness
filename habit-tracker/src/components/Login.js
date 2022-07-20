import React, { useRef, useState } from 'react';
import {
  FaEnvelope,
  FaLock,
  FaExclamationCircle,
  FaGoogle,
} from 'react-icons/fa';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
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
  MediaQuery,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReactComponent as ReactLogo } from '../assets/undraw_secure_login_pdn4.svg';

export default function Login({ setShowRegModal, setShowLoginModal }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [visible, setVisible] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  //user presses log in button
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

  //A form checking function to make sure the email is valid
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  //Sign in with Google
  const signInWithGoogleButton = async () => {
    const provider = new GoogleAuthProvider();
    console.log('signing in with google');
    try {
      await signInWithPopup(auth, provider).then(console.log('signed in'));
    } catch (error) {
      setAuthFailed(true);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={visible} />
      <Container>
        <Group grow position="apart">
          <MediaQuery smallerThan="sm" styles={{ fontSize: '20px' }}>
            <Title order={2}>Log In</Title>
          </MediaQuery>

          <Space w="xs"></Space>
          <ReactLogo height="100px" style={{ marginBottom: '0.5rem' }} />
        </Group>
      </Container>

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
          onClick={loginButton}
          style={{ marginTop: '3rem' }}
        >
          LOG IN
        </Button>
        <Group grow style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          <Button
            color="red"
            title="Sign in With Google"
            gradient={{ from: 'blue', to: 'teal', deg: 40 }}
            leftIcon={<FaGoogle />}
            onClick={signInWithGoogleButton}
          >
            Sign in with Google
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 60 }}
            onClick={() => {
              setShowLoginModal(false);
              setShowRegModal(true);
            }}
          >
            Register Now
          </Button>
        </Group>
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
    </div>
  );
}
