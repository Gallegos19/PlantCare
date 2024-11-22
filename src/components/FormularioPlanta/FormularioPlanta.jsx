import { useState,useEffect, forwardRef, useImperativeHandle } from "react";
import Input from "../Input/Input";
import Input3 from "../Input/Input3";
import Button from "../Button/Button";
import Style from "./FormularioPlanta.module.css";
import { createPlant,fetchCategories, fetchTypes, fetchFamilies} from "../../utils/RequestPlant/requestPlant";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import ImageUploader from "../ImageUploader/ImageUploader";

const FormularioPlanta = forwardRef((props, ref) => {
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
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [families, setFamilies] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem('jwt')
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      const formElement = document.getElementById("formulario-Planta");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await fetchCategories(token);
        setCategories(fetchedCategories.map(item => item.name));
        
        const fetchedTypes = await fetchTypes(token);
        setTypes(fetchedTypes.map(item => item.name));

        const fetchedFamilies = await fetchFamilies(token);
        setFamilies(fetchedFamilies.map(item => item.name));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEntrar = async () => {
    if (
      nombreCientifico.trim() !== "" &&
      familia.trim() !== "" &&
      nombre.trim() !== "" &&
      categoria.trim() !== ""
    ) {
      const plantData = {
        name_scientific: nombreCientifico,
        name: nombre,
        humidity_earth: humedadTierra,
        brightness: luz,
        ambient_temperature: temperatura,
        mq135: gas,
        humidity_environment: temperaturaTierra,
        categories: [categoria],
        types: [tipo],
        families: [familia],
        url_image_plant: imageUrl 
      };
  
      try {
        const response = await createPlant(plantData, token);
        console.log("Plant created successfully:", response);
        navigate("/admin"); // Navigate to the home page or another page
      } catch (error) {
        console.error("Error creating plant:", error);
        setAlertMessage("Hubo un error al crear la planta.");
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
    <div id="formulario-Planta" className={Style.containerForm}>
      <div className={Style.containerInputs}>
        <div className={Style.groups}>
          <Input
            texto="Nombre"
            type="text"
            value={nombre}
            onChange={(newValue) => setNombre(newValue)}
          />
          <Input3
            texto="Categoría"
            type="text"
            value={categoria}
            options={categories}
            onChange={(newValue) => setCategoria(newValue)}
          />
          <Input
            texto="Nombre Científico"
            type="text"
            value={nombreCientifico}
            onChange={(newValue) => setNombreCientifico(newValue)}
          />
          <Input3
            texto="Familia"
            type="text"
            value={familia}
            options={families}
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
          <Input3
            texto="Tipo"
            type="text"
            value={tipo}
            options={types}
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
      <ImageUploader bandera='true' setImageUrl={setImageUrl} />
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