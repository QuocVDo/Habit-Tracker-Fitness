import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import todoist from './todoist.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Header() {
  const signOutButton = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="topBar">
      <ul>
        <li>
          <img
            src={todoist}
            alt="Todoist Icon"
            height="100px"
            width="100px"
          ></img>
        </li>
        <li>
          <span>
            <FaChevronDown />
          </span>
        </li>
        <li>
          <button onClick={signOutButton}>Sign Out</button>
        </li>
      </ul>
    </div>
  );
}
