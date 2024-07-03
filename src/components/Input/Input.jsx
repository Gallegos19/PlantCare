import { useState } from "react";
import Style from './Input.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Snackbar, Alert } from '@mui/material';

export default function Input(props) {
  let { texto, type, value, onChange } = props;

  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (event) => {
    onChange(event.target.value);
    setIsValid(true);
  };

  const handleBlur = () => {
    let valid = false;
    if (texto.toLowerCase() === "correo") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      valid = emailRegex.test(value);
      if (!valid) {
        setAlertMessage("Por favor, ingrese un correo electrónico válido.");
        setAlertOpen(true);
      }
    } else {
      valid = value ? value.trim() !== "" : false;
      if (!valid) {
        setAlertMessage("Este campo no puede estar vacío.");
        setAlertOpen(true);
      }
    }
    setIsValid(valid);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  let inputType;
  if (texto.toLowerCase() === "contraseña") {
    inputType = showPassword ? "text" : "password";
  } else if (texto.toLowerCase() === "correo") {
    inputType = 'email';
  } else {
    inputType = type || 'text';
  }

  return (
    <div className={Style.input_group}>
      <input
        required
        type={inputType}
        name={texto.toLowerCase()}
        autoComplete="off"
        className={`${Style.input} ${isValid ? "" : Style.invalid}`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=" " 
      />
      {texto.toLowerCase() === "contraseña" && (
        <button type="button" onClick={togglePasswordVisibility} className={Style.toggle_password_button}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}

      <label className={Style.user_label}>
        {texto}
      </label>

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
