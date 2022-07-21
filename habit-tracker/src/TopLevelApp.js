import React, { useState } from 'react';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GettingStarted from './routes/GettingStarted';
import AboutMe from './routes/AboutMe';

export default function TopLevelApp() {
  const [colorScheme, setColorScheme] = useState('dark');
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <App colorScheme={colorScheme} setColorScheme={setColorScheme} />
          }
        />
        <Route
          path="getting-started"
          element={
            <GettingStarted
              colorScheme={colorScheme}
              setColorScheme={setColorScheme}
            />
          }
        />
        <Route
          path="contact-me"
          element={
            <AboutMe
              colorScheme={colorScheme}
              setColorScheme={setColorScheme}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
