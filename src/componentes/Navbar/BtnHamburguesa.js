import { schemaBtnHamburguesa } from "../../schemas/layoutSchemas";

export const BtnHamburguesa = (props) => {
  const { showBar, mostrarOcultarBarraMobile } = props;
  return (
    <div className="contenedor-btn-hamburguesa col-5 text-right">
      <button
        className="btn-hamburguer btn p-0"
        onClick={mostrarOcultarBarraMobile}
        aria-label="Abrir menú"
        aria-expanded={showBar}
      >
        <span className="nav-line-btn" />
        <span className="nav-line-btn" />
        <span className="nav-line-btn" />
      </button>
    </div>
  );
};
BtnHamburguesa.propTypes = schemaBtnHamburguesa;
