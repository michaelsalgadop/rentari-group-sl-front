import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export const useJWT = () => {
  const token = localStorage.getItem("token");

  const cargaUtil = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (err) {
      console.error("Token inválido", err);
      return null;
    }
  }, [token]);

  const getItemJWT = (item) => (cargaUtil ? cargaUtil.infoToken[item] : null);

  return { getItemJWT };
};
