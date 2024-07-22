import React, { useContext } from 'react';
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import PlantContext from "../../components/PlantContext/plantContext";
import CardListClient from "../../components/stadisticalData/CardDataClient/cardDataClient";
import style from "./dataClient.module.css"
export default function DataClient() {
    const { plants } = useContext(PlantContext);
    return (
        <div>
            <nav>
                <Nav />
            </nav>
            <main>
            <div className={style.header}>
                <h1 className={style.Jardin}>Datos</h1>
                </div>
                <CardListClient plants={plants} />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}