import { useCallback, useEffect, useState } from "react";
import { Vehicles } from "../componentes/Search/Vehicles";
import { Searcher } from "../componentes/Search/Searcher";
import { useAlert } from "../hooks/useAlert";
import { useFetch } from "../hooks/useFetch";

export const Search = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const [vehiculos, setVehiculos] = useState([]);
  const [cargandoVehiculos, setCargandoVehiculos] = useState(true);
  const { alertError } = useAlert();
  const { getResponse } = useFetch();
  /**
   * Se encarga de obtener todos los vehiculos disponibles de nuestra BBDD
   */
  const getVehiculos = useCallback(async () => {
    try {
      setCargandoVehiculos(true);
      const resp = await getResponse(`${urlAPI}search/vehiculos`);
      if (!resp.ok) {
        const { message } = await resp.json();
        setCargandoVehiculos(false);
        alertError(message);
      } else {
        const { listadoVehiculos } = await resp.json();
        setVehiculos(listadoVehiculos);
        setCargandoVehiculos(false);
      }
    } catch (error) {
      setCargandoVehiculos(false);
      alertError(error.message);
    }
  }, [alertError, getResponse, urlAPI]);
  /**
   * Filtro de busqueda que se encargará de buscar el/los vehiculo/s que encuentre en base de lo que le hayamos
   * especificado en el filtro(en caso de que exista en la BBDD).
   * @param {*} datosFiltro datos que hemos especificado en nuestro filtro.
   */
  const filtrarBusqueda = async (datosFiltro) => {
    try {
      setCargandoVehiculos(true);
      const queryParams = new URLSearchParams(datosFiltro).toString();
      const resp = await getResponse(
        `${urlAPI}search/vehiculos/filter?${queryParams}`,
      );
      if (!resp.ok) {
        const { message } = await resp.json();
        setCargandoVehiculos(false);
        alertError(message);
      } else {
        const { listadoVehiculos } = await resp.json();
        setVehiculos(listadoVehiculos);
        setCargandoVehiculos(false);
      }
    } catch (error) {
      setCargandoVehiculos(false);
      alertError(error.message);
    }
  };
  /**
   * Llama a nuestra función nada más cargar el componente para mostrar los vehículos.
   */
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
      <Vehicles vehiculos={vehiculos} cargando={cargandoVehiculos}></Vehicles>
    </div>
  );
};
