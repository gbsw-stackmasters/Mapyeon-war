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
import Header from 'components/Header/Header';
import AdminList from 'pages/admin/adminList/AdminList';
import AdminChange from 'pages/admin/AdminChange/AdminChange';
import DetailPage from 'pages/Detail/DetailPage';

function App() {
  return (
    <div>
    <Header/>
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Writepage />} path='/Write' />
      <Route element={<DetailPage />} path='/detail/:id' />
      <Route element={<AdminList />} path='/admin/list/:id' />
      <Route element={<AdminChange />} path='/admin/change' />
      <Route element={<Store />} path='/Store/:id' />
      <Route element={<Login/>} path='/Login'/>
      <Route element={<Signin/>} path='/Signin'/>
    </Routes>
    </div>
  );
}

export default App;
