import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main/Main'
import { Link, Route, Routes } from 'react-router-dom';
import path from 'path';
import Writepage from './pages/Write/Write';
import Store from 'pages/Store/Store';
import Login from 'pages/Login/Login';
import Signin from 'pages/Signin/Signin';

function App() {
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Writepage />} path='/Write' />
      <Route element={<Store />} path='/Store' />
      <Route element={<Login/>} path='/Login'/>
      <Route element={<Signin/>} path='/Signin'/>
    </Routes>
  );
}

export default App;
