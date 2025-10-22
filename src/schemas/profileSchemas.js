import PropTypes from "prop-types";
/**
 * dato: puede ser string o número.
 *
 * texto: string.
 *
 * icono: es un elemento React, no un simple objeto. Para componentes jsx (<FaCar />)
 */
const schemaDatoPresupuesto = {
  dato: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  texto: PropTypes.string.isRequired,
  icono: PropTypes.element.isRequired,
};
/**
 * datosUsuario es requerido
 *
 * presupuesto, qe se encuentra dentro de datosUsuario es requerido, y
 * total_rentings, gasto_mensual, gasto_total pueden ser numeros o strings, y fecha_ultimo_renting
 * puede ser un string o una instancia de Date(osea fecha tal cual)
 */
const schemaDatosPresupuesto = {
  datosUsuario: PropTypes.shape({
    presupuesto: PropTypes.shape({
      total_rentings: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      gasto_mensual: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      gasto_total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      fecha_ultimo_renting: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]),
    }).isRequired,
  }).isRequired,
};
export { schemaDatoPresupuesto, schemaDatosPresupuesto };
