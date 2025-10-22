import { FaTimes } from "react-icons/fa";
import { useFormat } from "../../hooks/useFormat";
import { schemaFilter } from "../../schemas/searchSchemas";

export const Filter = (props) => {
  const {
    mostrarFiltro,
    datosFormulario,
    setData,
    buscarVehiculos,
    checkearFiltroCerrado,
    resetFormulario,
    validarAnyo,
  } = props;
  const { formatoAnyo } = useFormat();
  return (
    <div className={`contenedor-filtro ${mostrarFiltro ? "show" : ""}`}>
      <div className="row">
        <div className="col-12 text-right">
          <FaTimes
            className="pointer"
            onClick={checkearFiltroCerrado}
          ></FaTimes>
        </div>
      </div>
      <form noValidate onSubmit={buscarVehiculos}>
        {/* <div className="form-group">
          <label htmlFor="marca">Marca:</label>
          <select
            className="form-control"
            id="marca"
            onChange={setData}
            value={datosFormulario.marca}
          >
            <option value="">-</option>
            <option value="opel">Opel</option>
            <option value="bmw">BMW</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="modelo">Modelo:</label>
          <select
            className="form-control"
            id="modelo"
            onChange={setData}
            value={datosFormulario.modelo}
          >
            <option value="">-</option>
          </select>
        </div> */}
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <select
            className="form-control"
            id="precio"
            onChange={setData}
            value={datosFormulario.precio}
          >
            <option value="">Hasta</option>
            <option value="200">200 €</option>
            <option value="400">400 €</option>
            <option value="600">600 €</option>
            <option value="800">800 €</option>
            <option value="1000">1000 €</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="anyo">Año:</label>
          <input
            type="number"
            placeholder="Desde..."
            name="anyo"
            id="anyo"
            className="form-control"
            onChange={setData}
            onBlur={validarAnyo}
            onKeyDown={formatoAnyo}
            value={datosFormulario.anyo}
            min={new Date(0).getFullYear()}
            max={new Date().getFullYear()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="kilometros">Kilometros:</label>
          <select
            className="form-control"
            id="kilometros"
            onChange={setData}
            value={datosFormulario.kilometros}
          >
            <option value="">Desde:</option>
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
          <select
            className="form-control"
            id="orden"
            onChange={setData}
            value={datosFormulario.orden}
          >
            <option value="">-</option>
            <option value="nuevosCoches">Nuevos coches</option>
            <option value="menosKm">Menos km</option>
            <option value="masKm">Más km</option>
            <option value="rentingsBajos">Rentings más bajos</option>
            <option value="rentingsAltos">Rentings más altos</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-default"
            onClick={() => resetFormulario()}
          >
            Resetear valores por defecto
          </button>
        </div>
        <div className="form-group">
          <button type="submit" className={`btn btn-primary form-control`}>
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};
Filter.propTypes = schemaFilter;
