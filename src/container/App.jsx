import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../App.css';
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
import AddUser from '../pages/AddUser/AddUser';
import DataClient from '../pages/StadisticalDataClient/dataClient';
import Data from '../components/stadisticalData/stadisticalData';
import PlantRecordsContext from '../context/Context';
import { PlantProvider } from '../components/PlantContext/plantContext';
import { fetchHealth } from '../utils/RequestPlant/requestPlant';
import Loader from '../components/Loader/Loader';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchHealth(token)
        .then((data) => {
          console.log(data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          if (error.message === '403') {
            console.error('Forbidden: Token is invalid or expired');
          } else {
            console.error('Error:', error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw"  
    }}>
      <Loader />
    </div>
    ; 
  }

  return (
    <PlantProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isAuthenticated ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/specific/:plantName' element={<SpecificPlant />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/add-user' element={<AddUser /> } />
              <Route path='/graph' element={<Graph />} />
              <Route path='/adminData' element={<AdminData />} />
              <Route path='/addAdmin' element={<AddAdmin />} />
              <Route path='/specificGraph/' element={<SpecificGraph />} />
              <Route path="/agregarplanta" element={<AgregarPlanta />} />
              <Route path="/agregarplantaadmin" element={<AgregarPlantaAdmin />} />
              <Route path="/addDevice" element={<AddDevice />} />
              <Route path="/dataClient" element={<DataClient />} />
              <Route path='/stadistical/:plantName' element={<Data />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </PlantProvider>
  );
}

export default App;
