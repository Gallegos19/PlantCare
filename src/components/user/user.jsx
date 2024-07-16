import React from 'react';
import style from './user.module.css';
import helpIcon from '../../assets/help.png';
import logoutIcon from '../../assets/logout_rounded.png';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({ name, email }) {
    const navigate = useNavigate();

    const handleSupportClick = () => {
        const email = 'devquality1@gmail.com';
        const subject = encodeURIComponent('Dudas / Apoyo');
        window.location.href = `mailto:${email}?subject=${subject}`;
    };

    return (
        <div className={style.container}>
            <div className={style.profileCard}>
                <h2 className={style.name}>{name}</h2>
                <p className={style.email}>{email}</p>
                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={handleSupportClick}>
                        <img src={helpIcon} alt="Dudas/apoyo" className={style.icon} />
                        Dudas / apoyo
                        <span className={style.arrow}>→</span>
                    </button>
                    <button className={style.button} onClick={() => { navigate('/login') }}>
                        <img src={logoutIcon} alt="Cerrar Sesión" className={style.icon} />
                        Cerrar Sesión
                        <span className={style.arrow}>→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
