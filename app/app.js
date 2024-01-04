// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Profile from '../pages/profile';
import History from '../pages/profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History/>} />
    </Routes>
  );
}

export default App;