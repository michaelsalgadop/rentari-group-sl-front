import { useValoracionVehiculo } from "../../hooks/useValoracionVehiculo.js";
import { schemaStars } from "../../schemas/searchSchemas.js";

export const Stars = (props) => {
  const { anyo, kilometros, precio } = props;
  const { recomendacion } = useValoracionVehiculo({
    anyo,
    kilometros,
    precio,
  });
  /**
   * Mostrará la valoración en forma de estrellas con el calculo entre años del vehículo - kilometros que tiene - precio de renting
   */
  return (
    <div className="stars">
      {[0, 1, 2, 3, 4].map((value, i) => {
        return (
          <span
            key={i}
            className={`star ${(i === 0 && recomendacion === i) || recomendacion <= i ? "" : recomendacion > i && recomendacion < i + 1 ? "half" : "full"}`}
          ></span>
        );
      })}
    </div>
  );
};
Stars.propTypes = schemaStars;
