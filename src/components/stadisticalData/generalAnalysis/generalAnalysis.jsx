import React from 'react';
import MonthSelector from '../MonthSelector/monthSelector';
import style from "../stadisticalData.module.css";

const GeneralAnalysis = ({ selectedMonth, handleMonthChange }) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
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
  );
};

export default GeneralAnalysis;
