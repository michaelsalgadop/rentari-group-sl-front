import { FaCircleInfo } from "react-icons/fa6";
import { Stars } from "../Search/Stars.js";
import { schemaBloqueInfoPrimaria } from "../../schemas/vehiclesSchemas.js";

export const BloqueInfoPrimaria = (props) => {
  const { nombre, precio, anyo, kilometros } = props;
  return (
    <div className="row">
      <div className="col-12">
        <div className="contenido-vehiculo">
          <h1 className="titulo-pagina-vehiculo link-coche">{nombre}</h1>
          <div className="d-flex flex-wrap">
            <div className="bloque-precio">
              <p className="precio-vehiculo mb-1">
                {precio} €/
                <span className="mes-precio-vehiculo">mes</span>
              </p>
              <span className="iva-incluido">IVA incluido</span>
            </div>
            <div className="bloque-garantia">
              <p className="texto-con-garantia mb-1">Con Garantía</p>
              <p className="garantia-anyo">1 año</p>
            </div>
            <div className="bloque-recomendacion">
              <p className="texto-recomendacion d-flex align-items-center mb-1">
                Recomendación
                <FaCircleInfo
                  className="ml-1"
                  title="Años del vehículo + Precio + Kilometros"
                ></FaCircleInfo>
              </p>
              <Stars
                anyo={anyo}
                kilometros={kilometros}
                precio={precio}
              ></Stars>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
BloqueInfoPrimaria.propTypes = schemaBloqueInfoPrimaria;
