import PropTypes from "prop-types";

const schemaLogo = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
const schemaBtnHamburguesa = {
  showBar: PropTypes.bool.isRequired,
  mostrarOcultarBarraMobile: PropTypes.func.isRequired,
};
const schemaNavbarMobile = {
  showBar: PropTypes.bool.isRequired,
  mostrarOcultarBarraMobile: PropTypes.func.isRequired,
};
export { schemaLogo, schemaBtnHamburguesa, schemaNavbarMobile };
