import { Vehicle } from "./Vehicle";
import { Loading } from "../Loading";
import { schemaVehicles } from "../../schemas/searchSchemas";
export const Vehicles = (props) => {
  const { vehiculos } = props;
  const urlSupabase = process.env.REACT_APP_URL_SUPABASE;
  return (
    <>
      {vehiculos.length > 0 ? (
        <div className="row">
          {vehiculos.map((vehiculo) => {
            const urlDefinitiva = urlSupabase + vehiculo.urlImagen;
            const vehiculoConUrl = { ...vehiculo, urlImagen: urlDefinitiva };
            return (
              <div
                key={vehiculo._id}
                className="col-vehiculo col-12 col-sm-6 col-lg-10 offset-lg-1 mb-3"
              >
                <Vehicle vehiculo={vehiculoConUrl}></Vehicle>
              </div>
            );
          })}
        </div>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};
Vehicles.propTypes = schemaVehicles;
