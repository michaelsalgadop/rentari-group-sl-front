import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
import { useFetch } from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../contextos/Auth/AuthContext";

export const SeccionEliminarUsuario = () => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const navigate = useNavigate();
  const { alertConfirm, alertError, alertSuccessFunction } = useAlert();
  const { getResponse } = useFetch();
  const { desloguearUsuario } = useContext(AuthContext);
  /**
   * Se utiliza en caso de que queramos eliminar nuestra cuenta de usuario.
   * Si tiene rentings activos no lo podrá eliminar y mostrará dicho mensaje.
   * Si tiene rentings ya vencidos(todos sus rentings, sean 1 o varios), se desactivará su cuenta
   * y se "anonimizará" pero quedará grabado su presupuesto.
   * Si es un usuario sin ningún renting ni activo ni vencido, simplemente se borrará.
   * @returns en caso de que el token está caducado o no exista en este momento, se desloguea el usuario
   * y no continua la acción.
   */
  const eliminarUsuario = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        desloguearUsuario();
        return;
      }
      const resp = await getResponse(`${urlAPI}usuarios/eliminar`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!resp.ok) {
        const { message } = await resp.json();
        alertError(message);
      } else {
        const { respuesta } = await resp.json();
        alertSuccessFunction(respuesta, "", () => {
          desloguearUsuario();
          navigate("/");
        });
      }
    } catch (error) {
      alertError(error.message);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 text-center text-danger">
          <FaExclamationTriangle className="icono-atencion"></FaExclamationTriangle>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <span className="titulo-atencion-eliminar-usuario text-center text-danger">
            Eliminar Usuario
          </span>
          <span className="texto-atencion-eliminar-usuario text-center">
            Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor,
            asegúrate.
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <button
            className="btn btn-outline-danger"
            onClick={() =>
              alertConfirm(
                "Eliminar usuario?",
                eliminarUsuario,
                "Si decide continuar, todos sus datos junto a su usuario quedarán eliminados.",
                "Eliminar",
              )
            }
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    </>
  );
};
