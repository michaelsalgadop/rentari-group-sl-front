import { useCallback } from "react";
import Swal from "sweetalert2";

export const useAlert = () => {
  const colorPrincipal = "#2f59d3";
  /**
   * Alerta de sweetalert para avisar que la acción ha salido bien. Se oculta automáticamente.
   * @param {String} msg Título del alert.
   * @return Alerta del sweetalert
   */
  const alertSuccess = useCallback(
    (msg) =>
      Swal.fire({
        icon: "success",
        title: msg,
        showConfirmButton: false,
        timer: 1500,
      }),
    [],
  );
  /**
   * Alert de sweetalert que nos muestra que la acción ha ido correctamente, y acto seguido al clicar el botón se realizará
   * la callback pasada por parámetro(en caso de que se haya pasado).
   * @param {String} msgTitle Título del alert.
   * @param {String} msgBody Cuerpo del alert. Si no viene se asigna a vacio ''.
   * @param {Function} callback Función que se ejecutará después de ocultar el alert. Puede ser nulo.
   * @return Alerta del sweetalert
   */
  const alertSuccessFunction = useCallback(
    (msgTitle, msgBody = "", callback = null) =>
      Swal.fire({
        icon: "success",
        title: msgTitle,
        text: msgBody,
      }).then((result) => {
        if (result.isConfirmed && callback) callback();
      }),
    [],
  );
  /**
   * Alerta de sweetalert para avisar que la acción NO ha salido bien.
   * @param {String} msg Cuerpo del alert.
   * @return Alerta del sweetalert
   */
  const alertError = useCallback(
    (msg) =>
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: msg,
      }),
    [],
  );
  /**
   * Alerta de sweetalert para avisar que la acción NO ha salido bien. Muestra el texto en formato HTML.
   * @param {String} msg Cuerpo del alert, en formato HTML.
   * @return Alerta del sweetalert
   */
  const alertErrorHTML = (msg) =>
    Swal.fire({
      icon: "error",
      title: "ERROR",
      html: msg,
    });
  /**
   * Alerta de sweetalert para dar información.
   * @param {String} msg Titulo del alert.
   * @return Alerta del sweetalert
   */
  const alertInfo = (msg) =>
    Swal.fire({
      icon: "info",
      title: msg,
    });
  /**
   * Alerta de sweetalert para confirmar una acción y en caso de que se confirme, pasar a la acción de success de confirmación.
   * @param {String} textoTitulo Titulo del alert.
   * @param {Function} funcionConfirmar Función que se ejecuta después de confirmar.
   * @param {*} textoCuerpo Cuerpo del alert. Puede venir sin definir.
   * @param {*} textoBotonConfirmar Texto del botón de confirmar. Puede venir sin definir.
   * @return Alerta del sweetalert
   */
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
  /**
   * Alerta de sweetalert de success, llamado por el sweetalert de confirmación.
   * @param {Function} funcion Función que se ejecuta después de confirmar en el sweetalert de confirmación.
   * @return Alerta del sweetalert
   */
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
