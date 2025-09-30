import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DatosUsuario } from "../componentes/Profile/DatosUsuario";
import { DatosPresupuesto } from "../componentes/Profile/DatosPresupuesto";
import { useAlert } from "../hooks/useAlert";
import { useFormat } from "../hooks/useFormat";
import { useFetch } from "../hooks/useFetch";
import { useJWT } from "../hooks/useJWT";
import { AuthContext } from "../contextos/Auth/AuthContext";
import { Loading } from "../componentes/Loading";
import { DatosVehiculos } from "../componentes/Profile/DatosVehiculos";
import { SeccionEliminarUsuario } from "../componentes/Profile/SeccionEliminarUsuario";

export const Profile = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();
  const { alertError } = useAlert();
  const { formatearAFechaLocal, formatearNumeroAImporte } = useFormat();
  const { getResponse } = useFetch();
  const { getItemJWT } = useJWT();
  const { desloguearUsuario } = useContext(AuthContext);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [role, setRole] = useState("user");
  const cargarDatosUsuario = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        desloguearUsuario();
        navigate("/login");
      }
      const resp = await getResponse(`${urlAPI}usuarios/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
        navigate("/");
      } else {
        const { perfilUsuario } = await resp.json();
        const fechaUltimoRenting =
          perfilUsuario.presupuesto.total_rentings > 0
            ? formatearAFechaLocal(
                perfilUsuario.presupuesto.fecha_ultimo_renting,
              )
            : "Ninguna";
        perfilUsuario.presupuesto.fecha_ultimo_renting = fechaUltimoRenting;
        perfilUsuario.presupuesto.gasto_mensual = formatearNumeroAImporte(
          perfilUsuario.presupuesto.gasto_mensual,
        );
        perfilUsuario.presupuesto.gasto_total = formatearNumeroAImporte(
          perfilUsuario.presupuesto.gasto_total,
        );
        setDatosUsuario(perfilUsuario);
      }
    } catch (error) {
      alertError(error.message);
    }
  }, [
    alertError,
    desloguearUsuario,
    formatearAFechaLocal,
    formatearNumeroAImporte,
    getResponse,
    navigate,
    urlAPI,
  ]);
  useEffect(() => {
    try {
      if (datosUsuario) return;
      (async () => {
        await cargarDatosUsuario();
        const roleUsuario = getItemJWT("role");
        if (roleUsuario !== role) setRole(roleUsuario);
      })();
      // cleanup: cancelar la petición si el componente se desmonta
    } catch (error) {
      alertError(
        `Error al intentar cargar datos del usuario: ${error.message}`,
      );
    }
  }, [alertError, cargarDatosUsuario, datosUsuario, getItemJWT, role]);
  return datosUsuario ? (
    <div className="cuerpo-pagina">
      <div className="espaciado-bloques row">
        <div className="col-12 col-md-4 offset-md-4">
          <DatosUsuario datosUsuario={datosUsuario}></DatosUsuario>
        </div>
      </div>
      {datosUsuario.presupuesto.total_rentings > 0 && (
        <div className="espaciado-bloques row">
          <div className="col-12 text-center">
            <DatosVehiculos datosUsuario={datosUsuario}></DatosVehiculos>
          </div>
        </div>
      )}
      <div className="espaciado-bloques row">
        <div className="col-12 col-md-8 offset-md-2">
          <DatosPresupuesto datosUsuario={datosUsuario}></DatosPresupuesto>
        </div>
      </div>
      {role !== "admin" && (
        <div className="espaciado-bloques row">
          <div className="col-12">
            <SeccionEliminarUsuario></SeccionEliminarUsuario>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loading></Loading>
  );
};
