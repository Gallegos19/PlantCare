import React from 'react';
import style from './user.module.css';
import helpIcon from '../../assets/help.png';
import logoutIcon from '../../assets/logout_rounded.png';

export default function ProfileCard({ name, email }) {
    return (
        <div className={style.container}>
            <div className={style.profileCard}>
                <h2 className={style.name}>{name}</h2>
                <p className={style.email}>{email}</p>
                <div className={style.buttonContainer}>
                    <button className={style.button}>
                        <img src={helpIcon} alt="Dudas/apoyo" className={style.icon} />
                        Dudas / apoyo
                        <span className={style.arrow}>→</span>
                    </button>
                    <button className={style.button}>
                        <img src={logoutIcon} alt="Cerrar Sesión" className={style.icon} />
                        Cerrar Sesión
                        <span className={style.arrow}>→</span>
                    </button>
                </div>
            </div>
        </div>

    );
}
