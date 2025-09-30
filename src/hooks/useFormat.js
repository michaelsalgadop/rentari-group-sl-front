import { useCallback } from "react";

export const useFormat = () => {
  const formatearAFechaLocal = useCallback(
    (fecha) => new Date(fecha).toLocaleDateString(),
    [],
  );
  const formatearNumeroAImporte = useCallback(
    (numero) => numero.toFixed(2) + " €",
    [],
  );
  const formatearNumeroATotalImporte = (numero) => {
    try {
      const numeroParseado = parseFloat(numero);
      if (isNaN(numeroParseado)) return null;
      return new Intl.NumberFormat("es-ES", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numeroParseado);
    } catch (error) {
      return null;
    }
  };

  return {
    formatearAFechaLocal,
    formatearNumeroAImporte,
    formatearNumeroATotalImporte,
  };
};
