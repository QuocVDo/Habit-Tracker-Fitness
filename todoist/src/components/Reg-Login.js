import React, { useRef } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function Auth() {
  const emailRef = useRef();
  const passwordRef = useRef();

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
    try {
      await signInWithEmailAndPassword(
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

  return (
    <>
      <h2>Register Now</h2>
      <div className="email">
        <span>
          <FaEnvelope />
        </span>
        <span> Email:</span>
        <input placeholder="Email" ref={emailRef}></input>
      </div>
      <div className="password">
        <span>
          <FaLock />
        </span>
        <span> Password:</span>
        <input type="password" placeholder="Password" ref={passwordRef}></input>
      </div>
      <button onClick={loginButton}>Log In</button>
      <button onClick={registerButton}>Register Now</button>
    </>
  );
}
