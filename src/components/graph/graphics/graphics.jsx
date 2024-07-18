import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';
import style from "./graphics.module.css";
import { fetchPlants } from "../../../utils/RequestPlant/requestPlant";

export default function Graphics({ plant }) {
    const [data, setData] = useState([]);
    const [dataScatter, setDataScatter] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const plantData = await fetchPlants();
                // Aquí debes adaptar los datos obtenidos para que coincidan con tus gráficas
                // Por ejemplo, si `plantData` tiene la estructura esperada para las gráficas:
                setData(plantData.map(p => ({
                    name: p.name,
                    uv: p.brightness,
                    pv: p.ambient_temperature,
                    amt: p.humidity_earth
                })));

                setDataScatter(plantData.map(p => ({
                    humidity: p.humidity_earth,
                    growth: p.ambient_temperature // O cualquier otro dato relevante
                })));
            } catch (error) {
                console.error("Error fetching plant data:", error);
            }
        };

        fetchData();
    }, []);

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
