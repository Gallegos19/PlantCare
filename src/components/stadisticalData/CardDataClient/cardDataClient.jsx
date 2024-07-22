import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../homeComponent/card/card";
import style from "./cardDataClient.module.css"
export default function CardListClient({ plants }) {
    const navigate = useNavigate();
  
    const handleCardClick = (name) => {
      navigate(`/stadistical/${name}`);
    };
  
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