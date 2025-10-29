import PropTypes from "prop-types";
const schemaFilter = {
  mostrarFiltro: PropTypes.bool.isRequired,
  datosFormulario: PropTypes.shape({
    buscadorVehiculos: PropTypes.string.isRequired,
    precio: PropTypes.string.isRequired,
    kilometros: PropTypes.string.isRequired,
    anyo: PropTypes.number.isRequired,
    orden: PropTypes.string.isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
  buscarVehiculos: PropTypes.func.isRequired,
  checkearFiltroCerrado: PropTypes.func.isRequired,
  resetFormulario: PropTypes.func.isRequired,
  validarAnyo: PropTypes.func.isRequired,
};
const schemaIconFilter = {
  setMostrarFiltro: PropTypes.func.isRequired,
};
const schemaSearcher = {
  filtrarBusqueda: PropTypes.func.isRequired,
};
const schemaStars = {
  anyo: PropTypes.number.isRequired,
  kilometros: PropTypes.number.isRequired,
  precio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
const schemaVehicle = {
  urlImagen: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  combustible: PropTypes.string.isRequired,
  anyo: PropTypes.number.isRequired,
  kilometros: PropTypes.number.isRequired,
  cv: PropTypes.number.isRequired,
  tipoVehiculo: PropTypes.string.isRequired,
};
/**
 * Esto permitiría [] sin romper la validación.
 *
 * Asegura que cada vehículo tenga todos los campos definidos de schemaVehicle.
 */
const schemaVehicles = {
  vehiculos: PropTypes.arrayOf(PropTypes.shape(schemaVehicle)),
  cargando: PropTypes.bool.isRequired,
};
export {
  schemaFilter,
  schemaIconFilter,
  schemaSearcher,
  schemaStars,
  schemaVehicle,
  schemaVehicles,
};
