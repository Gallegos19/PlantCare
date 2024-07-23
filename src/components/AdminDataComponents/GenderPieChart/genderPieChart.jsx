import {React,useState,useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import style from "./genderPieChart.module.css"
import { fetchUsers } from '../../../utils/RequestPlant/requestPlant';

const COLORS = ['#0088FE', '#FF8042'];

export default function GenderPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await fetchUsers();
        const maleCount = users.filter(user => user.gender === 'H').length;
        const femaleCount = users.filter(user => user.gender === 'M').length;

        setData([
          { name: 'Hombres', value: maleCount },
          { name: 'Mujeres', value: femaleCount }
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();
  }, []);

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