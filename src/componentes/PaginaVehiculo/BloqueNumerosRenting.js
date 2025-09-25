import { useState } from "react";
import { useFormat } from "../../hooks/useFormat";

export const BloqueNumerosRenting = (props) => {
  const { precio, meses, total } = props;
  const { formatearNumeroATotalImporte } = useFormat();
  return (
    <div className="bloque-vehiculo contenido-vehiculo">
      <ul>
        <li className="row mb-3">
          <div className="texto-numeros-renting col-12 col-xl-6 mb-1">
            Cuota mensual:
          </div>
          <div className="valor-numeros-renting col-12 col-xl-6 bolder">
            {precio} €/mes
          </div>
        </li>
        <li className="row mb-3">
          <div className="texto-numeros-renting col-12 col-xl-6 mb-1">
            Duración:
          </div>
          <div className="valor-numeros-renting col-12 col-xl-6 bolder">
            {meses} meses
          </div>
        </li>
        <li className="row mb-3">
          <div className="texto-numeros-renting col-12 col-xl-6 mb-1">
            Kilómetros incluidos:
          </div>
          <div className="valor-numeros-renting col-12 col-xl-6 bolder">
            20.000 km/anuales
          </div>
        </li>
        <li className="row mb-3">
          <div className="texto-numeros-renting col-12 col-xl-6 mb-1">
            Coste total estimado:
          </div>
          <div className="valor-numeros-renting col-12 col-xl-6 bolder">
            {formatearNumeroATotalImporte(total)}
            &nbsp;€
          </div>
        </li>
      </ul>
      <p className="texto-incluye bolder mt-3 mb-1">Incluye:</p>
      <ul>
        <li className="renting-incluye">
          Mantenimiento y revisiones oficiales
        </li>
        <li className="renting-incluye">Seguro a todo riesgo</li>
        <li className="renting-incluye">Impuestos de circulación e ITV</li>
        <li className="renting-incluye">Asistencia en carretera 24/7</li>
      </ul>
    </div>
  );
};
