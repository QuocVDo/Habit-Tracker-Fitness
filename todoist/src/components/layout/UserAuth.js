import React, { useState } from 'react';
import { FaRegEnvelope, FaLock } from 'react-icons/fa';

export default function UserAuth() {
  const [currEmail, setEmail] = useState('');
  const [currPass, setPass] = useState('');

  const handleLogin = () => {
    console.log(currEmail);
    console.log(currPass);
  };

  return (
    <div className="login">
      <h1>Log In:</h1>
      <div className="email">
        <span>
          <FaRegEnvelope />
        </span>
        <span>Email:</span>
        <input onChange={(e) => setEmail(e.target.value)}></input>
      </div>

      <div className="password">
        <span>
          <FaLock />
        </span>
        <span>Password:</span>
        <input onChange={(e) => setPass(e.target.value)}></input>
      </div>

      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
