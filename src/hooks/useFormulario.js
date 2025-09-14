import { useState } from "react";

export const useFormulario = (objFormulario) => {
  const [datosFormulario, setDatosFormulario] = useState(objFormulario);

  const setData = (element) => {
    const elementoTargeteado = element.target;
    setDatosFormulario({
      ...datosFormulario,
      [elementoTargeteado.id]:
        elementoTargeteado.type === "number"
          ? elementoTargeteado.valueAsNumber
          : elementoTargeteado.type === "checkbox"
            ? elementoTargeteado.checked
            : elementoTargeteado.value,
    });
  };

  return { datosFormulario, setData };
};
