import { NavLink } from "react-router-dom";
import { Stars } from "./Stars";
import { schemaVehicle } from "../../schemas/searchSchemas.js";

export const Vehicle = (props) => {
  const { vehiculo } = props;
  const {
    urlImagen,
    _id,
    nombre,
    precio,
    combustible,
    anyo,
    kilometros,
    cv,
    tipoVehiculo,
  } = vehiculo;
  return (
    <NavLink to={`/search/vehicle/${_id}`} className="card-vehiculo">
      <div className="row">
        <div className="col-12 col-lg-4">
          <img
            src={urlImagen}
            alt={`Imagen de ${nombre}`}
            className="imagen-vehiculo img-fluid"
          />
        </div>
        <div className="col-12 col-lg-8">
          <div className="contenido-vehiculo">
            <h2 className="titulo-vehiculo link-coche">{nombre}</h2>
            <p className="precio-vehiculo">
              {precio} €/<span className="mes-precio-vehiculo">mes</span>
            </p>
            <Stars anyo={anyo} kilometros={kilometros} precio={precio}></Stars>
            <ul className="listado-propiedades-vehiculo">
              <li className="combustible">{combustible}</li>
              <li className="anyo">{anyo}</li>
              <li className="kilometros">{kilometros} km</li>
              <li className="cv">{cv} cv</li>
              <li className="tipoVehiculo">{tipoVehiculo}</li>
            </ul>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
Vehicle.propTypes = schemaVehicle;
