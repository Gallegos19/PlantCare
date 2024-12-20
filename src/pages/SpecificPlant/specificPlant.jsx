import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {io} from "socket.io-client"
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import style from "./specificPlant.module.css";
import Air from "../../assets/air_quality.png";
import Calendar from "../../assets/google_calendar.png";
import HygroMeter from "../../assets/hygrometer.png";
import NextPageIcon from "../../assets/next_page.png";
import Partly from "../../assets/partly_cloudy_day.png";
import Sun from "../../assets/sun.png";
import Wet from "../../assets/wet.png";

export default function SpecificPlant() {
    const { plantName } = useParams();
    const [plant, setPlant] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [socket, setSocket] = useState(null); // Estado para almacenar la conexión del socket
    const device = localStorage.getItem('device'); // Obtener la dirección MAC del dispositivo desde el localStorage

    useEffect(() => {
        const getPlant = () => {
            try {
                const plantsData = JSON.parse(localStorage.getItem('plants')) || [];
                console.log("Fetched plants data from localStorage:", plantsData);
                const specificPlant = plantsData.find(p => p.name === plantName);
                console.log("Specific plant found:", specificPlant);
                setPlant(specificPlant);
            } catch (error) {
                console.error("Error reading plant data from localStorage:", error);
            }
        };

        getPlant();
    }, [plantName]);

    useEffect(() => {
        if (device) {
            const socketConexion = io('https://plantcaresocket.integrador.xyz/');

            setSocket(socketConexion);

            socketConexion.on('connect', () => {
                console.log('Conectado a Socket.IO');
                socketConexion.emit('join', 'boton'); // Unirse a la sala "plantRoom"
            });


            return () => {
                socketConexion.disconnect();
                console.log('Desconectado de Socket.IO');
            };
        }
    }, [device]);

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

    const handleRegar = () => {
        if (socket) {
            socket.emit('chat message',device+','+1,'boton','yo'); // Enviar la señal para regar la planta
        }
    };

    return (
        <div className={style.container}>
            <Nav />
            {plant ? (
                <div className={style.plantInfo}>
                    <div>
                        <h2>{plant.name}</h2>
                        <img src={plant.url_image_plant} alt={plant.name} className={style.plantImage} />
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
                            <div className={style.stat}>
                                <div className={style.circulo}>
                                    <span>{plant.humidity_earth} %</span>
                                </div>
                                <img src={Wet} alt="Humidity Earth" className={style.icono} />
                            </div>
                            <div className={style.stat}>
                                <div className={style.circulo}>
                                    <span>{plant.humidity_environment} %</span>
                                </div>
                                <img src={HygroMeter} alt="Humidity Environment" className={style.icono} />
                            </div>
                            <div className={style.stat}>
                                <div className={style.circulo}>
                                    <span>{plant.brightness} %</span>
                                </div>
                                <img src={Sun} alt="Brightness" className={style.icono} />
                            </div>
                            <div className={style.stat}>
                                <div className={style.circulo}>
                                    <span>{plant.ambient_temperature} °C</span>
                                </div>
                                <img src={Partly} alt="Ambient Temperature" className={style.icono} />
                            </div>
                            <div className={style.stat}>
                                <div className={style.circulo}>
                                    <span>{plant.mq135} ppm</span>
                                </div>
                                <img src={Air} alt="MQ135" className={style.icono} />
                            </div>
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
                                    <button onClick={handleRegar}>Regar ahora</button>
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
