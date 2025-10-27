import { schemaDatosUsuario } from "../../schemas/profileSchemas";

export const DatosUsuario = (props) => {
  const { datosUsuario } = props;
  const urlSupabase = process.env.REACT_APP_URL_SUPABASE;
  return (
    <article className="contenedor-perfil">
      <div className="row">
        <div className="col-12 text-center">
          <img
            src={`${urlSupabase}user-3296.svg`}
            width="256px"
            height="256px"
            alt="Foto de usuario predeterminada"
            className="img-fluid"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 profile-name-user text-center">
          <span title={datosUsuario.nombreUsuario}>
            {datosUsuario.nombreUsuario.slice(0, 8) + "..."}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 profile-mail text-center">
          {datosUsuario.correo}
        </div>
      </div>
    </article>
  );
};
DatosUsuario.propTypes = schemaDatosUsuario;
