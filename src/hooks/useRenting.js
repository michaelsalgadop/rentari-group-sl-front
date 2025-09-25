import { useCallback, useMemo, useState } from "react";

export const useRenting = () => {
  const coeficientes = useMemo(
    () => ({
      24: 1.5, // cuota base
      36: 1.25, // 15% más barato al mes
      48: 1.0, // 25% más barato
      60: 0.7, // 30% más barato
    }),
    [],
  );
  const [meses, setMeses] = useState(48);
  const [precioCuotaBase, setPrecioCuotaBase] = useState(0);
  const cuota = useMemo(
    () => (precioCuotaBase * coeficientes[meses]).toFixed(2),
    [coeficientes, precioCuotaBase, meses],
  );
  const total = useMemo(() => cuota * meses, [cuota, meses]);
  const cambiarMesesRenting = (numeroMeses) => {
    setMeses(parseInt(numeroMeses));
  };
  const setCuotaBase = useCallback((cuotaBase) => {
    setPrecioCuotaBase(cuotaBase);
  }, []);

  return { cambiarMesesRenting, meses, cuota, total, setCuotaBase };
};
