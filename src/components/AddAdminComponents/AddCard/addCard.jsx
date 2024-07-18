import React from 'react';
import style from "./addCard.module.css"

export default function AddCard({ title, onClick, icon }) {
    return (
        <div className={style.card} onClick={onClick}>
            <h3>{title}</h3>
            <div className={style.iconContainer}>{icon}</div>
            
        </div>
    );
}
