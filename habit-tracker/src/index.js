import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GettingStarted from './routes/GettingStarted';
import AboutMe from './routes/AboutMe';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="getting-started" element={<GettingStarted />} />
      <Route path="about-me" element={<AboutMe />} />
    </Routes>
  </BrowserRouter>
);
