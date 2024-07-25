import React, { useState } from 'react';
import style from "./Input.module.css"
const MacAddressValidator = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue); // Pasar el nuevo valor al formulario
  };

  const validateMac = (mac) => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    setIsValid(macRegex.test(mac));
  };

  React.useEffect(() => {
    validateMac(value); // Validar cuando el valor cambia
  }, [value]);

  return (
    <div className={style.input_group}>
      <input
        className={style.input}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder=" "
      />
      <label className="user_label">MAC</label>
      {!isValid && <p style={{ color: 'red' }}>Invalid MAC Address</p>}
    </div>
  );
};

export default MacAddressValidator;
