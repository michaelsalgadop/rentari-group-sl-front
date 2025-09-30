import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext, AUTH_MODES } from "../contextos/Auth/AuthContext";
import { useFormulario } from "../hooks/useFormulario";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { FormularioAuth } from "../componentes/Auth/FormularioAuth";
import { Validacion } from "../componentes/Auth/Validacion";
import { useFetch } from "../hooks/useFetch";
import { useJWT } from "../hooks/useJWT";

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
  const [rentingsPendientes, setRentingsPendientes] = useState(false);

  const { authMode, loguearUsuario, token } = useContext(AuthContext);

  const { setData, datosFormulario } = useFormulario(objetoFormulario);
  const { alertSuccess, alertSuccessFunction, alertError } = useAlert();
  const { getResponse } = useFetch();
  const { getItemJWT } = useJWT();
  const enviarValidacionMail = async () => {
    try {
      const resp = await getResponse(`${urlAPI}usuarios/validacion`, {
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
      const resp = await getResponse(`${urlAPI}${ruta}`, {
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

  const comprobarVehiculosPendientes = useCallback(async () => {
    try {
      const resp = await getResponse(`${urlAPI}rentings/checkPendings`);
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
      } else {
        const { rentingsPendientes, message } = await resp.json();
        if (rentingsPendientes) {
          setRentingsPendientes(true);
          alertSuccessFunction(message);
        }
      }
    } catch (error) {
      alertError(error.message);
    }
  }, [alertError, alertSuccessFunction, getResponse, urlAPI]);
  const confirmarRenting = useCallback(
    async (idUsuario) => {
      try {
        const resp = await getResponse(`${urlAPI}rentings/confirm`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({ idUsuario }),
        });
        if (!resp.ok) {
          const { message } = await resp.json();
          alertError(message);
        } else {
          const { ok, messageTitle, messageBody } = await resp.json();
          if (ok)
            alertSuccessFunction(messageTitle, messageBody, () =>
              navigate("/"),
            );
        }
      } catch (error) {
        alertError(error.message);
      }
    },
    [alertError, alertSuccessFunction, getResponse, navigate, urlAPI],
  );
  useEffect(() => {
    (async () => {
      await comprobarVehiculosPendientes();
    })();
  }, [comprobarVehiculosPendientes]);

  useEffect(() => {
    if (!token) return;
    (async () => {
      if (rentingsPendientes) {
        const idUsuario = getItemJWT("idUsuario");
        await confirmarRenting(idUsuario);
      } else {
        navigate("/");
      }
    })();
  }, [token, rentingsPendientes, navigate, getItemJWT, confirmarRenting]);

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
