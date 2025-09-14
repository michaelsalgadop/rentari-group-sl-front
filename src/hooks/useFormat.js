export const useFormat = () => {
  const formatearAFechaLocal = (fecha) => new Date(fecha).toLocaleDateString();
  const formatearNumeroAImporte = (numero) => numero.toFixed(2) + " €";
  return { formatearAFechaLocal, formatearNumeroAImporte };
};
