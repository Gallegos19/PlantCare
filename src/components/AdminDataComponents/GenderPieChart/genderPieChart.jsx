import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import style from "./genderPieChart.module.css"
const data = [
  { name: 'Hombres', value: 400 },
  { name: 'Mujeres', value: 300 }
];

const COLORS = ['#0088FE', '#FF8042'];

export default function GenderPieChart() {
  return (
    <div className={style.chartContainer}>
      <h2>Distribución por Género</h2>
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
