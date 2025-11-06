import { useCallback } from "react";

export const useFormat = () => {
  /**
   * Recibimos una fecha y la mostramos en formato local
   * @param {String} fecha fecha a formatear
   * @returns {String} Fecha en formato local.
   */
  const formatearAFechaLocal = useCallback(
    (fecha) => new Date(fecha).toLocaleDateString(),
    [],
  );
  /**
   * Recibimos una numero y lo formateamos para que sea un importe.
   * @param {Number} numero numero a formatear
   * @returns {String} Numero formateado
   */
  const formatearNumeroAImporte = useCallback(
    (numero) => numero.toFixed(2) + " €",
    [],
  );
  /**
   * Recibimos una numero, el cual puede ser grande, y lo formateamos en formato local para ver el importe total.
   * @param {Number} numero numero a formatear
   * @returns {String} Numero formateado con decimales
   */
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
  /**
   * Validar si el formato del año es correcto.
   * @param {Event} evt evento del campo del número
   * @returns {*} Si no es correcto, el campo se queda tal cual sin el número válido o si es valido devuelve el Number del año
   */
  const formatoAnyo = (evt) =>
    ["e", "E", "+", "-", ".", ","].includes(evt.key)
      ? evt.preventDefault()
      : evt.target.valueAsNumber;
  /**
   * Validar si el año introducido es correcto y cumple con los parámetros establecidos.
   * @param {Event} evt evento del campo del número
   * @returns {Number} Devuelve un valor, el cual puede ser 0 en caso de año incorrecto, el año actual o el año
   * introducido si es correcto.
   */
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
