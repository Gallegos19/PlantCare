import React, { useState, useEffect } from 'react';
import Nav from '../../components/nav/nav';
import Footer from '../../components/footer/footer';
import CardList from '../../components/homeComponent/cardList/cardList';
import style from "./Home.module.css";
import espadaDeRey from '../../assets/espadaderey_4.png';
import pino from '../../assets/pino_4.png';
import { fetchPlants } from '../../utils/RequestPlant/requestPlant';

export default function Home() {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPlants = async () => {
            try {
                const plantData = await fetchPlants();
                setPlants(plantData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getPlants();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
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