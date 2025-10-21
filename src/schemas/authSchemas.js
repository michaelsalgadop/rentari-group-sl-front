import PropTypes from "prop-types";
const schemaFormularioAuth = {
  enviarCredenciales: PropTypes.func.isRequired,
  enviarValidacionMail: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  datosFormulario: PropTypes.shape({
    correo: PropTypes.string.isRequired,
    nombreUsuario: PropTypes.string,
    contrasenya: PropTypes.string.isRequired,
  }).isRequired,
};
const schemaValidacion = {
  enviarCredenciales: PropTypes.func.isRequired,
  codigo: PropTypes.number,
  correo: PropTypes.string.isRequired,
  setMostrarValidacion: PropTypes.func.isRequired,
};
export { schemaFormularioAuth, schemaValidacion };
