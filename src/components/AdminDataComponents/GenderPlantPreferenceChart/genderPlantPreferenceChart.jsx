import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import style from "./genderPlantPreferenceChart.module.css"
import { fetchUsers } from '../../../utils/RequestPlant/requestPlant';
const COLORS = [
  '#FFBB28', '#FF8042', '#0088FE', '#00C49F',
  '#FFBB28', '#FF8042', '#0088FE', '#00C49F'
];

export default function GenderPlantPreferenceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await fetchUsers();
        // Assuming users have fields "gender" and "name_plant"
        const genderPlantPreferences = users.reduce((acc, user) => {
          user.name_plant.forEach(plant => {
            const gender = user.gender === 'H' ? 'Hombres' : 'Mujeres';
            const key = `${gender} - ${plant}`;
            acc[key] = (acc[key] || 0) + 1;
          });
          return acc;
        }, {});

        const chartData = Object.keys(genderPlantPreferences).map(key => ({
          name: key,
          value: genderPlantPreferences[key]
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();
  }, []);

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
