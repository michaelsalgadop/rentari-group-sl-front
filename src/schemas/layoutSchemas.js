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
const schemaCabeceraNavbarMobile = {
  isMobile: PropTypes.bool.isRequired,
  accionNavLink: PropTypes.func.isRequired,
};
const schemaNavbarLinks = {
  isMobile: PropTypes.bool,
  mostrarOcultarBarraMobile: PropTypes.func,
};
const schemaAuthLinks = {
  accionNavLink: PropTypes.func.isRequired,
  classNameLink: PropTypes.func,
  mostrarOcultarDesplegable: PropTypes.func.isRequired,
  mostrarPropiedadesPerfil: PropTypes.bool.isRequired,
};
export {
  schemaLogo,
  schemaBtnHamburguesa,
  schemaNavbarMobile,
  schemaCabeceraNavbarMobile,
  schemaNavbarLinks,
  schemaAuthLinks,
};
