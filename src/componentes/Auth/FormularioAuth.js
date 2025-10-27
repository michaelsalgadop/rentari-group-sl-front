import { schemaFormularioAuth } from "../../schemas/authSchemas";

export const FormularioAuth = (props) => {
  const { loginWithPopup } = props;
  const loguearUsuario = async (e) => {
    e.preventDefault();
    // inicia popup/login con Auth0
    await loginWithPopup({
      authorizationParams: { scope: "openid profile email" },
    });
  };
  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="contenedor-login">
          <div className="row">
            <div className="col-12 text-center mb-4">
              <h1>Regístrate o inicia sesión con Google!</h1>
              <small>Porfavor, introduce tus credenciales:</small>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={loguearUsuario}
              >
                Iniciar sesión con Google (Auth0)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
FormularioAuth.propTypes = schemaFormularioAuth;
