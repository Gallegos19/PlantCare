import { React, useState, useEffect, useContext,useCallback } from "react";
import { useNavigate, } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, RadarChart, ResponsiveContainer, BarChart, Bar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';
import style from "./graphics.module.css";
import PlantContext from "../../PlantContext/plantContext";


export default function Graphics({ plantMac }) {
    const { selectedPlantRecords, loadPlantRecordsByMac } = useContext(PlantContext);
    const navigate = useNavigate();
    const [hasLoaded, setHasLoaded] = useState(false);
  
    // Función para cargar los registros
    const loadRecords = useCallback(() => {
      if (plantMac && !hasLoaded) {
        console.log("Loading records for MAC:", plantMac);
        loadPlantRecordsByMac(plantMac);
        setHasLoaded(true); // Marca como cargado para evitar peticiones repetidas
      }
    }, [plantMac, loadPlantRecordsByMac, hasLoaded]);
  
    // useEffect para cargar datos cuando cambie `plantMac`
    useEffect(() => {
      console.log("Effect: plantMac or loadRecords changed");
      loadRecords();
    }, [loadRecords]);
  
    // useEffect para reiniciar el estado `hasLoaded` cuando cambie `plantMac`
    useEffect(() => {
      setHasLoaded(false); // Permite la carga de nuevos datos cuando el MAC cambia
    }, [plantMac]);
  
    useEffect(() => {
      console.log("Selected Plant Records updated:", selectedPlantRecords);
    }, [selectedPlantRecords]);
  
    const handleGraphClick = (graphType) => {
      navigate(`/specificGraph`, { state: { plantMac, graphType } });
    };
  
    const formattedRecords = selectedPlantRecords.map(record => ({
      id: record.id,
      brightness: record.brightness,
      ambient_temperature: record.ambient_temperature,
      humidity_earth: record.humidity_earth,
      humidity_environment: record.humidity_environment,
      mq135: record.mq135,
    }));
  
    console.log("Formatted Records:", formattedRecords);
  
    const scatterRecords = formattedRecords.map(record => ({
      humidity: record.humidity_earth,
      temperature: record.ambient_temperature
    }));
  
    if (formattedRecords.length === 0) {
      return <p>No data available</p>;
    }
  
    return (
      <div className={style.graphList}>
        {/* Renderizado de gráficos */}
        <div className={style.graphics} onClick={() => handleGraphClick("line")}>
          <h3>Line Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedRecords}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" label={{ value: 'Time (ID)', position: 'insideBottomRight', offset: 0 }} />
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formattedRecords}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" label={{ value: 'Time (ID)', position: 'insideBottomRight', offset: 0 }} />
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
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={formattedRecords}>
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
        </div>
        <div onClick={() => handleGraphClick("scatter")}>
          <h3>Scatter Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="temperature" name="Ambient Temperature" />
              <YAxis dataKey="humidity" name="Soil Humidity" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Humidity vs Temperature" data={scatterRecords} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  
