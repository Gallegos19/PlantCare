import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import style from "./plantPreferencePieChart.module.css"
const data = [
  { name: 'Rosas', value: 240 },
  { name: 'Tulipanes', value: 130 },
  { name: 'Orquídeas', value: 100 },
  { name: 'Girasoles', value: 80 }
];

const COLORS = ['#FFBB28', '#FF8042', '#0088FE', '#00C49F'];

export default function PlantPreferencePieChart() {
  return (
    <div className={style.chartContainer}>
      <h2>Preferencia de Plantas</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
