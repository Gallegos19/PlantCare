import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import style from "./userGrowthChart.module.css"
const data = [
  { name: 'Ene', usuarios: 30 },
  { name: 'Feb', usuarios: 45 },
  { name: 'Mar', usuarios: 50 },
  { name: 'Abr', usuarios: 75 },
  { name: 'May', usuarios: 100 },
  { name: 'Jun', usuarios: 120 }
];

export default function UserGrowthChart() {
  return (
    <div className={style.chartContainer}>
      <h2>Crecimiento de Usuarios</h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="usuarios" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}
