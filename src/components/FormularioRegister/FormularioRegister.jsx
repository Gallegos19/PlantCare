import { useState, forwardRef, useImperativeHandle } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Style from "./FormularioRegister.module.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import Input2 from "../Input/Input2";
import { createUser } from "../../utils/RequestPlant/requestPlant";

const FormularioRegister = forwardRef((props, ref) => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

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
      email.trim() !== "" &&
      contrasena.trim() !== "" &&
      nombre.trim() !== "" &&
      apellido.trim() !== "" &&
      rol.trim() !== ""
    ) {
        const userData = {
            name: nombre,
            last_name: apellido,
            email: email,
            password: contrasena,
            rol: rol,
          };
        const peticion = await createUser(userData)
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
        type="email"
        value={email}
        onChange={(newValue) => setEmail(newValue)}
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
