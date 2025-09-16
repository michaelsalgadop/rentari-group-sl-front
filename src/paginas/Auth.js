import { useContext, useEffect, useState } from "react";
import { AuthContext, AUTH_MODES } from "../contextos/Auth/AuthContext";
import { useFormulario } from "../hooks/useFormulario";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { FormularioAuth } from "../componentes/Auth/FormularioAuth";
import { Validacion } from "../componentes/Auth/Validacion";

export const Auth = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();

  const [objetoFormulario, setObjectoFormulario] = useState({
    correo: "",
    nombreUsuario: "",
    contrasenya: "",
  });
  const [mostrarValidacion, setMostrarValidacion] = useState(false);
  const [codigo, setCodigo] = useState(null);

  const { authMode, loguearUsuario } = useContext(AuthContext);

  const { setData, datosFormulario } = useFormulario(objetoFormulario);
  const { alertSuccess, alertError } = useAlert();

  const enviarValidacionMail = async () => {
    try {
      const resp = await fetch(`${urlAPI}usuarios/validacion`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      });
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
      } else {
        setMostrarValidacion(true);
        const { codigoVerificacion } = await resp.json();
        setCodigo(codigoVerificacion.codigo);
      }
    } catch (error) {
      alertError(error.message);
    }
  };

  const enviarCredenciales = async () => {
    try {
      const ruta =
        authMode === AUTH_MODES.REGISTER
          ? "usuarios/register"
          : "usuarios/login";
      const metodo = authMode === AUTH_MODES.REGISTER ? "POST" : "PUT";
      const resp = await fetch(`${urlAPI}${ruta}`, {
        method: metodo,
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      });
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
      } else {
        const { token, message } = await resp.json();
        loguearUsuario();
        localStorage.setItem("token", token);
        if (resp.status === 201) {
          alertSuccess(message);
        }
        navigate("/");
      }
    } catch (error) {
      alertError(
        error.message.indexOf("etch") >= 0
          ? "Error al intentar establecer conexión con el servidor."
          : "No se ha podido registrar o loguear el usuario, consulte con el area técnica.",
      );
      console.error(error.message);
    }
  };

  return !mostrarValidacion || authMode === AUTH_MODES.LOGIN ? (
    <FormularioAuth
      enviarCredenciales={enviarCredenciales}
      enviarValidacionMail={enviarValidacionMail}
      setData={setData}
      datosFormulario={datosFormulario}
    ></FormularioAuth>
  ) : (
    <Validacion
      enviarCredenciales={enviarCredenciales}
      codigo={codigo}
      correo={datosFormulario?.correo}
      setMostrarValidacion={setMostrarValidacion}
    ></Validacion>
  );
};
