import React, { useState } from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Auth from './components/Reg-Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [currUser, setCurrUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrUser(currentUser);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  return (
    <>
      <Header />
      <Content />
      {!loggedIn ? <Auth /> : <p>Logged in As: {currUser?.email}</p>}
    </>
  );
}

export default App;
