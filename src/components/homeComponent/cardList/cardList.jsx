
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card/card";
import style from "./cardList.module.css";

export default function CardList({ plants }) {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    navigate(`/specific/${name}`);
  };

  // Verifica si plants es un array
  if (!Array.isArray(plants)) {
    return <p>No plants available.</p>;
  }

  return (
    <div className={style.cardList}>
      {plants.map((plant) => (
        <div key={plant.id} className={style.cardWrapper} onClick={() => handleCardClick(plant.name)}>
          <Card 
            name={plant.name} 
            imageUrl={plant.url_image_plant} 
          />
        </div>
      ))}
    </div>
  );
}
