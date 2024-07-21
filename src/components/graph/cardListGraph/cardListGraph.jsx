import React, { useState } from "react";
import Card from "../../homeComponent/card/card";
import style from "./cardListGraph.module.css";
import Graphics from "../graphics/graphics";
import { RiCloseCircleFill } from "react-icons/ri";

export default function     CardListGraph({ plants }) {
    const [selectedPlant, setSelectedPlant] = useState(null);

    const handleCardClick = (plant) => {
        setSelectedPlant(plant);
    };

    const handleCloseGraphs = () => {
        setSelectedPlant(null); // Reset selectedPlant to hide graphs
    };

    return (
        <div className={style.cardList}>
            {plants.map((plant, index) => (
                <div key={index} className={style.cardWrapper} onClick={() => handleCardClick(plant)}>
                    <Card name={plant.name} image={plant.image} />
                </div>
            ))}
            {selectedPlant && (
                <div className={style.containerGraph}>
                    <div className={style.closeButton} onClick={handleCloseGraphs}>
                        <RiCloseCircleFill size={20} color="#233B27" />
                    </div>
                    <div className={style.graphsContainer}>
                        <h2>{selectedPlant.name}</h2>
                        <Graphics plant={selectedPlant} />
                    </div>
                </div>
            )}
        </div>
    );
}