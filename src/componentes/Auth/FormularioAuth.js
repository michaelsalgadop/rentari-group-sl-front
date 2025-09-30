import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, AUTH_MODES } from "../../contextos/Auth/AuthContext";
import { useAlert } from "../../hooks/useAlert";

export const FormularioAuth = (props) => {
  const { enviarCredenciales, enviarValidacionMail, setData, datosFormulario } =
    props;

  const { authMode, cambiarEntreLoginYRegistro } = useContext(AuthContext);

  const { alertError, alertErrorHTML } = useAlert();

  const comprobarCamposRellenos = (datosFormulario) => {
    const { nombreUsuario, correo, contrasenya } = datosFormulario;
    const camposBase = [correo, contrasenya]; // campos que están si o si
    const campos =
      authMode === AUTH_MODES.REGISTER
        ? [...camposBase, nombreUsuario]
        : camposBase; // añadimos nombreUsuario si estamos en modo registro
    // miramos que todos los campos esten completos y que no hayan espacios vacios por medio
    // some() vs every() => some es si alguno cumple, en every todos deben cumplir
    return campos.every((campo) => campo.trim() !== "");
  };
  const nombreUsuarioValido = (nombreUsuario) =>
    /^[a-zA-Z0-9_-]{3,20}$/.test(nombreUsuario);

  const correoValido = (correo) =>
    /^[a-zA-Z0-9._%+-]+@(outlook|gmail|yahoo|hotmail){1}\.[a-zA-Z]{2,}$/.test(
      correo,
    );

  const contrasenyaValida = (contrasenya) =>
    /^[A-Za-z\d@$!¡%*&]{8,}$/.test(contrasenya);

  const comprobarDatosFormulario = (datosFormulario) => {
    const { nombreUsuario, correo, contrasenya } = datosFormulario;
    const resultado = { okFormulario: true, mensajesFormulario: [] };
    if (!comprobarCamposRellenos(datosFormulario)) {
      resultado.okFormulario = false;
      resultado.mensajesFormulario.push("Hay campos vacios en el formulario!");
      return resultado;
    }
    if (
      authMode === AUTH_MODES.REGISTER &&
      !nombreUsuarioValido(nombreUsuario)
    ) {
      resultado.okFormulario = false;
      resultado.mensajesFormulario.push(
        "Nombre de usuario no es válido! Introduce un nombre de usuario de más de 2 carácteres y sin carácteres especiales!",
      );
    }
    if (!correoValido(correo)) {
      if (resultado.okFormulario) resultado.okFormulario = false;
      resultado.mensajesFormulario.push(
        "Introduce un correo válido de los dominios de gmail, outlook, hotmail o yahoo!",
      );
    }
    if (!contrasenyaValida(contrasenya)) {
      if (resultado.okFormulario) resultado.okFormulario = false;
      resultado.mensajesFormulario.push(
        "La contraseña debe de contener almenos 8 carácteres, entre ellos 1 minúscula, 1 mayúscula y 1 carácter especial(@$!¡%*&)",
      );
    }

    return resultado;
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    try {
      const { okFormulario, mensajesFormulario } =
        comprobarDatosFormulario(datosFormulario);
      if (!okFormulario) {
        const listaErrores = `<ul class=${mensajesFormulario.length > 1 ? "text-left" : "text-center"}>${mensajesFormulario
          .map((mensaje) => `<li class="mb-2">${mensaje}</li>`)
          .join("")}</ul>`;
        return alertErrorHTML(listaErrores);
      }

      if (authMode === AUTH_MODES.REGISTER) {
        enviarValidacionMail();
      } else {
        enviarCredenciales();
      }
    } catch (error) {
      alertError(error.message);
    }
  };

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="contenedor-login">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <h1>
                {authMode === AUTH_MODES.REGISTER
                  ? "Regístrate"
                  : "Bienvenido de nuevo"}
              </h1>
              <small>
                Porfavor, introduce tus credenciales para&nbsp;
                {authMode === AUTH_MODES.REGISTER
                  ? "registrarte."
                  : "iniciar sesión."}
              </small>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <form noValidate onSubmit={enviarFormulario}>
                {authMode === AUTH_MODES.REGISTER && (
                  <div className="form-group">
                    <label htmlFor="nombreUsuario">Nombre de usuario</label>
                    <input
                      type="text"
                      name="nombreUsuario"
                      id="nombreUsuario"
                      className="form-control"
                      value={datosFormulario.nombreUsuario}
                      onChange={setData}
                      autoComplete="username"
                    />
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="correo">Correo electrónico</label>
                  <input
                    type="text"
                    name="correo"
                    id="correo"
                    className="form-control"
                    value={datosFormulario.correo}
                    onChange={setData}
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contrasenya">Contraseña</label>
                  <input
                    type="password"
                    name="contrasenya"
                    id="contrasenya"
                    className="form-control"
                    value={datosFormulario.contrasenya}
                    onChange={setData}
                    autoComplete={
                      authMode === AUTH_MODES.REGISTER
                        ? "new-password"
                        : "current-password"
                    }
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                  >
                    {authMode === AUTH_MODES.REGISTER
                      ? "Regístrate"
                      : "Iniciar sesión"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="text-center">
            {authMode === AUTH_MODES.LOGIN ? (
              <>
                No tienes cuenta?&nbsp;
                <NavLink
                  to="/register"
                  className="bolder color-primary"
                  onClick={() => cambiarEntreLoginYRegistro()}
                >
                  Regístrate
                </NavLink>
              </>
            ) : (
              <>
                Tienes una cuenta?&nbsp;
                <NavLink
                  to="/login"
                  className="bolder color-primary"
                  onClick={() => cambiarEntreLoginYRegistro()}
                >
                  Inicia sesión
                </NavLink>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
