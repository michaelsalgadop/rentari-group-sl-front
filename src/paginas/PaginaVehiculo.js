import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { useFetch } from "../hooks/useFetch";
import { Loading } from "../componentes/Loading";
import { BloqueImagen } from "../componentes/PaginaVehiculo/BloqueImagen.js";
import { BloqueInfoPrimaria } from "../componentes/PaginaVehiculo/BloqueInfoPrimaria.js";
import { BtnRenting } from "../componentes/PaginaVehiculo/BtnRenting.js";
import { BloqueNumerosRenting } from "../componentes/PaginaVehiculo/BloqueNumerosRenting.js";
import { BloqueInfoSecundaria } from "../componentes/PaginaVehiculo/BloqueInfoSecundaria.js";
import { useRenting } from "../hooks/useRenting.js";
import { BtnBack } from "../componentes/Helpers/BtnBack.js";
import { BtnScrollIntoView } from "../componentes/Helpers/BtnScrollIntoView.js";
import { useObserver } from "../hooks/useObserver.js";

export const PaginaVehiculo = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const { idVehiculo } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  const { alertError } = useAlert();
  const { getResponse } = useFetch();
  const { cambiarMesesRenting, meses, cuota, total, setCuotaBase } =
    useRenting();
  const { ref: elementRef, showArrowToElementToView, goToView } = useObserver();

  const crearRentingTemporal = () => {
    console.log("temporal");
  };
  const crearRenting = () => {
    console.log("normal");
  };

  const cargarVehiculo = useCallback(async () => {
    try {
      const resp = await getResponse(`${urlAPI}search/vehiculo/${idVehiculo}`);
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
      } else {
        const { vehiculoEncontrado } = await resp.json();
        setVehiculo(vehiculoEncontrado);
      }
    } catch (error) {
      alertError(error.message);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    (async () => {
      await cargarVehiculo();
    })();
  }, [cargarVehiculo]);
  useEffect(() => {
    if (vehiculo) setCuotaBase(vehiculo.precio);
  }, [vehiculo, setCuotaBase]);
  return (
    <>
      {vehiculo ? (
        <div className="row mt-3">
          <div className="col-12">
            <BtnBack urlTo="/search"></BtnBack>
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="bloque-vehiculo">
                  <BloqueImagen
                    urlImagen={vehiculo.urlImagen}
                    nombre={vehiculo.nombre}
                  ></BloqueImagen>
                  <BloqueInfoPrimaria
                    nombre={vehiculo.nombre}
                    precio={cuota}
                    anyo={vehiculo.anyo}
                    kilometros={vehiculo.kilometros}
                  ></BloqueInfoPrimaria>
                  <BtnRenting
                    crearRentingTemporal={crearRentingTemporal}
                    crearRenting={crearRenting}
                    cambiarMesesRenting={cambiarMesesRenting}
                    rentingRef={elementRef}
                  ></BtnRenting>
                </div>
              </div>
              <div className="col-12 col-lg-4 mb-3">
                <BloqueNumerosRenting
                  precio={cuota}
                  meses={meses}
                  total={total}
                ></BloqueNumerosRenting>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12 col-lg-8">
                <BloqueInfoSecundaria
                  combustible={vehiculo.combustible}
                  anyo={vehiculo.anyo}
                  kilometros={vehiculo.kilometros}
                  cv={vehiculo.cv}
                  tipoVehiculo={vehiculo.tipoVehiculo}
                ></BloqueInfoSecundaria>
              </div>
            </div>
            <BtnScrollIntoView
              title="Ir a alquilar vehículo"
              showArrowToElementToView={showArrowToElementToView}
              goToView={goToView}
            ></BtnScrollIntoView>
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};
