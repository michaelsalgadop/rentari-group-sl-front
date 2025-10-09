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
  const formatoAnyo = (evt) =>
    ["e", "E", "+", "-", ".", ","].includes(evt.key)
      ? evt.preventDefault()
      : evt.target.valueAsNumber;
  const revisarAnyoCompletoValido = (evt) => {
    let anyo = evt.target.value; // "" "1" "10" "100" "1000"
    const anyoActual = new Date().getFullYear();
    // Si el año es 0...
    if (anyo.length === 0 || anyo.charAt(0) === "0") return 0;
    // Si el año es mayor de 4 cifras o mayor que el anyo actual...
    if (anyo.length > 4 || parseInt(anyo) > anyoActual) return anyoActual;
    // Rellenamos el año por si no han metido "1" "10" "100" por ejemplo
    let anyoValido = parseInt(anyo.padEnd(4, "0"));
    if (anyoValido > anyoActual) anyoValido = anyoActual;
    // Devolvemos un año de tipo integer válido
    return anyoValido;
  };

  return {
    formatearAFechaLocal,
    formatearNumeroAImporte,
    formatearNumeroATotalImporte,
    formatoAnyo,
    revisarAnyoCompletoValido,
  };
};
