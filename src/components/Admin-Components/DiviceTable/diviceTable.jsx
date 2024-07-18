import React, { useEffect, useState } from 'react';
import style from "./diviceTable.module.css"

const mockDevices = [
  { id: '00:1A:C2:7B:00:47', userName: 'John Doe', plant: 'Rosa' },
  { id: '00:1A:C2:7B:00:48', userName: 'Jane Smith', plant: 'Tulipán' },
  { id: '00:1A:C2:7B:00:49', userName: 'Alice Johnson', plant: 'Orquídea' }
];

export default function DeviceTable() {
  const [devices, setDevices] = useState(mockDevices);

  useEffect(() => {
    // Reemplaza con la URL de tu API
    fetch('/api/devices')
      .then(response => response.json())
      .then(data => setDevices(data));
  }, []);

  return (
    <div className={style.container}>
      <h2 className={style.Jardin}>Dispositivos</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>ID (MAC)</th>
            <th>Nombre de Usuario</th>
            <th>Planta</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.userName}</td>
              <td>{device.plant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
