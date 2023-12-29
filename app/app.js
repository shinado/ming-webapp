// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Hall from './profile/page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hall" element={<Hall />} />
    </Routes>
  );
}

export default App;
