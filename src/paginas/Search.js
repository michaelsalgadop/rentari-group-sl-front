import { useCallback, useEffect, useState } from "react";
import { Vehicles } from "../componentes/Search/Vehicles";
import { Searcher } from "../componentes/Search/Searcher";
import { useAlert } from "../hooks/useAlert";
import { useFetch } from "../hooks/useFetch";

export const Search = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const [vehiculos, setVehiculos] = useState([]);
  const { alertError } = useAlert();
  const { getResponse } = useFetch();
  const getVehiculos = useCallback(async () => {
    try {
      const resp = await getResponse(`${urlAPI}search/vehiculos`);
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
      } else {
        const { listadoVehiculos } = await resp.json();
        setVehiculos(listadoVehiculos);
      }
    } catch (error) {
      alertError(error.message);
    }
  }, [alertError, getResponse, urlAPI]);
  const filtrarBusqueda = async (datosFiltro) => {
    try {
      const queryParams = new URLSearchParams(datosFiltro).toString();
      const resp = await getResponse(
        `${urlAPI}search/vehiculos/filter?${queryParams}`,
      );
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
      } else {
        const { listadoVehiculos } = await resp.json();
        setVehiculos(listadoVehiculos);
      }
    } catch (error) {
      alertError(error.message);
    }
  };
  useEffect(() => {
    (async () => {
      await getVehiculos();
    })();
  }, [getVehiculos]);
  return (
    <div className="cuerpo-pagina relative">
      <Searcher filtrarBusqueda={filtrarBusqueda}></Searcher>
      <div className="espaciado-busqueda mb-3">
        <h1 className="titulo-search text-center">
          Encuentra el vehículo que más se adapte a tus necesidades:
        </h1>
      </div>
      <Vehicles vehiculos={vehiculos}></Vehicles>
    </div>
  );
};
