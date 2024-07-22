import React, { useContext } from 'react';
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import PlantContext from "../../components/PlantContext/plantContext";
import CardListClient from "../../components/stadisticalData/CardDataClient/cardDataClient";
export default function DataClient() {
    const { plants } = useContext(PlantContext);
    return (
        <div>
            <nav>
                <Nav />
            </nav>
            <main>
                <CardListClient plants={plants} />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}