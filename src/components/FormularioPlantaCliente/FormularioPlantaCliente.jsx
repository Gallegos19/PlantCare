import { useState, useEffect, forwardRef, useContext, useImperativeHandle } from "react";
import Input from "../Input/Input";
import Input2 from "../Input/Input2";
import Button from "../Button/Button";
import Style from "./FormularioPlantaCliente.module.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { fetchPlants } from '../../utils/RequestPlant/requestPlant';
import PlantContext from "../PlantContext/plantContext";
import ImageUploaderClient from "../ImageUploader/ImageUploaderClient";
import { createDevice } from "../../utils/RequestPlant/requestPlant";
import MacAddressValidator from "../Input/MacInput";

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
  const [mac, setMac] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [plants, setPlants] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const { addPlant } = useContext(PlantContext);
  const token = localStorage.getItem('jwt')

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  useEffect(() => {
    const loadPlants = async () => {
      try {
        const data = await fetchPlants(token);
        console.log("Plantas cargadas:", data);
        setPlants(data.map(plant => ({
          value: plant.name,
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
          imageUrl: plant.url_image_plant
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

  const handleChange = (setter) => (newValue) => {
    console.log("Nuevo valor:", newValue);
    setter(newValue || "");
  };

  const handlePlantSelect = (plantName) => {
    const selectedPlant = plants.find(plant => plant.value === plantName);
    if (selectedPlant) {
      handleChange(setNombre)(selectedPlant.label || "");
      handleChange(setCategoria)(selectedPlant.categories.length > 0 ? selectedPlant.categories[0] : "");
      handleChange(setNombreCientifico)(selectedPlant.name_scientific || "");
      handleChange(setFamilia)(selectedPlant.families.length > 0 ? selectedPlant.families[0] : "");
      handleChange(setTipo)(selectedPlant.types.length > 0 ? selectedPlant.types[0] : "");
      handleChange(setTemperaturaTierra)(selectedPlant.humidity_earth || "");
      handleChange(setHumedadTierra)(selectedPlant.humidity_environment || "");
      handleChange(setLuz)(selectedPlant.brightness || "");
      handleChange(setTemperatura)(selectedPlant.ambient_temperature || "");
      handleChange(setGas)(selectedPlant.mq135 || "");
      setImageUrl(selectedPlant.imageUrl || ""); // Actualiza la URL de la imagen
    } else {
      // Limpiar campos si no se encuentra la planta
      handleChange(setNombre)("");
      handleChange(setCategoria)("");
      handleChange(setNombreCientifico)("");
      handleChange(setFamilia)("");
      handleChange(setTipo)("");
      handleChange(setTemperaturaTierra)("");
      handleChange(setHumedadTierra)("");
      handleChange(setLuz)("");
      handleChange(setTemperatura)("");
      handleChange(setGas)("");
      setImageUrl(""); // Limpiar la URL de la imagen
    }
  };

  const validateFields = () => {
    const allFieldsValid = [
      { name: 'nombre', value: nombre },
      { name: 'nombreCientifico', value: nombreCientifico },
      { name: 'categoria', value: categoria },
      { name: 'familia', value: familia },
      { name: 'tipo', value: tipo },
      { name: 'temperaturaTierra', value: temperaturaTierra.toString() },
      { name: 'humedadTierra', value: humedadTierra.toString() },
      { name: 'luz', value: luz.toString() },
      { name: 'temperatura', value: temperatura.toString() },
      { name: 'gas', value: gas.toString() },
      { name: 'mac', value: mac }
    ].every(({ value }) => typeof value === 'string' && value.trim() !== '');

    if (!allFieldsValid) {
      console.log("Validación fallida:");
      console.log("nombre:", nombre, "Tipo:", typeof nombre);
      console.log("nombreCientifico:", nombreCientifico, "Tipo:", typeof nombreCientifico);
      console.log("categoria:", categoria, "Tipo:", typeof categoria);
      console.log("familia:", familia, "Tipo:", typeof familia);
      console.log("tipo:", tipo, "Tipo:", typeof tipo);
      console.log("temperaturaTierra:", temperaturaTierra, "Tipo:", typeof temperaturaTierra);
      console.log("humedadTierra:", humedadTierra, "Tipo:", typeof humedadTierra);
      console.log("luz:", luz, "Tipo:", typeof luz);
      console.log("temperatura:", temperatura, "Tipo:", typeof temperatura);
      console.log("gas:", gas, "Tipo:", typeof gas);
      console.log("mac:", mac, "Tipo:", typeof mac);
    }

    return allFieldsValid;
  };

  const handleEntrar = async () => {

    const userEmail = localStorage.getItem('userEmail');
    console.log("Datos de entrada:", {
      nombre,
      nombreCientifico,
      categoria,
      familia,
      tipo,
      temperaturaTierra,
      humedadTierra,
      luz,
      temperatura,
      gas,
      mac,
      imageUrl,
      userEmail
    });

    if (!userEmail) {
      setAlertMessage("No se encontró el correo electrónico del usuario.");
      setAlertOpen(true);
      return;
    }

    if (validateFields()) {
      const plantData = {
        name: nombre,
        name_scientific: nombreCientifico,
        humidity_earth: humedadTierra,
        brightness: luz,
        ambient_temperature: temperatura,
        mq135: gas,
        humidity_environment: temperaturaTierra,
        categories: [categoria],
        types: [tipo],
        families: [familia],
        url_image_plant: imageUrl,
        mac: mac,
        user: { email: userEmail } // Incluir el correo electrónico en los datos
      };

      try {
        const deviceResponse = await createDevice(plantData, token);
        console.log("Dispositivo creado exitosamente:", deviceResponse);
        navigate("/");
      } catch (error) {
        setAlertMessage("Error al agregar el dispositivo: " + error.message);
        setAlertOpen(true);
      }
    } else {
      setAlertMessage("Por favor, completa todos los campos.");
      setAlertOpen(true);
    }
  };
  return (
    <div id="formulario-PlantaCliente" className={Style.containerForm}>
      <div className={Style.containerInputs}>
        <div className={Style.groups}>
          <Input2
            texto="Planta"
            value={nombre}
            options={plants}
            onChange={(selectedValue) => {
              handleChange(setNombre)(selectedValue);
              handlePlantSelect(selectedValue);
            }}
          />
          <Input
            texto="Categoría"
            type="text"
            value={categoria}
            onChange={handleChange(setCategoria)}
            readOnly
          />
          <Input
            texto="Nombre Científico"
            type="text"
            value={nombreCientifico}
            onChange={handleChange(setNombreCientifico)}
            readOnly
          />
          <Input
            texto="Familia"
            type="text"
            value={familia}
            onChange={handleChange(setFamilia)}
            readOnly
          />
          <Input
            texto="Gas"
            type="number"
            value={gas}
            onChange={handleChange(setGas)}
            readOnly
          />
        </div>
        <div className={Style.groups}>
          <Input
            texto="Tipo"
            type="text"
            value={tipo}
            onChange={handleChange(setTipo)}
            readOnly
          />
          <Input
            texto="Temperatura tierra"
            type="number"
            value={temperaturaTierra}
            onChange={handleChange(setTemperaturaTierra)}
            readOnly
          />
          <Input
            texto="Humedad tierra"
            type="number"
            value={humedadTierra}
            onChange={handleChange(setHumedadTierra)}
            readOnly
          />
          <Input
            texto="Luminosidad"
            type="number"
            value={luz}
            onChange={handleChange(setLuz)}
            readOnly
          />
          <Input
            texto="Temp ambiente"
            type="number"
            value={temperatura}
            onChange={handleChange(setTemperatura)}
            readOnly
          />
        </div>
        <div className={Style.groups}>
          <MacAddressValidator
            value={mac}
            onChange={handleChange(setMac)}
          />
        </div>
      </div>
      <div className={Style.img}>
        <ImageUploaderClient imageUrl={imageUrl} bandera="true" setImageUrl={setImageUrl} />
        <div onClick={handleEntrar}>
          <Button title="Guardar" />
        </div>
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