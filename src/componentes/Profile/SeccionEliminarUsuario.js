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
