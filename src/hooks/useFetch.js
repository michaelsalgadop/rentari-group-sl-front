import { useContext } from "react";
import { DarkScreenContext } from "../contextos/DarkScreen/DarkScreenContext";
import { useNavigate } from "react-router-dom";

export const useFetch = () => {
  const { setLoading } = useContext(DarkScreenContext);
  const navigate = useNavigate();
  const getResponse = async (url, configuration) => {
    try {
      setLoading(true);
      const resp = await fetch(url, configuration);
      setLoading(false);
      return resp;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch cancelado");
        return;
      }
      navigate("/");
      setLoading(false);
      throw new Error(
        error.message.indexOf("etch") >= 0
          ? "Error al intentar establecer conexión con el servidor."
          : "No se ha podido registrar o loguear el usuario, consulte con el area técnica.",
      );
    }
  };
  return { getResponse };
};
