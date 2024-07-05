import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import style from "./specificPlant.module.css";
import Air from "../../assets/air_quality.png";
import Calendar from "../../assets/google_calendar.png";
import HydroPonic from "../../assets/hydroponics.png";
import HygroMeter from "../../assets/hygrometer.png";
import NextPageIcon from "../../assets/next_page.png";
import Partly from "../../assets/partly_cloudy_day.png";
import Sun from "../../assets/sun.png";
import Wet from "../../assets/wet.png";
import espadaDeRey from "../../assets/espadaderey_4.png";
import pino from "../../assets/pino_4.png";

const plantData = {
    "Espada de rey": {
        image: espadaDeRey,
        stats: [100, 100, 100, 100], 
        icons: [HydroPonic, Sun, Air, Partly, Wet] 
    },
    "Pino": {
        image: pino,
        stats: [80, 60, 70, 90], 
        icons: [Wet, Sun, Air, Partly] 
    }
};

export default function SpecificPlant() {
    const { plantName } = useParams();
    const plant = plantData[plantName];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const handlePreviousDay = () => {
        setCurrentDate((prevDate) => new Date(prevDate.setDate(prevDate.getDate() - 1)));
    };

    const handleNextDay = () => {
        setCurrentDate((prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1)));
    };

    const toggleContainer = () => {
        setIsOpen(!isOpen);
    };

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <div className={style.container}>
            <Nav />
            {plant ? (
                <div className={style.plantInfo}>
                    <div>
                        <h2>{plantName}</h2>
                        <img src={plant.image} alt={plantName} className={style.plantImage} />
                    </div>

                    <div className={style.cardContent}>
                        <img src={Calendar} className={style.calendarIcon} alt="calendar" />
                        <div className={style.calendar}>
                            <img
                                src={NextPageIcon}
                                alt="previous"
                                className={style.nextPageLeft}
                                onClick={handlePreviousDay}
                            />
                            <span className={style.calendarDay}>{formatDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))}</span>
                            <span className={style.today}>{formatDate(currentDate)}</span>
                            <span className={style.calendarDay}>{formatDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))}</span>
                            <img
                                src={NextPageIcon}
                                alt="next"
                                className={style.nextPageRight}
                                onClick={handleNextDay}
                            />
                        </div>

                        <div className={style.stats}>
                            {plant.stats.map((stat, index) => (
                                <div key={index} className={style.stat}>
                                    <div className={style.circulo}>
                                        <span>{stat} %</span>
                                    </div>
                                    <img src={plant.icons[index]} alt="icon" className={style.icono} />
                                </div>
                            ))}
                        </div>

                        {isOpen && (
                            <div className={style.container2}>
                                <div>
                                    <div className={style.porcentajeAgua}>
                                        <h3>Porcentaje de humedad de la planta</h3>
                                    </div>
                                    <img src={HygroMeter} style={{ width: '50px' }} alt="Porcentaje de agua" />
                                </div>

                                <div className={style.buttons}>
                                    <button>Regar ahora</button>
                                    <button>Guardar</button>
                                </div>
                            </div>
                        )}
                         <div className={style.nextPageUp} onClick={toggleContainer}>
                            <img
                                src={NextPageIcon}
                                alt=""
                                className={isOpen ? 'open' : 'closed'}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Planta no encontrada</p>
            )}
            <Footer />
        </div>
    );
}
