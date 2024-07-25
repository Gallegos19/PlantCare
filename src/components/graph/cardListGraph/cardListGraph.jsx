import React, { useState, useContext } from "react";
import Card from "../../homeComponent/card/card";
import style from "./cardListGraph.module.css";
import Graphics from "../graphics/graphics";
import { RiCloseCircleFill } from "react-icons/ri";
import PlantContext from "../../PlantContext/plantContext";
export default function CardListGraph({ plants }) {
    const [selectedPlant, setSelectedPlant] = useState(null);
    const { loadPlantRecordsByMac } = useContext(PlantContext); // Accede a la función para cargar datos por MAC

    const handleCardClick = async (plant) => {
        setSelectedPlant(plant);
        try {
            await loadPlantRecordsByMac(plant.mac); // Carga registros de la planta seleccionada usando su MAC
        } catch (error) {
            console.error("Error loading plant records:", error);
        }
    };

    const handleCloseGraphs = () => {
        setSelectedPlant(null); // Reset selectedPlant to hide graphs
    };

    return (
        <div className={style.cardList}>
            {plants.map((plant) => (
                <div key={plant.id} className={style.cardWrapper} onClick={() => handleCardClick(plant)}>
                    <Card name={plant.name} imageUrl={plant.url_image_plant} />
                </div>
            ))}

            {selectedPlant && (
                <div className={style.containerGraph}>
                    <div className={style.closeButton} onClick={handleCloseGraphs}>
                        <RiCloseCircleFill size={20} color="#233B27" />
                    </div>
                    <div className={style.graphsContainer}>
                        <h2>{selectedPlant.name}</h2>
                        <Graphics plantMac={selectedPlant.mac} /> {/* Pasar MAC al componente Graphics */}
                    </div>
                </div>
            )}
        </div>
    );
}