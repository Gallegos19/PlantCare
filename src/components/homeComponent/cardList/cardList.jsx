
import React from "react";
import Card from "../card/card";
import style from "./cardList.module.css";

export default function CardList({ plants }) {
    return (
        <div className={style.cardList}>
            {plants.map((plant, index) => (
                <Card key={index} name={plant.name} image={plant.image} />
            ))}
        </div>
    );
}
