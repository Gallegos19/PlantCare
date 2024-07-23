import {React,useState,useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import style from "./plantPreferencePieChart.module.css"
import { fetchPlants } from '../../../utils/RequestPlant/requestPlant';
const COLORS = ['#FFBB28', '#FF8042', '#0088FE', '#00C49F'];

export default function PlantPreferencePieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const plants = await fetchPlants();
        const plantCounts = plants.reduce((acc, plant) => {
          acc[plant.name] = (acc[plant.name] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.keys(plantCounts).map(key => ({
          name: key,
          value: plantCounts[key]
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    getData();
  }, []);

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