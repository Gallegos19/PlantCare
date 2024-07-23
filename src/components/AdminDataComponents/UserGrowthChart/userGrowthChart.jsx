import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchUsers } from '../../../utils/RequestPlant/requestPlant';
import style from "./userGrowthChart.module.css"
export default function UserGrowthChart() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('jwt')

  useEffect(() => {
    const getData = async () => {
      try {
        const users = await fetchUsers(token);
        // Assuming users have a "created_at" field and we're counting new users per month
        const monthlyCounts = users.reduce((acc, user) => {
          const date = new Date(user.created_at);
          const month = date.toLocaleString('default', { month: 'short' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(monthlyCounts).map(month => ({
          name: month,
          usuarios: monthlyCounts[month]
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
