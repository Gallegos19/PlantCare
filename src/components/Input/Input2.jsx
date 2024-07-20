import { useState } from "react";
import Style from './Input.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Snackbar, Alert, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function Input2(props) {
  const { texto, type, value, onChange, options } = props;

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
      const valueStr = value ? String(value) : "";
      valid = valueStr.trim() !== "";
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

  let inputElement;
  if (texto.toLowerCase() === "contraseña") {
    inputElement = (
      <>
        <input
          required
          type={showPassword ? "text" : "password"}
          name={texto.toLowerCase()}
          autoComplete="off"
          className={`${Style.input} ${isValid ? "" : Style.invalid}`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder=" "
        />
        <button type="button" onClick={togglePasswordVisibility} className={Style.toggle_password_button}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </>
    );
  } else if (texto.toLowerCase() === "correo") {
    inputElement = (
      <input
        required
        type='email'
        name={texto.toLowerCase()}
        autoComplete="off"
        className={`${Style.input} ${isValid ? "" : Style.invalid}`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=" "
      />
    );
  } else if (options) {
    inputElement = (
      <FormControl className={`${Style.input} ${isValid ? "" : Style.invalid}`} style={{ width: '100%' }}>
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          onBlur={handleBlur}
          IconComponent={IoIosArrowDropdownCircle}
          className={Style.select_input}
        >
          <MenuItem value="" disabled>{`Seleccione ${texto.toLowerCase()}`}</MenuItem>
          {options.map((option, index) => (
            <MenuItem key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else {
    inputElement = (
      <input
        required
        type={type || 'text'}
        name={texto.toLowerCase()}
        autoComplete="off"
        className={`${Style.input} ${isValid ? "" : Style.invalid}`}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=" "
      />
    );
  }

  return (
    <div className={Style.input_group}>
      {inputElement}
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