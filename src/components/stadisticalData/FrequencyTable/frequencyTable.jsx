import React from 'react';
import style from "../stadisticalData.module.css"

const FrequencyTable = ({ selectedMonth, frequencyData }) => {
  if (!frequencyData || !frequencyData.distribution) return null;

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
              <th>Frecuencia Acumulada</th>
              <th>Límite Inferior Exacto</th>
              <th>Límite Superior Exacto</th>
            </tr>
          </thead>
          <tbody>
            {frequencyData.distribution.map((data, index) => (
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
    </div>
  );
};

export default FrequencyTable;