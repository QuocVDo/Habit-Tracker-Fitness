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
import { ReactComponent as ReactLogo } from '../assets/undraw_reg.svg';
export default function Register({ setShowLoginModal, setShowRegModal }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [visible, setVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  //REGISTER NEW USER
  const registerButton = async () => {
    setVisible((v) => !v);
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setAlertMessage('Passwords must match! Please try again.');
      setShowAlert(true);
    } else if (passwordRef.current.value === '') {
      setAlertMessage('Password field cannot be empty! Please try again.');
      setShowAlert(true);
    } else {
      try {
        await createUserWithEmailAndPassword(
          auth,
          emailRef.current.value,
          passwordRef.current.value
        );
      } catch (error) {
        setAlertMessage(error.message.slice(9, -1));
        setShowAlert(true);
      }
    }
    passwordRef.current.value = '';
    passwordConfirmRef.current.value = '';

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
      <Container size={600} px="md">
        <LoadingOverlay visible={visible} />
        <Group grow>
          <Title order={2}>Sign Up</Title>
          <Space />
          <Space />
          <ReactLogo height="100px" style={{ marginBottom: '0.5rem' }} />
        </Group>
        <Divider></Divider>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Your Email:"
            placeholder="Email"
            {...form.getInputProps('email')}
            ref={emailRef}
            icon={<FaEnvelope />}
            style={{ marginTop: '3rem' }}
          />
          <PasswordInput
            required
            label="Your Password:"
            placeholder="Password"
            ref={passwordRef}
            icon={<FaLock />}
            style={{ marginTop: '1rem' }}
          />
          <PasswordInput
            required
            label="Confirm Password:"
            placeholder="Confirm Password"
            ref={passwordConfirmRef}
            icon={<FaLock />}
            style={{ marginTop: '1rem' }}
          />
          <Button
            variant="gradient"
            type="submit"
            fullWidth
            onClick={registerButton}
            style={{ marginTop: '5rem' }}
          >
            Register Now
          </Button>
        </form>
        <Space h="xl" />
        <Button
          fullWidth
          variant="subtle"
          color="gray"
          onClick={() => {
            setShowRegModal(false);
            setShowLoginModal(true);
          }}
        >
          <span style={{ textDecoration: 'underline' }}>
            Already have an account, or want to sign in with Google?
          </span>
        </Button>

        <Space h="xl" />
        {showAlert && (
          <Alert
            icon={<FaExclamationCircle size={16} />}
            title="Oops!"
            color="red"
            radius="lg"
            withCloseButton
            onClick={() => setShowAlert((v) => !v)}
          >
            {alertMessage}
          </Alert>
        )}
      </Container>
    </div>
  );
}
