import Style from './AgregarPlanta.module.css';
import React, { useState, useEffect } from 'react';
import Nav from '../../components/nav/nav';
import Footer from '../../components/footer/footer';
import FormularioPlanta from '../../components/FormularioPlantaCliente/FormularioPlantaCliente';
import ImageUploader from '../../components/ImageUploader/ImageUploader';


export default function AgregarPlanta() {
  return (
    <div className={Style.containerAgregar}>
        <Nav/>
        <div className={Style.containerSectionAdd}>
            <h2>Agregar nueva planta</h2>
            <div className={Style.containerFormulario}>
            <FormularioPlanta/>
            <ImageUploader bandera='false'/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
