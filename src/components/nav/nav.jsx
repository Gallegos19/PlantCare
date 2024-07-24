import React, { useState } from "react";
import style from "./nav.module.css";
import { HiMenu } from "react-icons/hi";
import search from "../../assets/google_web_search.png";
import user from "../../assets/male_user.png";
import plus from "../../assets/plus.png";
import ProfileCard from "../user/user";
import { fetchUserbyEmail } from "../../utils/RequestPlant/requestPlant";
import { useNavigate } from "react-router-dom";
import { RiCloseCircleFill } from "react-icons/ri";

export default function Nav() {
    const [showProfile, setShowProfile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [name, setName] = useState('');
    const emailU = localStorage.getItem('userEmail')
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt')


    const toggleProfile = () => {
        setShowProfile(!showProfile);
        handleUser();
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        handleUser();
    };
    
    const handleUser = async () => {
        const user = await fetchUserbyEmail(emailU, token)
        setName(user.name )

    }

    return (
        <div>
            {/* Contenedor del menú horizontal */}
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

            {/* Condición para mostrar el ícono de menú en dispositivos móviles */}
            <div className={`${style.menuToggle} ${isMobileMenuOpen ? style.hideToggle : ''}`} onClick={toggleMobileMenu}>
                {!isMobileMenuOpen ? <HiMenu /> : <span className={style.closeIcon} onClick={toggleMobileMenu}>&times;</span>}
            </div>

            {/* Contenedor del menú responsive */}
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

                {/* Contenedor del perfil en dispositivos móviles */}
                {showProfile && (
                    <div className={style.profileContainerMovil}>
                    <ProfileCard name={' Hola '+name} email={'Correo: '+emailU}/>
                    </div>
                )}
                <div className={style.user}>
                    <button onClick={toggleProfile}><img src={user} alt="Usuario" /></button>
                </div>
            </div>

            {/* Contenedor del perfil */}
            {showProfile && (
                <div className={style.profileContainer}>
                    <ProfileCard name={' Hola '+name} email={'Correo: '+emailU}/>
                </div>
            )}
        </div>
    );
}
