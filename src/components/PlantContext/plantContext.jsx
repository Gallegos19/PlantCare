import React, { createContext, useState, useEffect } from "react";

const PlantContext = createContext();

export function PlantProvider({ children }) {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    // Cargar plantas desde localStorage
    const savedPlants = JSON.parse(localStorage.getItem('plants')) || [];
    setPlants(savedPlants);
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
