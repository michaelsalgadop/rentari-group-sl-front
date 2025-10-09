import { useCallback, useContext } from "react";
import { DarkScreenContext } from "../contextos/DarkScreen/DarkScreenContext";
import { useNavigate } from "react-router-dom";

export const useFetch = () => {
  const { setLoading } = useContext(DarkScreenContext);
  const navigate = useNavigate();
  const getResponse = useCallback(
    async (url, configuration) => {
      try {
        if (!configuration) {
          configuration = { credentials: "include" };
        } else {
          configuration.credentials = "include"; // sin esto no manda cookies
        }
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
            : "No ha sido posible establecer conexión con el servidor, consulte con el area técnica.",
        );
      }
    },
    [navigate, setLoading],
  );
  /**
   * Esto es útil porque FormData permite enviar datos que
   * pueden incluir archivos binarios (por ejemplo imágenes o PDFs) junto con texto.
   * Por cada propiedad (dato), añade su valor (datos[dato])
   * al objeto FormData que se le pasa como parámetro.
   * Ejemplo:
   * Si datos = { nombre: "Juan", edad: 30 },
   * entonces el FormData contendrá:
   *   nombre → "Juan"
   *   edad → "30"
   * @param {*} datosFormData instancia de la interfaz FormData
   * @param {*} datosFormulario objeto con los datos del formulario
   * @returns {FormData} FormData con los datos del formulario, ya sean strings, archivos, etc.
   */
  const appendearDatosFormData = async (datosFormData, datosFormulario) => {
    for (const dato in datosFormulario) {
      datosFormData.append(dato, datosFormulario[dato]);
    }
    return datosFormData;
  };
  return { getResponse, appendearDatosFormData };
};
