import React, { useState } from "react";
import style from "./nav.module.css";
import search from "../../assets/google_web_search.png";
import user from "../../assets/male_user.png";
import plus from "../../assets/plus.png";
import ProfileCard from "../user/user";

export default function Nav() {
    const [showProfile, setShowProfile] = useState(false);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    return (
        <div>
            <div className={style.nav}>
                <a>PLANTCARE</a>
                
                <div className={style.buscador}>
                    <input className={style.search} type="text" placeholder="Buscar" />
                    <img src={search} alt="Buscar" />
                </div>
                
                <a>Inicio</a>
                <a>Graficas</a>
                <a>Datos</a>
                <a>Añadir <img src={plus} alt="Añadir" /></a>
                
                <div className={style.user}>
                    <button onClick={toggleProfile}><img src={user} alt="Usuario" /></button>
                </div>
            </div>
            {showProfile && (
                <div className={style.profileContainer}>
                    <ProfileCard name="Nombre Completo" email="Correo electrónico" />
                </div>
            )}
        </div>
    );
}
