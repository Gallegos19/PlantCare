
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card/card";
import style from "./cardList.module.css";

export default function CardList({ plants }) {
    const navigate = useNavigate();

    const handleCardClick = (name) => {
        navigate(`/specific/${name}`);
    };

    return (
        <div className={style.cardList}>
            {plants.map((plant, index) => (
                <div key={index} className={style.cardWrapper} onClick={() => handleCardClick(plant.name)}>
                    <Card name={plant.name} image={plant.image} />
                </div>
            ))}
        </div>
    );
}
