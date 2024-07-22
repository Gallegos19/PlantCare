import React, { useState } from 'react';
import Nav from '../../components/nav/nav';
import Footer from '../../components/footer/footer';
import style from "./stadisticalData.module.css";

export default function Data() {
  const [selectedMonth, setSelectedMonth] = useState('');

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const frequencyData = {
    'Enero': {
      distribution: [
        { classNumber: 1, lowerLimit: 10, upperLimit: 20, absoluteFrequency: 5, classMark: 15, cumulativeFrequency: 5, exactLowerLimit: 9.5, exactUpperLimit: 20.5 },
        { classNumber: 2, lowerLimit: 21, upperLimit: 30, absoluteFrequency: 8, classMark: 25.5, cumulativeFrequency: 13, exactLowerLimit: 20.5, exactUpperLimit: 30.5 },
      ],
      temperature: [15, 18, 20, 21, 22],
      soilHumidity: [30, 35, 40, 42, 45],
      airHumidity: [60, 65, 70, 72, 75],
      luminosity: [800, 850, 900, 920, 950],
    },
    'Febrero': {
      distribution: [
        { classNumber: 1, lowerLimit: 5, upperLimit: 15, absoluteFrequency: 7, classMark: 10, cumulativeFrequency: 7, exactLowerLimit: 4.5, exactUpperLimit: 15.5 },
      ],
      temperature: [12, 14, 16, 18, 20],
      soilHumidity: [25, 30, 35, 38, 40],
      airHumidity: [55, 60, 65, 68, 70],
      luminosity: [700, 750, 800, 820, 850],
    },
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const calculateStatistics = (data) => {
    const mean = data.reduce((acc, value) => acc + value, 0) / data.length;
    const variance = data.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / data.length;
    const stdDev = Math.sqrt(variance);
    return { mean, variance, stdDev };
  };

  const renderStatisticsTable = (title, data) => {
    const stats = calculateStatistics(data);
    return (
      <div className={style.statisticsTable}>
        <h2 className={style.tableTitle}>{title}</h2>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Promedio</th>
              <th>Varianza</th>
              <th>Desviación Estándar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{stats.mean.toFixed(2)}</td>
              <td>{stats.variance.toFixed(2)}</td>
              <td>{stats.stdDev.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={style.container}>
      <Nav />
      <div>
        <div className={style.header}>
          <h1 className={style.Jardin}>Análisis General</h1>
          <div className={style.selectContainer}>
            <label htmlFor="monthSelect">Mes:</label>
            <select id="monthSelect" onChange={handleMonthChange}>
              <option value="">Seleccione un mes</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedMonth && (
        <div className={style.tableContainer}>
          <h2 className={style.tableTitle}>Tabla de Distribución de Frecuencias - {selectedMonth}</h2>
          <table className={style.table}>
            <thead>
              <tr>
                <th>No. de Clase</th>
                <th>Límite Inferior</th>
                <th>Límite Superior</th>
                <th>Frecuencia Absoluta</th>
                <th>Marca de Clase</th>
                <th>Frecuencia Acumulada</th>
                <th>Límite Inferior Exacto</th>
                <th>Límite Superior Exacto</th>
              </tr>
            </thead>
            <tbody>
              {frequencyData[selectedMonth].distribution.map((data, index) => (
                <tr key={index}>
                  <td>{data.classNumber}</td>
                  <td>{data.lowerLimit}</td>
                  <td>{data.upperLimit}</td>
                  <td>{data.absoluteFrequency}</td>
                  <td>{data.classMark}</td>
                  <td>{data.cumulativeFrequency}</td>
                  <td>{data.exactLowerLimit}</td>
                  <td>{data.exactUpperLimit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={style.header}>
        <h1 className={style.Jardin}>Análisis Avanzado</h1>
      </div>

      {selectedMonth && (
        <div className={style.advancedAnalysis}>
          {renderStatisticsTable('Temperatura', frequencyData[selectedMonth].temperature)}
          {renderStatisticsTable('Humedad de la Tierra', frequencyData[selectedMonth].soilHumidity)}
          {renderStatisticsTable('Humedad en el Aire', frequencyData[selectedMonth].airHumidity)}
          {renderStatisticsTable('Luminosidad', frequencyData[selectedMonth].luminosity)}
        </div>
      )}
      
      <Footer />
    </div>
  );
}
