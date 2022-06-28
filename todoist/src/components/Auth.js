import React, { useRef, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export default function Auth() {
  const [currUser, setCurrUser] = useState({});
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

  const signOutButton = async () => {};

  //When Auth State Changes set the currentUser state variable
  //within the function.
  onAuthStateChanged(auth, (currentUser) => {
    setCurrUser(currentUser);
  });

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
      <button onClick={registerButton}>Register Now</button>
      <button onClick={signOutButton}>Sign Out</button>
      <div className="currUser">Currently Signed in as: {currUser?.email}</div>
    </>
  );
}
