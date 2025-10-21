import { schemaBloqueImagen } from "../../schemas/vehiclesSchemas";

export const BloqueImagen = (props) => {
  const { urlImagen, nombre } = props;
  const urlSupabase = process.env.REACT_APP_URL_SUPABASE;

  return (
    <div className="row mb-3">
      <div className="col-12">
        <img
          src={urlSupabase + urlImagen}
          alt={`Imagen del vehiculo: ${nombre}`}
          className="imagen-vehiculo img-fluid"
        />
      </div>
    </div>
  );
};
BloqueImagen.propTypes = schemaBloqueImagen;
