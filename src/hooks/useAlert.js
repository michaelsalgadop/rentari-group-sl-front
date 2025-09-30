import { useCallback } from "react";
import Swal from "sweetalert2";

export const useAlert = () => {
  const colorPrincipal = "#2f59d3";
  const alertSuccess = (msg) =>
    Swal.fire({
      icon: "success",
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  const alertSuccessFunction = useCallback((msgTitle, msgBody = "", callback = null) =>
    Swal.fire({
      icon: "success",
      title: msgTitle,
      text: msgBody,
    }).then((result) => {
      if (result.isConfirmed && callback) callback();
    }),[]);
  const alertError = useCallback(
    (msg) =>
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: msg,
      }),
    [],
  );
  const alertErrorHTML = (msg) =>
    Swal.fire({
      icon: "error",
      title: "ERROR",
      html: msg,
    });
  const alertInfo = (msg) =>
    Swal.fire({
      icon: "info",
      title: msg,
    });
  const alertConfirm = (
    textoTitulo,
    funcionConfirmar,
    textoCuerpo = null,
    textoBotonConfirmar = null,
  ) =>
    Swal.fire({
      title: textoTitulo,
      text: textoCuerpo ? textoCuerpo : "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: colorPrincipal,
      cancelButtonColor: "rgba(131, 131, 131, 1)",
      confirmButtonText: textoBotonConfirmar
        ? textoBotonConfirmar
        : "Continuar",
    }).then((result) => {
      if (result.isConfirmed) alertConfirmSuccess(funcionConfirmar);
    });
  const alertConfirmSuccess = (funcion) =>
    Swal.fire({
      title: "A continuación, se realizará la acción deseada!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    }).then(funcion());
  return {
    alertSuccess,
    alertSuccessFunction,
    alertError,
    alertInfo,
    alertConfirm,
    alertErrorHTML,
  };
};
