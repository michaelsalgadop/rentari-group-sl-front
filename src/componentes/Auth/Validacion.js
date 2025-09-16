import { useState } from "react";
import { useFormulario } from "../../hooks/useFormulario";
import { useAlert } from "../../hooks/useAlert";

export const Validacion = (props) => {
  const { enviarCredenciales, codigo, correo, setMostrarValidacion } = props;
  const [codigoVerificacion, setCodigoVerificacion] = useState({
    numero_0: "",
    numero_1: "",
    numero_2: "",
    numero_3: "",
  });
  const { alertError } = useAlert();
  const { datosFormulario, setData, resetFormulario } =
    useFormulario(codigoVerificacion);
  const enviarCodigo = (e) => {
    e.preventDefault();
    const arrayCodigo = codigo.toString().split("");
    const arrayUsuario = [
      datosFormulario.numero_0,
      datosFormulario.numero_1,
      datosFormulario.numero_2,
      datosFormulario.numero_3,
    ];
    const codigoCorrecto =
      arrayCodigo.filter((valor, i) => valor === arrayUsuario[i]).length === 4;
    if (codigoCorrecto) {
      enviarCredenciales();
    } else {
      alertError(
        "Código incorrecto! Asegúrese de que introduce el código correcto.",
      );
      resetFormulario();
    }
  };
  return (
    <div className="cuerpo-pagina text-center">
      <div className="espaciado-bloques row">
        <div className="col-12">
          <h1>Código enviado!</h1>
          <p>
            En breves, recibirás un correo con un código, el cual tendrás que
            introducir en los recuadros de a continuación. El correo que nos has
            indicado es&nbsp;
            {correo}
          </p>
          <form onSubmit={enviarCodigo} className="mt-4">
            <div className="d-flex justify-content-center">
              {["numero_0", "numero_1", "numero_2", "numero_3"].map(
                (campo, i) => (
                  <input
                    key={i}
                    type="text"
                    id={campo}
                    name={campo}
                    maxLength="1"
                    value={datosFormulario[campo] || ""}
                    onChange={setData}
                    className="form-control mx-2 text-center"
                    style={{ width: "50px", fontSize: "1.5rem" }}
                  />
                ),
              )}
            </div>
            <button
              type="button"
              className="btn btn-secondary mt-3 mr-2"
              onClick={() => setMostrarValidacion(false)}
            >
              Volver
            </button>
            <button type="submit" className="btn btn-primary mt-3">
              Verificar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
