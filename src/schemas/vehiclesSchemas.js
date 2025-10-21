import PropTypes from "prop-types";
const schemaBloqueImagen = {
  urlImagen: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
};
const schemaBloqueInfoPrimaria = {
  nombre: PropTypes.string.isRequired,
  precio: PropTypes.string,
  anyo: PropTypes.number.isRequired,
  kilometros: PropTypes.number.isRequired,
};
const schemaBloqueInfoSecundaria = {
  combustible: PropTypes.string.isRequired,
  anyo: PropTypes.number.isRequired,
  kilometros: PropTypes.number.isRequired,
  cv: PropTypes.number.isRequired,
  tipoVehiculo: PropTypes.string.isRequired,
};
const schemaBloqueNumerosRenting = {
  precio: PropTypes.string.isRequired,
  meses: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
const schemaBtnRenting = {
  crearRenting: PropTypes.func.isRequired,
  crearRentingTemporal: PropTypes.func.isRequired,
  cambiarMesesRenting: PropTypes.func.isRequired,
  rentingRef: PropTypes.func.isRequired,
};
export {
  schemaBloqueImagen,
  schemaBloqueInfoPrimaria,
  schemaBloqueInfoSecundaria,
  schemaBloqueNumerosRenting,
  schemaBtnRenting,
};
