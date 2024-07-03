import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Style from './FormularioLogin.module.css';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

const FormularioLogin = forwardRef((props, ref) => {
  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  // Permite que el padre acceda al ref del formulario
  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      const formElement = document.getElementById("formulario-login");
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }));

  const handleEntrar = () => {
    // Validar que ambos campos estén llenos
    if (username.trim() !== '' && contrasena.trim() !== '') {
      navigate('/');
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
    <div id="formulario-login" className={Style.containerForm}>
      <Input
        texto="Usuario"
        type="email"
        value={username}
        onChange={(newValue) => setUsername(newValue)}
      />
      <Input
        texto="Contraseña"
        type='password'
        value={contrasena}
        onChange={(newValue) => setContrasena(newValue)}
      />

        <div onClick={handleEntrar} >
        <Button title='Entrar'/>
        </div>
     

      <div onClick={() => navigate('/register')}>
        <p className={Style.text}>
          ¿Aún no estás registrado? Regístrate aquí
        </p>
      </div>

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default FormularioLogin;
