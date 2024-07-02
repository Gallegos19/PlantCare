import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
