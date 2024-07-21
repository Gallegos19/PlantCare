import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, RadarChart, ResponsiveContainer, BarChart, Bar,PolarGrid ,PolarAngleAxis ,PolarRadiusAxis ,Radar, ScatterChart, Scatter } from 'recharts';
import style from "./graphics.module.css";


export default function Graphics({ plant }) {
    const [data, setData] = useState([]);
    const [dataScatter, setDataScatter] = useState([]);
    const [radarData, setRadarData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener datos desde localStorage
        const localStoragePlants = JSON.parse(localStorage.getItem('plants')) || [];

        // Buscar la planta seleccionada en localStorage
        const selectedPlant = localStoragePlants.find(p => p.name === plant.name);

        if (selectedPlant) {
            // Configurar datos para gráficos
            setData([{
                name: selectedPlant.name,
                brightness: selectedPlant.brightness,
                ambient_temperature: selectedPlant.ambient_temperature,
                humidity_earth: selectedPlant.humidity_earth,
                humidity_environment: selectedPlant.humidity_environment,
                mq135: selectedPlant.mq135
            }]);

            setDataScatter([{
                humidity: selectedPlant.humidity_earth,
                temperature: selectedPlant.ambient_temperature
            }]);

            setRadarData([{
                name: selectedPlant.name,
                brightness: selectedPlant.brightness,
                ambient_temperature: selectedPlant.ambient_temperature,
                humidity_earth: selectedPlant.humidity_earth,
                humidity_environment: selectedPlant.humidity_environment,
                mq135: selectedPlant.mq135
            }]);
        } else {
            console.error("Planta no encontrada en localStorage");
        }
    }, [plant]);

    const handleGraphClick = (graphType) => {
        navigate(`/specificGraph`, { state: { plant, graphType } });
    };

    return (
        <div className={style.graphList}>
            <div className={style.graphics} onClick={() => handleGraphClick("line")}>
                <h3>Line Chart</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ambient_temperature" stroke="#8884d8" name="Ambient Temperature" />
                        <Line type="monotone" dataKey="humidity_earth" stroke="#82ca9d" name="Soil Humidity" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div onClick={() => handleGraphClick("bar")}>
                <h3>Bar Chart</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="brightness" fill="#8884d8" name="Brightness" />
                        <Bar dataKey="ambient_temperature" fill="#82ca9d" name="Ambient Temperature" />
                        <Bar dataKey="humidity_earth" fill="#ffc658" name="Soil Humidity" />
                        <Bar dataKey="humidity_environment" fill="#d0ed57" name="Environment Humidity" />
                        <Bar dataKey="mq135" fill="#ff7300" name="MQ135 Sensor" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div onClick={() => handleGraphClick("radar")}>
                <h3>Radar Chart</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Tooltip />
                        <Radar name="Plant Metrics" dataKey="brightness" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Ambient Temperature" dataKey="ambient_temperature" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Radar name="Soil Humidity" dataKey="humidity_earth" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                        <Radar name="Environment Humidity" dataKey="humidity_environment" stroke="#d0ed57" fill="#d0ed57" fillOpacity={0.6} />
                        <Radar name="MQ135 Sensor" dataKey="mq135" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
