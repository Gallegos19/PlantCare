import React, { useState } from "react";
import style from "./nav.module.css";
import { HiMenu } from "react-icons/hi";
import search from "../../assets/google_web_search.png";
import user from "../../assets/male_user.png";
import plus from "../../assets/plus.png";
import ProfileCard from "../user/user";

export default function Nav() {
    const [showProfile, setShowProfile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div>
            {/* Contenedor del menú horizontal */}
            <div className={`${style.nav} ${isMobileMenuOpen ? style.hideNav : ''}`}>
                <a>PLANTCARE</a>

                <div className={style.buscador}>
                    <input className={style.search} type="text" placeholder="Buscar" />
                    <img src={search} style={{ position: 'relative', cursor: 'pointer', right: '5px', bottom: '4px' }} alt="Buscar" />
                </div>

                <a>Inicio</a>
                <a>Gráficas</a>
                <a>Datos</a>
                <a>Añadir <img src={plus} alt="Añadir" /></a>

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
                <span className={style.closeIcon} onClick={toggleMobileMenu}>&times;</span>
                <a>PLANTCARE</a>
                <a onClick={toggleMobileMenu}>Inicio</a>
                <a onClick={toggleMobileMenu}>Gráficas</a>
                <a onClick={toggleMobileMenu}>Datos</a>
                <a onClick={toggleMobileMenu}>Añadir <img src={plus} alt="Añadir" /></a>

                {/* Contenedor del perfil en dispositivos móviles */}
                {showProfile && (
                    <div className={style.profileContainerMovil}>
                        <ProfileCard name="Nombre Completo" email="Correo electrónico" />
                    </div>
                )}
                <div className={style.user}>
                    <button onClick={toggleProfile}><img src={user} alt="Usuario" /></button>
                </div>
            </div>

            {/* Contenedor del perfil */}
            {showProfile && (
                <div className={style.profileContainer}>
                    <ProfileCard name="Nombre Completo" email="Correo electrónico" />
                </div>
            )}
        </div>
    );
}
