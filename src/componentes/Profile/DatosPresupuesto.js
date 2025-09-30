import { FaArrowTrendUp, FaRegCalendar, FaSackDollar } from "react-icons/fa6";
import { DatoPresupuesto } from "./DatoPresupuesto";
import { FaCar } from "react-icons/fa";
import { useFormat } from "../../hooks/useFormat";

export const DatosPresupuesto = (props) => {
  const { datosUsuario } = props;
  const { formatearNumeroATotalImporte } = useFormat();
  return (
    <div className="contenedor-perfil">
      <ul className="row">
        <DatoPresupuesto
          dato={datosUsuario.presupuesto.total_rentings}
          texto="Total rentings"
          icono={<FaCar className="icono-presupuesto"></FaCar>}
        ></DatoPresupuesto>
        <DatoPresupuesto
          dato={formatearNumeroATotalImporte(
            datosUsuario.presupuesto.gasto_mensual,
          )}
          texto="Gasto mensual"
          icono={
            <FaArrowTrendUp className="icono-presupuesto"></FaArrowTrendUp>
          }
        ></DatoPresupuesto>
        <DatoPresupuesto
          dato={formatearNumeroATotalImporte(
            datosUsuario.presupuesto.gasto_total,
          )}
          texto="Gasto total aproximado"
          icono={<FaSackDollar className="icono-presupuesto"></FaSackDollar>}
        ></DatoPresupuesto>
        <DatoPresupuesto
          dato={datosUsuario.presupuesto.fecha_ultimo_renting}
          texto="Fecha último renting"
          icono={<FaRegCalendar className="icono-presupuesto"></FaRegCalendar>}
        ></DatoPresupuesto>
      </ul>
    </div>
  );
};
