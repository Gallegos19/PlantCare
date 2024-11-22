import React from 'react';
import style from "../stadisticalData.module.css";

const calculateStatistics = (data) => {
  const mean = data.reduce((acc, value) => acc + value, 0) / data.length;
  const variance = data.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);
  return { mean, variance, stdDev };
};

export default function StatisticsTable({ title, data }) {
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
}