import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import style from "./genderPlantPreferenceChart.module.css"
const data = [
  { name: 'Hombres - Rosas', value: 120 },
  { name: 'Hombres - Tulipanes', value: 50 },
  { name: 'Hombres - Orquídeas', value: 70 },
  { name: 'Hombres - Girasoles', value: 50 },
  { name: 'Mujeres - Rosas', value: 120 },
  { name: 'Mujeres - Tulipanes', value: 80 },
  { name: 'Mujeres - Orquídeas', value: 30 },
  { name: 'Mujeres - Girasoles', value: 30 }
];

const COLORS = [
  '#FFBB28', '#FF8042', '#0088FE', '#00C49F',
  '#FFBB28', '#FF8042', '#0088FE', '#00C49F'
];

export default function GenderPlantPreferenceChart() {
  return (
    <div className={style.chartContainer}>
      <h2>Preferencia de Plantas por Género</h2>
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
