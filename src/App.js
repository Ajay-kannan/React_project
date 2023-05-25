import './App.css';
import React from 'react';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import  Home  from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// main container app

function App({username}) {
  return (
    <React.Fragment>
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>
    </React.Fragment>
   
  );
}

export default App;
