import { useValoracionVehiculo } from "../../hooks/useValoracionVehiculo.js";

export const Stars = (props) => {
  const { anyo, kilometros, precio } = props;
  const { recomendacion } = useValoracionVehiculo({
    anyo,
    kilometros,
    precio,
  });
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
