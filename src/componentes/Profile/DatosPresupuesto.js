import { FaArrowTrendUp, FaRegCalendar, FaSackDollar } from "react-icons/fa6";
import { DatoPresupuesto } from "./DatoPresupuesto";
import { FaCar } from "react-icons/fa";

export const DatosPresupuesto = (props) => {
  const { datosUsuario } = props;

  return (
    <div className="contenedor-perfil">
      <ul className="row">
        <DatoPresupuesto
          dato={datosUsuario.presupuesto.total_rentings}
          texto="Total rentings"
          icono={<FaCar className="icono-presupuesto"></FaCar>}
        ></DatoPresupuesto>
        <DatoPresupuesto
          dato={datosUsuario.presupuesto.gasto_mensual}
          texto="Gasto mensual"
          icono={
            <FaArrowTrendUp className="icono-presupuesto"></FaArrowTrendUp>
          }
        ></DatoPresupuesto>
        <DatoPresupuesto
          dato={datosUsuario.presupuesto.gasto_total}
          texto="Gasto total acumulado"
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
