// Card.js
import React from "react";
import style from "./card.module.css";
import PlusBlack from "../../../assets/plusBlack.png";

export default function Card({ name, image }) {
    return (
        <div className={style.card}>
            <div className={style.cardHeader}>
                <span className={style.name}>{name}</span>
            </div>
            <img src={image} alt={name} className={style.image} />
            <div className={style.cardFooter}>
                <img src={PlusBlack} alt="Añadir" className={style.plus} />
            </div>
        </div>
    );
}