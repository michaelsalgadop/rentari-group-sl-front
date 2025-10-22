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
export { schemaFilter };
