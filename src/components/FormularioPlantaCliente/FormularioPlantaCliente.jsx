import { useState, forwardRef, useImperativeHandle } from "react";
import Input from "../Input/Input";
import Input2 from "../Input/Input2";
import Button from "../Button/Button";
import Style from "./FormularioPlantaCliente.module.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const FormularioPlantaCliente = forwardRef((props, ref) => {
  const [nombreCientifico, setnombreCientifico] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setcategoria] = useState("");
  const [familia, setfamilia] = useState("");
  const [tipo, setTipo] = useState('');
  const [temperaturaTierra, setTemperaturaTierra] = useState('')
  const [humedadTierra, setHumedadTierra] = useState('')
  const [luz, setLuz] = useState('')
  const [temperatura, setTemperatura] = useState('')
  const [gas, setGas] = useState('')
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Permite que el padre acceda al ref del formulario
  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      const formElement = document.getElementById("formulario-PlantaCliente");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  const handleEntrar = () => {
    // Validar que ambos campos estén llenos
    if (
      nombreCientifico.trim() !== "" &&
      familia.trim() !== "" &&
      nombre.trim() !== "" &&
      categoria.trim() !== ""
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
    <div id="formulario-PlantaCliente" className={Style.containerForm}>
      <div className={Style.containerInputs}>
        <div className={Style.groups}>
          <Input2
            texto="Nombre"
            type="text"
            value={nombre}
            options={["Opción 1", "Opción 2", "Opción 3"]}
            onChange={(newValue) => setNombre(newValue)}
          />
          <Input
            texto="categoria"
            type="text"
            value={categoria}
            onChange={(newValue) => setcategoria(newValue)}
          />
          <Input
            texto="Nombre Cientifico"
            type="text"
            value={nombreCientifico}
            onChange={(newValue) => setnombreCientifico(newValue)}
          />
          <Input
            texto="Familia"
            type="text"
            value={familia}
            onChange={(newValue) => setfamilia(newValue)}
          />
          <Input
            texto="Gas"
            type="text"
            value={gas}
            onChange={(newValue) => setGas(newValue)}
          />
        </div>
        <div className={Style.groups}>
          <Input
            texto="Tipo"
            type="text"
            value={tipo}
            onChange={(newValue) => setTipo(newValue)}
          />
          <Input
            texto="Temperatura de la tierra"
            type="text"
            value={temperaturaTierra}
            onChange={(newValue) => setTemperaturaTierra(newValue)}
          />
          <Input
            texto="Humedad de la tierra"
            type="text"
            value={humedadTierra}
            onChange={(newValue) => setHumedadTierra(newValue)}
          />
          <Input
            texto="Luminocidad"
            type="text"
            value={luz}
            onChange={(newValue) => setLuz(newValue)}
          />
          <Input
            texto="Temperatura ambiente"
            type="text"
            value={temperatura}
            onChange={(newValue) => setTemperatura(newValue)}
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

export default FormularioPlantaCliente;
