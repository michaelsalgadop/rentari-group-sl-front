import { useContext } from "react";
import { useAlert } from "../../hooks/useAlert";
import { AuthContext } from "../../contextos/Auth/AuthContext";
import { FaPhone } from "react-icons/fa6";
import { schemaBtnRenting } from "../../schemas/vehiclesSchemas";

export const BtnRenting = (props) => {
  const {
    crearRenting,
    crearRentingTemporal,
    cambiarMesesRenting,
    rentingRef,
  } = props;
  const { alertConfirm } = useAlert();
  const { logueado } = useContext(AuthContext);
  const confirmarRenting = (e) => {
    e.preventDefault();
    alertConfirm(
      "Deseas realizar un renting sobre este vehículo?",
      logueado ? crearRenting : crearRentingTemporal,
      "",
      "Realizar",
    );
  };
  const cambiarMeses = (e) => {
    cambiarMesesRenting(e.target.value);
  };
  return (
    <>
      <div ref={rentingRef}></div>
      <div className="contenido-vehiculo mb-3">
        <div className="row mb-3 align-items-center">
          <div className="col-12 col-md-4 mb-2">
            <label htmlFor="plazo">Plazo renting: </label>
            <select
              className="form-control"
              id="plazo"
              defaultValue={48}
              onChange={cambiarMeses}
            >
              <option value={24}>24 meses</option>
              <option value={36}>36 meses</option>
              <option value={48}>48 meses</option>
              <option value={60}>60 meses</option>
            </select>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="text-center">
              <label className="label-fantasma">&nbsp;</label>
              <button
                type="button"
                className="btn-control-renting btn btn-primary"
                onClick={confirmarRenting}
              >
                Alquilar vehículo
              </button>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="text-center">
              <label className="label-fantasma">&nbsp;</label>
              <a
                type="button"
                className="btn-control-renting btn btn-primary"
                href="tel:+34635382150"
              >
                <FaPhone className="mr-2"></FaPhone>Contactar
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
BtnRenting.propTypes = schemaBtnRenting;
