import { useState } from "react";
import { Filter } from "./Filter";
import { IconFilter } from "./IconFilter";
import { FaSearch } from "react-icons/fa";

export const Searcher = (props) => {
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [buscadorVehiculos, setBuscadorVehiculos] = useState({
    buscadorVehiculos: "",
  });
  const [datosFiltro, setDatosFiltro] = useState({
    marca: "",
    modelo: "",
    precio: "",
    kilometros: "",
    orden: "",
  });
  return (
    <>
      <div className="contenedor-buscador-vehiculos d-flex">
        <div className="contenedor-lupa">
          <form noValidate className="d-flex">
            <input
              type="text"
              name="buscadorVehiculos"
              id="buscadorVehiculos"
              className="buscador form-control"
              placeholder="Escribe que estás buscando"
            />
            <button type="submit" className="btn btn-primary">
              <FaSearch></FaSearch>
            </button>
          </form>
        </div>

        <IconFilter setMostrarFiltro={setMostrarFiltro}></IconFilter>
      </div>
      <Filter
        mostrarFiltro={mostrarFiltro}
        setMostrarFiltro={setMostrarFiltro}
      ></Filter>
    </>
  );
};
