import { useState } from "react";
import { useFormat } from "./useFormat";

export const useFormulario = (objFormulario) => {
  const [datosFormularioDefecto, setDatosFormularioDefecto] =
    useState(objFormulario);
  const [datosFormulario, setDatosFormulario] = useState(objFormulario);
  const { revisarAnyoCompletoValido } = useFormat();
  const setData = (element) => {
    const elementoTargeteado = element.target;
    setDatosFormulario({
      ...datosFormulario,
      [elementoTargeteado.id]:
        elementoTargeteado.type === "checkbox"
          ? elementoTargeteado.checked
          : elementoTargeteado.value,
    });
  };

  const resetFormulario = () => {
    setDatosFormulario(datosFormularioDefecto);
  };
  const validarTexto = (texto) =>
    !/('(?!\w)|`|\/\*|\*\/|´|"|;|=|<|>|--|\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b|%|\(|\)|\*|\$|\.(?!\w)|\{|\}|\||\[|\]|\n|:)/i.test(
      texto,
    );
  const validarDatosFormularioExceptoVacios = () =>
    Object.values(datosFormulario).every((value) => {
      if (value === "") return true;
      if (typeof value === "number") return !isNaN(value) && value >= 0;
      if (typeof value === "string") return validarTexto(value);
      return true;
    });
  const validarAnyo = (evt) => {
    const anyoValido = revisarAnyoCompletoValido(evt);
    evt.target.value = anyoValido;
    setData(evt);
  };
  return {
    datosFormulario,
    setData,
    resetFormulario,
    validarDatosFormularioExceptoVacios,
    validarAnyo,
  };
};
