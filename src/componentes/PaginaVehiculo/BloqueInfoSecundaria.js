export const BloqueInfoSecundaria = (props) => {
  const { combustible, anyo, kilometros, cv, tipoVehiculo } = props;
  return (
    <div className="bloque-vehiculo">
      <ul className="listado-propiedades-vehiculo row">
        <li className="propiedad-vehiculo col-12 col-md-6">
          <div className="row">
            <div className="texto-propiedades-vehiculo col-12 col-md-6">
              Combustible:
            </div>
            <div className="valor-propiedades-vehiculo col-12 col-md-6 bolder">
              {combustible}
            </div>
          </div>
        </li>
        <li className="propiedad-vehiculo col-12 col-md-6">
          <div className="row">
            <div className="texto-propiedades-vehiculo col-12 col-md-6">
              Año:
            </div>
            <div className="valor-propiedades-vehiculo col-12 col-md-6 bolder">
              {anyo}
            </div>
          </div>
        </li>
        <li className="propiedad-vehiculo col-12 col-md-6">
          <div className="row">
            <div className="texto-propiedades-vehiculo col-12 col-md-6">
              Kilometros:
            </div>
            <div className="valor-propiedades-vehiculo col-12 col-md-6 bolder">
              {kilometros} km
            </div>
          </div>
        </li>
        <li className="propiedad-vehiculo col-12 col-md-6">
          <div className="row">
            <div className="texto-propiedades-vehiculo col-12 col-md-6">
              Poténcia:
            </div>
            <div className="valor-propiedades-vehiculo col-12 col-md-6 bolder">
              {cv} cv
            </div>
          </div>
        </li>
        <li className="propiedad-vehiculo col-12 col-md-6">
          <div className="row">
            <div className="texto-propiedades-vehiculo col-12 col-md-6">
              Tipo de vehículo:
            </div>
            <div className="valor-propiedades-vehiculo col-12 col-md-6 bolder">
              {tipoVehiculo}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
