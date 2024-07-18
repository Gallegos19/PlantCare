import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Input from "../Input/Input";
import Input2 from "../Input/Input2";
import Button from "../Button/Button";
import Style from "./FormularioPlantaCliente.module.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { fetchPlants } from '../../utils/RequestPlant/requestPlant';



const FormularioPlantaCliente = forwardRef((props, ref) => {
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [familia, setFamilia] = useState("");
  const [tipo, setTipo] = useState("");
  const [temperaturaTierra, setTemperaturaTierra] = useState("");
  const [humedadTierra, setHumedadTierra] = useState("");
  const [luz, setLuz] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [gas, setGas] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const data = await fetchPlants();
        console.log("Plantas cargadas:", data);
        setPlants(data.map(plant => ({
          value: plant.id,
          label: plant.name,
          name_scientific: plant.name_scientific,
          humidity_earth: plant.humidity_earth,
          humidity_environment: plant.humidity_environment,
          brightness: plant.brightness,
          ambient_temperature: plant.ambient_temperature,
          mq135: plant.mq135,
          categories: plant.categories,
          types: plant.types,
          families: plant.families,
        })));
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    loadPlants();
  }, []);

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      const formElement = document.getElementById("formulario-PlantaCliente");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  const handlePlantSelect = (plantId) => {
    const selectedPlant = plants.find(plant => plant.value === plantId);
    if (selectedPlant) {
      setNombre(selectedPlant.label || "");
      setCategoria(selectedPlant.categories.length > 0 ? selectedPlant.categories[0] : "");
      setNombreCientifico(selectedPlant.name_scientific || "");
      setFamilia(selectedPlant.families.length > 0 ? selectedPlant.families[0] : "");
      setTipo(selectedPlant.types.length > 0 ? selectedPlant.types[0] : "");
      setTemperaturaTierra(selectedPlant.humidity_earth || "");
      setHumedadTierra(selectedPlant.humidity_environment || "");
      setLuz(selectedPlant.brightness || "");
      setTemperatura(selectedPlant.ambient_temperature || "");
      setGas(selectedPlant.mq135 || "");
    } else {
      setNombre("");
      setCategoria("");
      setNombreCientifico("");
      setFamilia("");
      setTipo("");
      setTemperaturaTierra("");
      setHumedadTierra("");
      setLuz("");
      setTemperatura("");
      setGas("");
    }
  };

  const handleEntrar = async () => {
    if (
      nombreCientifico.trim() !== "" &&
      familia.trim() !== "" &&
      nombre.trim() !== "" &&
      categoria.trim() !== ""
    ) {
      const newPlant = {
        name: nombre,
        name_scientific: nombreCientifico,
        categories: [categoria],
        families: [familia],
        types: [tipo],
        humidity_earth: temperaturaTierra,
        humidity_environment: humedadTierra,
        brightness: luz,
        ambient_temperature: temperatura,
        mq135: gas,
      };

      try {
        await savePlant(newPlant); // Guarda la nueva planta
        navigate("/home"); // Redirige al Home
      } catch (error) {
        console.error("Error saving plant:", error);
        setAlertMessage("Error al guardar la planta. Por favor, inténtalo de nuevo.");
        setAlertOpen(true);
      }
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
            texto="Planta"
            value={nombre}
            options={plants}
            onChange={(newValue) => {
              handlePlantSelect(newValue);
              setNombre(newValue);
            }}
          />
          <Input
            texto="Categoría"
            type="text"
            value={categoria}
            onChange={(newValue) => setCategoria(newValue)}
          />
          <Input
            texto="Nombre Científico"
            type="text"
            value={nombreCientifico}
            onChange={(newValue) => setNombreCientifico(newValue)}
          />
          <Input
            texto="Familia"
            type="text"
            value={familia}
            onChange={(newValue) => setFamilia(newValue)}
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
            texto="Luminosidad"
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