import { useState, forwardRef, useImperativeHandle } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Style from "./FormularioRegister.module.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import Input2 from "../Input/Input2";
import { createUser } from "../../utils/RequestPlant/requestPlant";

const FormularioRegister = forwardRef((props, ref) => {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [gender, setGender ] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt')

  // Permite que el padre acceda al ref del formulario
  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      const formElement = document.getElementById("formulario-Register");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  const handleEntrar = async () => {
    // Validar que ambos campos estén llenos
    if (
      correo.trim() !== "" &&
      contrasena.trim() !== "" &&
      nombre.trim() !== "" &&
      apellido.trim() !== "" &&
      rol.trim() !== "" &&
      gender.trim() !== ""
    ) {
        const userData = {
            name: nombre,
            last_name: apellido,
            email: correo,
            password: contrasena,
            rol: rol,
            gender: gender,
          };
        const peticion = await createUser(userData, token)
        if(peticion){
            alert('creado')
            navigate("/admin");
        }
        else{
            navigate('add-user')
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
    <div id="formulario-Register" className={Style.containerForm}>
        <div className={Style.section}>
        <div className={Style.inputSection}>
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
        type="correo"
        value={correo}
        onChange={(newValue) => setCorreo(newValue)}
      />
        </div>
    
      <div className={Style.inputSection}>
      <Input
        texto="Contraseña"
        type="password"
        value={contrasena}
        onChange={(newValue) => setContrasena(newValue)}
      />

      <Input2
        texto="Rol"
        type="text"
        value={rol}
        options={[
          { value: "Administrador", label: "Administrador" },
          { value: "Cliente", label: "Cliente" },
        ]}
        onChange={(newValue) => setRol(newValue)}
      />
       <Input2
        texto="Genero"
        type="text"
        value={gender}
        options={[
          { value: "H", label: "Hombre" },
          { value: "M", label: "Mujer" },
        ]}
        onChange={(newValue) => setGender(newValue)}
      />
      </div>

        </div>
      

      <div onClick={handleEntrar}>
        <Button title="Registrar" />
      </div>

      {/* <div onClick={() => navigate('/login')}>
        <p className={Style.text}>
          ¿Ya tienes cuenta? inicia sesión aquí
        </p>
      </div> */}

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
});

export default FormularioRegister;
