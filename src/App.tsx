import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main/Main'
import { Link, Route, Routes } from 'react-router-dom';
import path from 'path';
import Writepage from './pages/Write/Write';

function App() {
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Writepage />} path='/Write' />
    </Routes>
  );
}

export default App;
