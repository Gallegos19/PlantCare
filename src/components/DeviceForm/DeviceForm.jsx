import React, { useState } from 'react';
import style from "./deviceForm.module.css"
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Snackbar, Alert } from '@mui/material';

export default function DeviceForm() {
  const [mac, setMac] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombrePlanta, setNombrePlanta] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleGuardar = () => {
    if (mac.trim() && correo.trim() && nombrePlanta.trim()) {
      // Aquí puedes añadir la lógica para enviar los datos a tu API
      console.log({ mac, correo, nombrePlanta });
      setAlertMessage('Dispositivo agregado correctamente.');
      setAlertOpen(true);
    } else {
      setAlertMessage('Por favor, completa todos los campos.');
      setAlertOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <div className={style.containerAgregar}>
      <div className={style.containerSectionAdd}>
        <h2>Agregar nuevo Dispositivo</h2>
        <div className={style.containerFormulario}>
          <Input
            texto="Dirección MAC"
            type="text"
            value={mac}
            onChange={setMac}
          />
          <Input
            texto="Correo"
            type="email"
            value={correo}
            onChange={setCorreo}
          />
          <Input
            texto="Nombre de la Planta"
            type="text"
            value={nombrePlanta}
            onChange={setNombrePlanta}
          />
          <div onClick={handleGuardar}>
            <Button title="Guardar" />
          </div>
        </div>
      </div>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
