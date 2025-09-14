import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, AUTH_MODES } from "../contextos/Auth/AuthContext";
import { useFormulario } from "../hooks/useFormulario";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";

export const Auth = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();
  const [objetoFormulario, setObjectoFormulario] = useState({
    correo: "",
    nombreUsuario: "",
    contrasenya: "",
  });

  const { authMode, cambiarEntreLoginYRegistro, loguearUsuario } =
    useContext(AuthContext);

  const { setData, datosFormulario } = useFormulario(objetoFormulario);
  const { alertSuccess, alertError } = useAlert();

  const enviarCredenciales = async () => {
    try {
      const ruta =
        authMode === AUTH_MODES.REGISTER
          ? "usuarios/register"
          : "usuarios/login";
      const metodo = authMode === AUTH_MODES.REGISTER ? "POST" : "PUT";
      const resp = await fetch(`${urlAPI}${ruta}`, {
        method: metodo,
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(datosFormulario),
      });
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
      } else {
        const { token, message } = await resp.json();
        loguearUsuario();
        localStorage.setItem("token", token);
        if (resp.status === 201) {
          alertSuccess(message);
        }
        navigate("/");
      }
    } catch (error) {
      alertError(
        error.message.indexOf("etch") >= 0
          ? "Error al intentar establecer conexión con el servidor."
          : "No se ha podido registrar o loguear el usuario, consulte con el area técnica.",
      );
      console.error(error.message);
    }
  };

  const comprobarCredenciales = () => {
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

  return (
    <>
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
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (comprobarCredenciales()) {
                      enviarCredenciales();
                    } else {
                      alertError("Faltan credenciales!");
                    }
                  }}
                >
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
    </>
  );
};
