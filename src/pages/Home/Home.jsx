import React, { useState, useEffect } from 'react';
import Nav from '../../components/nav/nav';
import Footer from '../../components/footer/footer';
import CardList from '../../components/homeComponent/cardList/cardList';
import style from "./Home.module.css";


export default function Home() {
   
    return (
        <div className={style.container}>
            <Nav />
            <div>
                <div className={style.header}>
                    <h1 className={style.Jardin}>Mi Jardin</h1>
                    <div className={style.selectContainer}>
                        <select>
                            <option value="nombre">Nombre</option>
                            <option value="tipo">Tipo</option>
                            <option value="fecha">Fecha</option>
                        </select>
                    </div>
                </div>
                <CardList plants={plants} />
            </div>
            <Footer/>
        </div>
    );
}