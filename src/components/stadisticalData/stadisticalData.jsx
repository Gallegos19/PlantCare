import React, { useState,useContext,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GeneralAnalysis from './generalAnalysis/generalAnalysis';
import FrequencyTable from './FrequencyTable/frequencyTable';
import AdvancedAnalysis from './advancedAnalysis/advancedAnalysis';
import PlantContext from '../PlantContext/plantContext';
import Nav from '../nav/nav';
import Footer from '../footer/footer';
import style from "./stadisticalData.module.css"

export default function Data() {
  const { plantName } = useParams();
  const { plants } = useContext(PlantContext);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [plantData, setPlantData] = useState(null);

  useEffect(() => {
    const plant = plants.find(p => p.name === plantName);
    if (plant) {
      setPlantData({
        distribution: [
          // Aquí puedes agregar datos de distribución simulados
          { classNumber: 1, lowerLimit: 10, upperLimit: 20, absoluteFrequency: 5, classMark: 15, cumulativeFrequency: 5, exactLowerLimit: 9.5, exactUpperLimit: 20.5 },
          { classNumber: 2, lowerLimit: 21, upperLimit: 30, absoluteFrequency: 8, classMark: 25.5, cumulativeFrequency: 13, exactLowerLimit: 20.5, exactUpperLimit: 30.5 },
        ],
        temperature: [plant.ambient_temperature],
        soilHumidity: [plant.humidity_earth],
        airHumidity: [plant.humidity_environment],
        luminosity: [plant.brightness],
        mq135: [plant.mq135],
      });
    }
  }, [plantName, plants]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className={style.container}>
      <nav>
        <Nav />
      </nav>
      <GeneralAnalysis selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
      {selectedMonth && plantData && (
        <>
          <FrequencyTable selectedMonth={selectedMonth} frequencyData={plantData} />
          <AdvancedAnalysis selectedMonth={selectedMonth} frequencyData={plantData} />
        </>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
