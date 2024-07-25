import React,{useContext,useState,useEffect} from "react";
import { useLocation } from "react-router-dom";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import style from "./specificGraph.module.css";
import PlantContext from "../../components/PlantContext/plantContext";

export default function SpecificGraph() {
    const location = useLocation();
    const { plantMac, graphType } = location.state || {};
    const { selectedPlantRecords, loadPlantRecordsByMac } = useContext(PlantContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataFetched, setDataFetched] = useState(false); // Estado para controlar la solicitud

    useEffect(() => {
        const fetchData = async () => {
            if (plantMac) {
                // Solo realiza la solicitud si no se ha hecho antes
                if (!dataFetched) {
                    await loadPlantRecordsByMac(plantMac);
                    setDataFetched(true);
                }

                // Filtra y formatea los registros para que sean compatibles con los gráficos
                const formattedRecords = selectedPlantRecords.map(record => ({
                    id: record.id,
                    brightness: record.brightness,
                    ambient_temperature: record.ambient_temperature,
                    humidity_earth: record.humidity_earth,
                    humidity_environment: record.humidity_environment,
                    mq135: record.mq135,
                }));

                setData(formattedRecords);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [plantMac, loadPlantRecordsByMac, selectedPlantRecords, dataFetched]);

    if (isLoading) {
        return (
            <div className={style.container}>
                <Nav />
                <h1 className={style.title}>Specific Graph</h1>
                <p>Loading data...</p>
                <Footer />
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className={style.container}>
                <Nav />
                <h1 className={style.title}>Specific Graph</h1>
                <p>No data available</p>
                <Footer />
            </div>
        );
    }

    const renderChart = () => {
        switch (graphType) {
            case "line":
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="id" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="ambient_temperature" stroke="#8884d8" name="Ambient Temperature" />
                            <Line type="monotone" dataKey="humidity_earth" stroke="#82ca9d" name="Soil Humidity" />
                            <Line type="monotone" dataKey="humidity_environment" stroke="#d0ed57" name="Environment Humidity" />
                            <Line type="monotone" dataKey="mq135" stroke="#ff7300" name="MQ135 Sensor" />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case "bar":
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="id" />
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
                );
            case "radar":
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart outerRadius="80%" data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="id" />
                            <PolarRadiusAxis angle={30} domain={[0, 3000]} />
                            <Tooltip />
                            <Radar name="Brightness" dataKey="brightness" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            <Radar name="Ambient Temperature" dataKey="ambient_temperature" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                            <Radar name="Soil Humidity" dataKey="humidity_earth" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                            <Radar name="Environment Humidity" dataKey="humidity_environment" stroke="#d0ed57" fill="#d0ed57" fillOpacity={0.6} />
                            <Radar name="MQ135 Sensor" dataKey="mq135" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                );
            case "scatter":
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ambient_temperature" name="Ambient Temperature" />
                            <YAxis dataKey="humidity_earth" name="Soil Humidity" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Humidity vs Temperature" data={data.map(record => ({
                                humidity_earth: record.humidity_earth,
                                ambient_temperature: record.ambient_temperature
                            }))} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                );
            default:
                return <p>Invalid graph type</p>;
        }
    };

    return (
        <div className={style.container}>
            <Nav />
            <h1 className={style.title}>Specific Graph</h1>
            <div className={style.graphContainer}>
                {renderChart()}
            </div>
            <Footer />
        </div>
    );
}