import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contextos/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { FormularioAuth } from "../componentes/Auth/FormularioAuth";
import { useFetch } from "../hooks/useFetch";
import { useJWT } from "../hooks/useJWT";
import { useAuth0 } from "@auth0/auth0-react";
export const Auth = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();

  const [rentingsPendientes, setRentingsPendientes] = useState(false);

  const { loguearUsuario, token } = useContext(AuthContext);

  const { alertSuccess, alertSuccessFunction, alertError } = useAlert();
  const { getResponse } = useFetch();
  const { getItemJWT } = useJWT();
  const { loginWithPopup, user, isAuthenticated, isLoading } = useAuth0();
  const enviarCredenciales = useCallback(async () => {
    try {
      if (!user) throw new Error("No se ha logueado el usuario correctamente!");
      const { email: correo, nickname: nombreUsuario } = user;
      const resp = await getResponse(`${urlAPI}usuarios/oauth/auth0`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ correo, nombreUsuario }),
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
  }, [alertError, alertSuccess, getResponse, loguearUsuario, urlAPI, user]);

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
  useEffect(() => {
    if (isLoading) return;
    (async () => {
      if (isAuthenticated) {
        await enviarCredenciales();
      }
    })();
  }, [enviarCredenciales, isAuthenticated, isLoading]);

  return <FormularioAuth loginWithPopup={loginWithPopup}></FormularioAuth>;
};
