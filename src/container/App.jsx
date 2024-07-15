import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../App.css'
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import AgregarPlanta from '../pages/AgregarPlanta/AgregarPlanta';
import AgregarPlantaAdmin from '../pages/AgregarPlantaAdmin/AgregarPlantaAdmin';

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/agregarplanta" element={<AgregarPlanta/>} />
    <Route path="/agregarplantaadmin" element={<AgregarPlantaAdmin/>} />
    
   </Routes>
   </BrowserRouter>
  )
}

export default App
