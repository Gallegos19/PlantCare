import React, { useEffect, useState } from 'react';
import style from "./diviceTable.module.css";
import { fetchDevice, fetchDeleteDeviceByMac } from '../../../utils/RequestPlant/requestPlant';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function DeviceTable() {
  const [devices, setDevices] = useState([]);

  const handleDelete = async (mac) => {
    const peticion = await fetchDeleteDeviceByMac(mac)
    if(peticion){
      console.log(peticion);
      alert(`Dispositivo ${mac} eliminado`);
      window.location.reload();
    }
    else{
      alert('ocurrio un error')
    }
    // Aquí puedes agregar la lógica para eliminar el dispositivo
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDevice();
        setDevices(response); // Asumiendo que response es un array de dispositivos
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.container}>
      <h2 className={style.Jardin}>Dispositivos</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>ID (MAC)</th>
            <th>Correo de Usuario</th>
            <th>Planta</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.id}>
              <td data-label="ID (MAC)">{device.mac}</td>
              <td data-label="Correo de Usuario">{device.user.email}</td>
              <td data-label="Planta">{device.plant.name}</td>
              <td data-label="Opciones">
                <MdOutlineDeleteSweep
                  color='green'
                  size={25}
                  onClick={() => handleDelete(device.mac)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
