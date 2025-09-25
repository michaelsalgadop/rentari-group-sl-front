import { useState } from "react";

export const useValoracionVehiculo = (vehiculo) => {
  const [vehiculoValorar, setVehiculoValorar] = useState(vehiculo);
  const getPuntuacionAnyo = (anyo) => {
    const anyoActual = new Date().getFullYear();
    switch (true) {
      case anyoActual - anyo <= 5:
        return 2;
      case anyoActual - anyo <= 7:
        return 1.5;
      case anyoActual - anyo <= 10:
        return 1.25;
      case anyoActual - anyo <= 12:
        return 1;
      case anyoActual - anyo > 12:
        return 0.5;
      default:
        return 0;
    }
  };
  const getPuntuacionKm = (kilometros) => {
    switch (true) {
      case kilometros <= 15000:
        return 2;
      case kilometros <= 30000:
        return 1.75;
      case kilometros <= 50000:
        return 1.5;
      case kilometros <= 80000:
        return 1.25;
      case kilometros <= 100000:
        return 1;
      case kilometros > 100000:
        return 0.5;
      default:
        return 0;
    }
  };
  const getPuntuacionPrecio = (precio) => {
    switch (true) {
      case precio >= 0 && precio <= 400:
        return 1;
      case precio > 400 && precio <= 600:
        return 0.8;
      case precio > 600 && precio <= 800:
        return 0.6;
      case precio > 800 && precio <= 1000:
        return 0.4;
      case precio > 1000:
        return 0.2;
      default:
        return 0;
    }
  };
  const getRecomendacion = () => {
    const { anyo, kilometros, precio } = vehiculoValorar;
    const puntuacionAnyo = getPuntuacionAnyo(anyo);
    const puntuacionKm = getPuntuacionKm(kilometros);
    const puntuacionPrecio = getPuntuacionPrecio(precio);
    return puntuacionAnyo + puntuacionKm + puntuacionPrecio;
  };
  const [recomendacion, setRecomendacion] = useState(getRecomendacion());

  return { recomendacion };
};
