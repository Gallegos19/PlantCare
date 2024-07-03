import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Style from './FormularioLogin.module.css';

const FormularioLogin = forwardRef((props, ref) => {
  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Permite que el padre acceda al ref del formulario
  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      const formElement = document.getElementById("formulario-login");
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }));

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

      <Button title='Entrar' />

      <p className={Style.text}> ¿Aun no estas registrado?
        Registrate aqui</p>
    </div>
  );
});

export default FormularioLogin;
