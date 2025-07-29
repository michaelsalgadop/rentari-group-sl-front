import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { iconos } from "../../utilidades/iconos";

export const Ventajas = () => {
  const [mostrarVentaja, setMostrarVentaja] = useState(false);
  const listadoVentajasDesventajas = [
    { icon: "dudas", message: "Dudas al comparar ofertas", ventaja: false },
    { icon: "papeleo", message: "Mucho papeleo", ventaja: false },
    {
      icon: "precios-cambian",
      message: "Precios que cambian, según variables",
      ventaja: false,
    },
    { icon: "no-incluye", message: "No sabes qué incluye", ventaja: false },
    {
      icon: "perdida-tiempo",
      message: "Pierdes horas buscando",
      ventaja: false,
    },
    {
      icon: "comparador",
      message: "Comparador claro e intuitivo",
      ventaja: true,
    },
    { icon: "facil", message: "Contratación fácil y online", ventaja: true },
    { icon: "fijo", message: "Precio fijo, sin sorpresas", ventaja: true },
    {
      icon: "transparente",
      message: "Transparencia en cada oferta",
      ventaja: true,
    },
    {
      icon: "ahorro-tiempo",
      message: "Ahorra tiempo, filtra en segundos",
      ventaja: true,
    },
  ];

  return (
    <section className="seccion-ventajas row">
      <div className="col-12">
        <div className="row">
          <h2 className="col-12 text-center">¿Por qué Rentari?</h2>
        </div>
        <div className="fila-slider row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <span
              className={`${mostrarVentaja ? "invisible" : ""} color-danger bolder mr-2`}
            >
              Sin Rentari
            </span>
            <label className="switch" htmlFor="checkbox-ventajas">
              <input
                type="checkbox"
                id="checkbox-ventajas"
                onChange={() => setMostrarVentaja(!mostrarVentaja)}
              />
              <div className="slider round"></div>
            </label>
            <span
              className={`${!mostrarVentaja ? "invisible" : ""} color-success bolder ml-2`}
            >
              Con Rentari
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <small className="pulsa-slider">
              Pulsa el slider y observa la magia!
            </small>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ul className="row justify-content-center">
              {listadoVentajasDesventajas
                .filter(({ ventaja }) => ventaja === mostrarVentaja)
                .map(({ icon, message, ventaja }, i) => {
                  const Icono = iconos[icon] || FaTimes;
                  return (
                    <li key={i} className="col-6 col-md-4 col-lg-2">
                      <div
                        className={`contenedor-ventaja-desventaja ${ventaja ? "color-success" : "color-danger"}`}
                      >
                        <Icono
                          className={`icono ${ventaja ? "color-success" : "color-danger"}`}
                        ></Icono>
                        {message}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
