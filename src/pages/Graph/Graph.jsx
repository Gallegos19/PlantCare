import React from "react";
import Nav from "../../components/nav/nav";
import CardListGraph from "../../components/graph/cardListGraph/cardListGraph";
import Footer from "../../components/footer/footer";
import style from "./Graph.module.css"
import espadaDeRey from '../../assets/espadaderey_4.png';
import pino from '../../assets/pino_4.png';

const plants = [
    { name: "Espada de rey", image: espadaDeRey },
    { name: "Pino", image: pino },
    { name: "Pino", image: pino },
];
export default function Graph() {
    return(
        <div className={style.container}>
            <Nav/>
            <CardListGraph plants={plants} />
            <Footer/>
        </div>
    )
}