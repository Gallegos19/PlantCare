import { useState, forwardRef, useImperativeHandle } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Style from "./FormularioPlanta.module.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const FormularioPlanta = forwardRef((props, ref) => {
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Permite que el padre acceda al ref del formulario
  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      const formElement = document.getElementById("formulario-Planta");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  const handleEntrar = () => {
    // Validar que ambos campos estén llenos
    if (
      username.trim() !== "" &&
      contrasena.trim() !== "" &&
      nombre.trim() !== "" &&
      apellido.trim() !== ""
    ) {
      navigate("/login");
    } else {
      setAlertMessage("Por favor, completa todos los campos.");
      setAlertOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <div id="formulario-Planta" className={Style.containerForm}>
      <div className={Style.containerInputs}>
        <div className={Style.groups}>
          <Input
            texto="Nombre"
            type="text"
            value={nombre}
            onChange={(newValue) => setNombre(newValue)}
          />
          <Input
            texto="Apellido"
            type="text"
            value={apellido}
            onChange={(newValue) => setApellido(newValue)}
          />
          <Input
            texto="Correo"
            type="email"
            value={username}
            onChange={(newValue) => setUsername(newValue)}
          />
          <Input
            texto="Contraseña"
            type="password"
            value={contrasena}
            onChange={(newValue) => setContrasena(newValue)}
          />
        </div>
        <div className={Style.groups}>
          <Input
            texto="Nombre"
            type="text"
            value={nombre}
            onChange={(newValue) => setNombre(newValue)}
          />
          <Input
            texto="Apellido"
            type="text"
            value={apellido}
            onChange={(newValue) => setApellido(newValue)}
          />
          <Input
            texto="Correo"
            type="email"
            value={username}
            onChange={(newValue) => setUsername(newValue)}
          />
          <Input
            texto="Contraseña"
            type="password"
            value={contrasena}
            onChange={(newValue) => setContrasena(newValue)}
          />
        </div>
      </div>
      <div onClick={handleEntrar}>
            <Button title="Guardar" />
          </div>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default FormularioPlanta;
