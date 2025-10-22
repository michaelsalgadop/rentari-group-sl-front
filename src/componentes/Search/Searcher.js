import { useContext, useEffect, useState } from "react";
import { Filter } from "./Filter";
import { IconFilter } from "./IconFilter";
import { FaSearch } from "react-icons/fa";
import { useFormulario } from "../../hooks/useFormulario.js";
import { DarkScreenContext } from "../../contextos/DarkScreen/DarkScreenContext.js";
import { useAlert } from "../../hooks/useAlert.js";
import { schemaSearcher } from "../../schemas/searchSchemas.js";

export const Searcher = (props) => {
  const { filtrarBusqueda } = props;
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const [datosFiltro, setDatosFiltro] = useState({
    /* marca: "",
    modelo: "", */
    buscadorVehiculos: "",
    precio: "",
    kilometros: "",
    anyo: 0,
    orden: "",
  });

  const {
    datosFormulario,
    setData,
    validarDatosFormularioExceptoVacios,
    resetFormulario,
    validarAnyo,
  } = useFormulario(datosFiltro);

  const { showDarkScreen, setShowDarkScreen } = useContext(DarkScreenContext);

  const { alertError } = useAlert();

  const buscarVehiculos = (e) => {
    e.preventDefault();
    checkearFiltroCerrado();
    if (!validarDatosFormularioExceptoVacios()) {
      alertError("Credenciales incorrectas. Introduzca valores válidos!");
      return false;
    }
    filtrarBusqueda(datosFormulario);
  };
  const checkearFiltroCerrado = () => {
    if (mostrarFiltro) setMostrarFiltro(false);
    if (showDarkScreen) setShowDarkScreen(false);
  };
  return (
    <>
      <div className="contenedor-buscador-vehiculos d-flex">
        <div className="contenedor-lupa">
          <form noValidate className="d-flex" onSubmit={buscarVehiculos}>
            <input
              type="text"
              name="buscadorVehiculos"
              id="buscadorVehiculos"
              className="buscador form-control"
              placeholder="Escribe que estás buscando"
              onChange={setData}
              value={datosFormulario.buscadorVehiculos}
            />
            <button type="submit" className={`btn btn-primary`}>
              <FaSearch></FaSearch>
            </button>
          </form>
        </div>

        <IconFilter setMostrarFiltro={setMostrarFiltro}></IconFilter>
      </div>
      <Filter
        mostrarFiltro={mostrarFiltro}
        checkearFiltroCerrado={checkearFiltroCerrado}
        datosFormulario={datosFormulario}
        setData={setData}
        buscarVehiculos={buscarVehiculos}
        resetFormulario={resetFormulario}
        validarAnyo={validarAnyo}
      ></Filter>
    </>
  );
};
Searcher.propTypes = schemaSearcher;
