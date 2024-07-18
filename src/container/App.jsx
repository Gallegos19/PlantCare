import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../App.css'
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import SpecificPlant from '../pages/SpecificPlant/specificPlant';
import AgregarPlanta from '../pages/AgregarPlanta/AgregarPlanta';
import AgregarPlantaAdmin from '../pages/AgregarPlantaAdmin/AgregarPlantaAdmin';
import Graph from '../pages/Graph/Graph';
import AdminData from '../pages/AdminData/adminData';
import Admin from '../pages/Admin/admin';
import AddAdmin from '../pages/AddAdmin/addAdmin';
import AddDevice from '../pages/AddDevice/addDevice';
import SpecificGraph from '../pages/SpecificGraph/specificGraph';

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/specific/:plantName' element={<SpecificPlant />} />
    <Route path='/graph' element={<Graph/>} />
    <Route path='/adminData' element={<AdminData/>} />
    <Route path='/addAdmin' element={<AddAdmin/>} />
    <Route path='/specificGraph/' element={<SpecificGraph/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/agregarplanta" element={<AgregarPlanta/>} />
    <Route path="/agregarplantaadmin" element={<AgregarPlantaAdmin/>} />
    <Route path="/addDevice" element={<AddDevice/>} />
    
   </Routes>
   </BrowserRouter>
  )
}

export default App
