import React from 'react';
import style from "../stadisticalData.module.css";

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'

];

export default function MonthSelector({ selectedMonth, handleMonthChange }) {
  return (
    <div className={style.selectContainer}>
      <label htmlFor="monthSelect">Mes:</label>
      <select id="monthSelect" onChange={handleMonthChange} value={selectedMonth}>
        <option value="">Seleccione un mes</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
    </div>
  );
}
