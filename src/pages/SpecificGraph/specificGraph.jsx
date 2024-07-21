import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import style from "./specificGraph.module.css";

export default function SpecificGraph() {
    const location = useLocation();
    const { plant, graphType } = location.state || { plant: {}, graphType: "line" };

    // Datos de la planta
    const data = [
        {
            name: 'Datos Planta',
            brightness: plant.brightness || 0,
            ambient_temperature: plant.ambient_temperature || 0,
            humidity_earth: plant.humidity_earth || 0,
            humidity_environment: plant.humidity_environment || 0,
            mq135: plant.mq135 || 0
        }
    ];

    // Datos para el gráfico radar
    const radarData = [
        { subject: 'Brightness', A: plant.brightness || 0 },
        { subject: 'Ambient Temperature', A: plant.ambient_temperature || 0 },
        { subject: 'Soil Humidity', A: plant.humidity_earth || 0 },
        { subject: 'Environment Humidity', A: plant.humidity_environment || 0 },
        { subject: 'MQ135 Sensor', A: plant.mq135 || 0 }
    ];

    return (
        <div className={style.container}>
            <Nav />
            <div className={style.graphContainer}>
                <h2>{plant.name} - {graphType.charAt(0).toUpperCase() + graphType.slice(1)} Chart</h2>
                {graphType === "line" && (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="brightness" stroke="#8884d8" name="Brightness" />
                            <Line type="monotone" dataKey="ambient_temperature" stroke="#82ca9d" name="Ambient Temperature" />
                            <Line type="monotone" dataKey="humidity_earth" stroke="#ffc658" name="Soil Humidity" />
                            <Line type="monotone" dataKey="humidity_environment" stroke="#d0ed57" name="Environment Humidity" />
                            <Line type="monotone" dataKey="mq135" stroke="#ff7300" name="MQ135 Sensor" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                {graphType === "bar" && (
                    <ResponsiveContainer width="100%" height={400}>
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
                )}
                {graphType === "area" && (
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="ambient_temperature" stroke="#8884d8" fillOpacity={0.3} fill="#8884d8" name="Ambient Temperature" />
                            <Area type="monotone" dataKey="humidity_earth" stroke="#82ca9d" fillOpacity={0.3} fill="#82ca9d" name="Soil Humidity" />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
                {graphType === "radar" && (
                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart outerRadius="80%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Tooltip />
                            <Radar name="Plant Metrics" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </div>
            <Footer />
        </div>
    );
}