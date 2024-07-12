import React from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';
import style from "./graphics.module.css";

export default function Graphics({ plant }) {
    const navigate = useNavigate();

    // Datos de ejemplo para el Scatter Plot
    const dataScatter = [
        { humidity: 20, growth: 10 },
        { humidity: 30, growth: 15 },
        { humidity: 40, growth: 18 },
        { humidity: 50, growth: 20 },
        { humidity: 60, growth: 25 },
        { humidity: 70, growth: 28 },
        { humidity: 80, growth: 30 },
    ];

    const data = [
        { name: 'Enero', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Febrero', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Marzo', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Abril', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Mayo', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Junio', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Julio', uv: 3490, pv: 4300, amt: 2100 },
    ];

    const handleGraphClick = (graphType) => {
        navigate(`/specificGraph`, { state: { plant, graphType } });
    };

    return (
        <div className={style.graphList}>
           
                <div onClick={() => handleGraphClick("line")}>
                    <h3>Line Chart</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div onClick={() => handleGraphClick("bar")}>
                    <h3>Histogram</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div onClick={() => handleGraphClick("scatter")}>
                    <h3>Scatter Plot</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="humidity" name="Humidity" unit="%" />
                            <YAxis type="number" dataKey="growth" name="Growth" unit="cm" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="A Scatter" data={dataScatter} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            

        </div>
    );
}
