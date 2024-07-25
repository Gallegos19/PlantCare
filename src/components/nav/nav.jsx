import React, { useState, useEffect } from "react";
import style from "./nav.module.css";
import { HiMenu } from "react-icons/hi";
import search from "../../assets/google_web_search.png";
import user from "../../assets/male_user.png";
import plus from "../../assets/plus.png";
import ProfileCard from "../user/user";
import { fetchUserbyEmail } from "../../utils/RequestPlant/requestPlant";
import { useNavigate } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";
import { io } from "socket.io-client";
import { Snackbar, Alert } from "@mui/material";

export default function Nav() {
    const [showProfile, setShowProfile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [name, setName] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");
    const emailU = localStorage.getItem('userEmail');
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        const socketConexion = io('https://plantcaresocket.integrador.xyz/');

        const macs = JSON.parse(localStorage.getItem('macs')) || [];

        socketConexion.on('connect', () => {
            console.log('Conectado a Socket.IO');
            macs.forEach(mac => {
                socketConexion.emit('join room', mac.mac);
                // console.log('Unido a la room:', mac.mac);
            });

            socketConexion.on('chat message', (msg, roomName) => {
                // console.log('Mensaje recibido:', msg, 'de la room:', roomName);

                try {
                    const sensorData = JSON.parse(msg.msg);
                    // console.log('Datos del sensor:', sensorData);

                    const { humidityEarth, brightness, ambientTemperature, MAC } = sensorData;

                    let alertContent = "";

                    if (humidityEarth > 2500) {
                        alertContent = `La humedad de la tierra está muy alta (${humidityEarth}). Dispositivo: ${MAC}`;
                        setAlertType("warning");
                    } else if (brightness > 500) {
                        alertContent = `La luminosidad está muy alta (${brightness}). Dispositivo: ${MAC}`;
                        setAlertType("warning");
                    } else if (ambientTemperature > 35) {
                        alertContent = `La temperatura ambiente está muy alta (${ambientTemperature}°C). Dispositivo: ${MAC}`;
                        setAlertType("warning");
                    }

                    if (alertContent) {
                        setAlertMessage(alertContent);
                        setAlertOpen(true);
                    }
                } catch (error) {
                    console.error('Error al parsear el mensaje:', error);
                }
            });
        });

        socketConexion.on('disconnect', () => {
            console.log('Desconectado de Socket.IO');
        });

        return () => {
            socketConexion.off('connect');
            socketConexion.off('chat message');
            socketConexion.off('disconnect');
            socketConexion.disconnect();
        };
    }, []);

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
        handleUser();
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        handleUser();
    };

    const handleUser = async () => {
        try {
            const user = await fetchUserbyEmail(emailU, token);
            setName(user.name);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div>
            <div className={`${style.nav} ${isMobileMenuOpen ? style.hideNav : ''}`}>
                <a onClick={() => navigate('/')}>PLANTCARE</a>

                <div className={style.buscador}>
                    <input className={style.search} type="text" placeholder="Buscar" />
                    <img src={search} style={{ position: 'relative', cursor: 'pointer', right: '10px', bottom: '6px' }} alt="Buscar" />
                </div>

                <a onClick={() => navigate('/')}>Inicio</a>
                <a onClick={() => navigate('/graph')}>Gráficas</a>
                <a onClick={() => navigate('/dataClient')}>Datos</a>
                <a onClick={() => navigate('/agregarplanta')}>Añadir <img src={plus} alt="Añadir" /></a>

                <div className={style.user}>
                    <button onClick={toggleProfile}><img src={user} alt="Usuario" /></button>
                </div>
            </div>

            <div className={`${style.menuToggle} ${isMobileMenuOpen ? style.hideToggle : ''}`} onClick={toggleMobileMenu}>
                {!isMobileMenuOpen ? <HiMenu /> : <span className={style.closeIcon} onClick={toggleMobileMenu}>&times;</span>}
            </div>

            <div className={`${style.menu} ${isMobileMenuOpen ? style.menuOpen : ''}`}>
                <span className={style.closeIcon} onClick={toggleMobileMenu}><RiCloseCircleFill size={30} color='#233B27'/></span>
                <a onClick={() => navigate('/')}>PLANTCARE</a>
                <div className={style.buscador}>
                    <input className={style.search} type="text" placeholder="Buscar" />
                    <img src={search} style={{ position: 'relative', cursor: 'pointer', right: '10px', bottom: '6px' }} alt="Buscar" />
                </div>
                <a onClick={() => navigate('/')}>Inicio</a>
                <a onClick={() => navigate('/graph')}>Gráficas</a>
                <a onClick={() => navigate('/dataClient')}>Datos</a>
                <a onClick={() => navigate('/agregarplanta')}>Añadir <img src={plus} alt="Añadir" /></a>

                {showProfile && (
                    <div className={style.profileContainerMovil}>
                        <ProfileCard name={'Hola ' + name} email={'Correo: ' + emailU}/>
                    </div>
                )}
                <div className={style.user}>
                    <button onClick={toggleProfile}><img src={user} alt="Usuario" /></button>
                </div>
            </div>

            {showProfile && (
                <div className={style.profileContainer}>
                    <ProfileCard name={'Hola ' + name} email={'Correo: ' + emailU}/>
                </div>
            )}

            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
