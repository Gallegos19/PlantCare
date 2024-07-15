import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import style from "./specificGraph.module.css";

export default function SpecificGraph() {
    const location = useLocation();
    const { plant, graphType } = location.state || { plant: {}, graphType: "line" };

    const data = [
        { name: 'Enero', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Febrero', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Marzo', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Abril', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Mayo', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Junio', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Julio', uv: 3490, pv: 4300, amt: 2100 },
    ];

    return (
        <div className={style.container}>
            <Nav />
            <div className={style.graphContainer}>
                <h2>{plant.name} - {graphType === "bar" ? "Histogram" : "Line"} Chart</h2>
                {graphType === "line" && (
                    <ResponsiveContainer width="100%" height={400}>
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
                )}
                {graphType === "bar" && (
                    <ResponsiveContainer width="100%" height={400}>
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
                )}
                {/* Agrega lógica para mostrar otros tipos de gráficos según el valor de `graphType` */}
            </div>
            <Footer />
        </div>
    );
}
