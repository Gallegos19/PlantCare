import React, { createContext, useState, useEffect } from "react";
import { fetchDeviceByemail, fetchDeviceByMac } from "../../utils/RequestPlant/requestPlant";

const PlantContext = createContext();

export function PlantProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [macs, setMacs] = useState([]);
  const [selectedPlantRecords, setSelectedPlantRecords] = useState([]);
  const [loadedMacs, setLoadedMacs] = useState(new Set()); // Estado para MACs ya cargadas

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const { plants, macs } = await fetchDeviceByemail();
        console.log("Plants and MACs loaded in context:", { plants, macs });
        setPlants(plants);
        setMacs(macs);
        localStorage.setItem('plants', JSON.stringify(plants));
        localStorage.setItem('macs', JSON.stringify(macs));
      } catch (error) {
        console.error("Error loading plants:", error);
      }
    };

    loadPlants();
  }, []);

  const addPlant = (plant) => {
    setPlants((prevPlants) => {
      const updatedPlants = [...prevPlants, plant];
      localStorage.setItem('plants', JSON.stringify(updatedPlants));
      return updatedPlants;
    });
  };

  const loadPlantRecordsByMac = async (mac) => {
    if (loadedMacs.has(mac)) return; // Evitar carga redundante

    try {
      const plantData = await fetchDeviceByMac(mac);
      if (plantData && plantData.plant_records) {
        setSelectedPlantRecords(plantData.plant_records);
        localStorage.setItem('plantRecords', JSON.stringify(plantData.plant_records));
        setLoadedMacs((prevLoadedMacs) => new Set(prevLoadedMacs).add(mac)); // Marcar MAC como cargada
        console.log("estio es", JSON.stringify(plantData.plant_records, null, 2));
      } else {
        console.error("No plant records found");
      }
    } catch (error) {
      console.error("Error loading plant records:", error);
    }
  };
  

  return (
    <PlantContext.Provider value={{ plants, macs, addPlant, selectedPlantRecords, loadPlantRecordsByMac }}>
      {children}
    </PlantContext.Provider>
  );
}

export default PlantContext;