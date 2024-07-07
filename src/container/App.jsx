import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../App.css'
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import SpecificPlant from '../pages/SpecificPlant/specificPlant';
import AgregarPlanta from '../pages/AgregarPlanta/AgregarPlanta';

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/specific/:plantName' element={<SpecificPlant />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/agregarplanta" element={<AgregarPlanta/>} />
    
   </Routes>
   </BrowserRouter>
  )
}

export default App
