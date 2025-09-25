import { useContext } from "react";
import { FaSliders } from "react-icons/fa6";
import { DarkScreenContext } from "../../contextos/DarkScreen/DarkScreenContext";

export const IconFilter = (props) => {
  const { setMostrarFiltro } = props;
  const { setShowDarkScreen } = useContext(DarkScreenContext);

  const mostrarFormularioFiltro = (e) => {
    e.preventDefault();
    setMostrarFiltro(true);
    setShowDarkScreen(true);
  };
  return (
    <button
      type="button"
      className={`btn btn-icono-filtro`}
      title="Filtrar"
      onClick={mostrarFormularioFiltro}
    >
      <FaSliders></FaSliders>
    </button>
  );
};
