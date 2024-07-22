
import React, { createContext, useState, useEffect } from "react";
import { fetchDeviceByemail } from "../../utils/RequestPlant/requestPlant";

const PlantContext = createContext();

export function PlantProvider({ children }) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const plantData = await fetchDeviceByemail();
        console.log("Plants loaded in context:", plantData); 
        setPlants(plantData);
        localStorage.setItem('plants', JSON.stringify(plantData)); 
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

  return (
    <PlantContext.Provider value={{ plants, addPlant }}>
      {children}
    </PlantContext.Provider>
  );
}

export default PlantContext;
