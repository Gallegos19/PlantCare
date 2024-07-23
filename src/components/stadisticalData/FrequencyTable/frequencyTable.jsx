import React from 'react';
import style from "../stadisticalData.module.css"


const FrequencyTable = ({ selectedMonth, frequencyData }) => {
  if (!frequencyData || frequencyData.length === 0) return null;

  return (
    <div className={style.tableContainer}>
      <h2 className={style.tableTitle}>Tabla de Distribución de Frecuencias - {selectedMonth}</h2>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>No. de Clase</th>
              <th>Límite Inferior</th>
              <th>Límite Superior</th>
              <th>Frecuencia Absoluta</th>
              <th>Marca de Clase</th>
              <th>Frecuencia Relativa</th>
              <th>Frecuencia Acumulada</th>
              <th>Frecuencia Relativa Acumulada</th>
              <th>Límite Inferior Exacto</th>
              <th>Límite Superior Exacto</th>
            </tr>
          </thead>
          <tbody>
            {frequencyData.map((data, index) => (
              <tr key={index}>
                <td>{data.classNumber}</td>
                <td>{Number(data.lowerLimit).toFixed(2)}</td>
                <td>{Number(data.upperLimit).toFixed(2)}</td>
                <td>{data.absoluteFrequency}</td>
                <td>{Number(data.classMark).toFixed(2)}</td>
                <td>{data.relativeFrequency}</td>
                <td>{data.cumulativeFrequency}</td>
                <td>{data.cumulativeRelativeFrequency}</td>
                <td>{Number(data.exactLowerLimit).toFixed(2)}</td>
                <td>{Number(data.exactUpperLimit).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrequencyTable;