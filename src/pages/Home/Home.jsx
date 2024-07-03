import React from 'react';
import Nav from '../../components/nav/nav';
import Footer from '../../components/footer/footer';
import CardList from '../../components/homeComponent/cardList/cardList';
import style from "./Home.module.css";
import espadaDeRey from '../../assets/espadaderey_4.png';
import pino from '../../assets/pino_4.png';


const plants = [
    { name: "Espada de rey", image: espadaDeRey },
    { name: "Pino", image: pino },
    { name: "Pino", image: pino },
];

export default function Home() {
    return (
        <div>
            <Nav />
            <div className={style.container}>
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
