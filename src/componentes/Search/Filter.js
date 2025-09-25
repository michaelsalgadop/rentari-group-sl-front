import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { DarkScreenContext } from "../../contextos/DarkScreen/DarkScreenContext";

export const Filter = (props) => {
  const { mostrarFiltro, setMostrarFiltro } = props;
  const { setShowDarkScreen } = useContext(DarkScreenContext);

  const cerrarFormulario = () => {
    setMostrarFiltro(false);
    setShowDarkScreen(false);
  };
  return (
    <div className={`contenedor-filtro ${mostrarFiltro ? "show" : ""}`}>
      <div className="row">
        <div className="col-12 text-right">
          <FaTimes className="pointer" onClick={cerrarFormulario}></FaTimes>
        </div>
      </div>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-group">
          <label htmlFor="marca">Marca:</label>
          <select className="form-control" id="marca">
            <option value="opel">Opel</option>
            <option value="bmw">BMW</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="modelo">Modelo:</label>
          <select className="form-control" id="modelo">
            <option value="-1">-</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <select className="form-control" id="precio">
            <option value="-1">Hasta</option>
            <option value="200">200 €</option>
            <option value="400">400 €</option>
            <option value="600">600 €</option>
            <option value="800">800 €</option>
            <option value="1000">1000 €</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="kilometros">Kilometros:</label>
          <select className="form-control" id="kilometros">
            <option value="0">0</option>
            <option value="30000">30000</option>
            <option value="50000">50000</option>
            <option value="80000">80000</option>
            <option value="100000">100000</option>
            <option value="100000">140000</option>
            <option value="160000">160000</option>
            <option value="180000">180000</option>
            <option value="200000">200000</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="orden">Ordenar por:</label>
          <select className="form-control" id="orden">
            <option value="-1">-</option>
            <option value="nuevosRentings">Nuevos rentings</option>
            <option value="menosKm">Menos km</option>
            <option value="masKm">Más km</option>
            <option value="rentingsBajos">Rentings más bajos</option>
            <option value="rentingsAltos">Rentings más altos</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary form-control">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};
