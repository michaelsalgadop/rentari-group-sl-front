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
  /**
   * Función para enviar nuestras credenciales, introducidas por el usuario a nuestro servidor backend.
   * Si la response es correcta, recibiremos un token de usuario, acto seguido se logueará nuestro usuario
   * y se guardará el token en nuestro localstorage. Nos saldrá una alerta muy bonita de usuario logueado o registrado correctamente.
   * Token tendrá nuetra id de usuario, nombre de usuario y rol del usuario(user o admin).
   */
  const enviarCredenciales = useCallback(async () => {
    try {
      if (!user) throw new Error("No se ha logueado el usuario correctamente!");
      // user contiene el email y nombre de usuario que necesitamos en nuestro servidor para registrar el usuario en nuestra BBDD.
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

  /**
   * Se utiliza cuando un usuario todavía no se ha logueado o registrado, pero ha alquilado un vehiculo.
   * Ese vehiculo estará pendiente de alquilar, hasta que dicho usuario se logue o registre. Si no lo hace,
   * ese vehiculo se "liberará".
   */
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
  /**
   * Cuando un usuario se ha logueado o registrado, y dicho usuario antes de loguearse o registrarse(osea sin cuenta)
   * se ha querido alquilar un vehiculo(el cual estaba pendiente), pues se confirma la operación y se alquila el vehiculo
   * para dicho usuario.
   */
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
  /**
   * Comprueba que hayan vehiculos pendientes.
   */
  useEffect(() => {
    (async () => {
      await comprobarVehiculosPendientes();
    })();
  }, [comprobarVehiculosPendientes]);
  /**
   * Estará controlando que si en algún momento el token cambia(pasa de undefined o null a tener valor),
   * pues hará la operación de confirmar el renting el cual estaba pendiente.
   */
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
  /**
   * Como estamos utilizando el contexto de Auth0, Auth0 nos envia unos parámetros, los cuales podemos recoger.
   * En este caso este useEffect tendrá la tarea de ver que, si un usuario se loguea por Auth0(que de momento es nuestro
   * modo de loguearse o registrarse), estará pendiente primero de que isLoading cambie, porque quiere decir
   * que nuestro usuario no se ha logueado o registrado, y luego si isLoading cambia y isAuthenticated es true
   * (osea se ha logueado/registrado), llamamos a nuestro enviarCredenciales para enviar los datos del usuario a
   * nuestro servidor.
   */
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
