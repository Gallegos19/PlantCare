import React from 'react'
import style from './Cabecera.module.css';


export default function CabeceraTitle(props) {
  return (
    <div className={style.containerCabecera}>
        <h2>
            {props.titulo}
        </h2>
    </div>
  )
}
