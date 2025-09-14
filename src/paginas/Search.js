import { Filter } from "../componentes/Search/Filter";

export const Search = () => {
  return (
    <div className="cuerpo-pagina">
      <div className="espaciado-bloques row">
        <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <Filter></Filter>
        </div>
      </div>
    </div>
  );
};
