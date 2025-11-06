import { useCallback, useMemo } from "react";
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
  /**
   * Devuelve un item de dentro del token, por ejemplo el rol del usuario o el nombre del usuario.
   */
  const getItemJWT = useCallback(
    (item) => (cargaUtil ? cargaUtil.infoToken[item] : null),
    [cargaUtil],
  );

  return { getItemJWT };
};
