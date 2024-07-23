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
  const { plants, selectedPlantRecords, loadPlantRecordsByMac } = useContext(PlantContext);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [plantData, setPlantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlantData = async () => {
      const plant = plants.find(p => p.name === plantName);
      if (plant && plant.mac) {
        await loadPlantRecordsByMac(plant.mac); // Carga los registros de la planta por MAC
      }
    };

    fetchPlantData();
  }, [plantName, plants, loadPlantRecordsByMac]);

  useEffect(() => {
    if (selectedPlantRecords.length > 0) {
      const temperatureData = selectedPlantRecords.map(record => record.ambient_temperature);

      const calculateFrequencyDistribution = (data) => {
        if (data.length === 0) return [];

        const min = Math.min(...data);
        const max = Math.max(...data);
        
        // Número de clases y tamaño de clase
        const numClasses = Math.ceil(Math.sqrt(data.length)); // Raíz cuadrada del número de datos
        const classWidth = (max - min) / numClasses;

        const limits = Array.from({ length: numClasses + 1 }, (_, i) => min + i * classWidth);
        const frequencyDistribution = [];
        let cumulativeFrequency = 0;
        const totalDataCount = data.length;

        for (let i = 0; i < numClasses; i++) {
          const lowerLimit = limits[i];
          const upperLimit = limits[i + 1];
          const classData = data.filter(value => value >= lowerLimit && value < upperLimit);

          const classFrequency = classData.length;
          cumulativeFrequency += classFrequency;
          const classMark = (lowerLimit + upperLimit) / 2;
          const relativeFrequency = (classFrequency / totalDataCount) * 100;
          const cumulativeRelativeFrequency = (cumulativeFrequency / totalDataCount) * 100;

          frequencyDistribution.push({
            classNumber: i + 1,
            lowerLimit: lowerLimit.toFixed(2),
            upperLimit: upperLimit.toFixed(2),
            absoluteFrequency: classFrequency,
            classMark: classMark.toFixed(2),
            relativeFrequency: relativeFrequency.toFixed(2) + '%',
            cumulativeFrequency: cumulativeFrequency,
            cumulativeRelativeFrequency: cumulativeRelativeFrequency.toFixed(2) + '%',
            exactLowerLimit: (lowerLimit - 0.5).toFixed(2),
            exactUpperLimit: (upperLimit + 0.5).toFixed(2),
          });
        }

        return frequencyDistribution;
      };

      const distribution = calculateFrequencyDistribution(temperatureData);

      setPlantData({
        distribution: distribution,
        temperature: temperatureData,
        soilHumidity: selectedPlantRecords.map(record => record.humidity_earth),
        airHumidity: selectedPlantRecords.map(record => record.humidity_environment),
        luminosity: selectedPlantRecords.map(record => record.brightness),
        mq135: selectedPlantRecords.map(record => record.mq135),
      });

      setIsLoading(false); // Los datos se han cargado
    }
  }, [selectedPlantRecords]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className={style.container}>
      <nav>
        <Nav />
      </nav>
      <GeneralAnalysis selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
      {selectedMonth && plantData && (
        <>
          <FrequencyTable selectedMonth={selectedMonth} frequencyData={plantData.distribution} />
          <AdvancedAnalysis selectedMonth={selectedMonth} frequencyData={plantData} />
        </>
      )}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}