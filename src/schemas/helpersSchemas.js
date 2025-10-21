import PropTypes from "prop-types";
const schemaBtnBack = {
  /**
   * Ruta a la que navegar al hacer clic en el botón de retroceso.
   * Ejemplo: "/search" o "/home"
   */
  urlTo: PropTypes.string.isRequired,
};
const schemaBtnScrollIntoView = {
  showArrowToElementToView: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  goToView: PropTypes.func.isRequired,
};
const schemaCTA = {
  titulo: PropTypes.string.isRequired,
  textoBtn: PropTypes.string.isRequired,
};
export { schemaBtnBack, schemaBtnScrollIntoView, schemaCTA };
