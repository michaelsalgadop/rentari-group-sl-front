export const useFormat = () => {
  const formatearAFechaLocal = (fecha) => new Date(fecha).toLocaleDateString();
  const formatearNumeroAImporte = (numero) => numero.toFixed(2) + " €";
  const formatearNumeroATotalImporte = (numero) =>
    new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numero);
  return {
    formatearAFechaLocal,
    formatearNumeroAImporte,
    formatearNumeroATotalImporte,
  };
};
