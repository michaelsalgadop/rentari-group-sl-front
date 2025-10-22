import { schemaDatoPresupuesto } from "../../schemas/profileSchemas";

export const DatoPresupuesto = (props) => {
  const { dato, texto, icono } = props;
  return (
    <li className="dato-usuario col-12 col-md-6">
      <div className="contenedor-icono-presupuesto">{icono}</div>
      <span className="dato-numero">{dato}</span>
      <span className="dato-texto">{texto}</span>
    </li>
  );
};
DatoPresupuesto.propTypes = schemaDatoPresupuesto;
