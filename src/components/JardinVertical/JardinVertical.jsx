import React from 'react'
import style from './Jardin.module.css'
import Muro from '../../assets/muroPlantas.jpg'
export default function JardinVertical() {
  return (
    <div className={style.container}>
        <img src={Muro} alt="" />
        <h2 className={style.overlayText}>PLANTCARE</h2>
    </div>
  )
}
