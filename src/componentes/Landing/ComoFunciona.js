import { FaCheckCircle, FaSearch, FaUserLock } from "react-icons/fa";
import { FaArrowDownWideShort, FaArrowPointer } from "react-icons/fa6";

export const ComoFunciona = () => {
  return (
    <section className="seccion-howtouse row">
      <div className="col-12">
        <div className="row">
          <h2 className="col-12 text-center">¿Cómo funciona?</h2>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="subtitulo-howtouse">
              Te lo explicamos en{" "}
              <span className="numero-howtouse bolder">5</span> sencillos pasos:
            </p>
          </div>
        </div>
        <div className="row justify-content-center text-center">
          <div className="columna-howtouse col-6 col-md-4 mb-3">
            <FaSearch className="icono"></FaSearch>
            <span className="numero-howtouse bolder">1.</span> Busca tu renting
            ideal con nuestra lupa.
          </div>
          <div className="columna-howtouse col-6 col-md-4 mb-3">
            <FaArrowDownWideShort className="icono"></FaArrowDownWideShort>
            <span className="numero-howtouse bolder">2.</span> Usa los filtros
            para encontrar el vehículo perfecto al mejor precio.
          </div>
          <div className="columna-howtouse col-6 col-md-4 mb-3">
            <FaArrowPointer className="icono"></FaArrowPointer>
            <span className="numero-howtouse bolder">3.</span> Explora todas las
            opciones del vehículo y haz clic en
            <span className="bolder"> "Alquilar vehículo"</span>.
          </div>
          <div className="columna-howtouse col-6 col-md-4 mb-3">
            <FaUserLock className="icono"></FaUserLock>
            <span className="numero-howtouse bolder">4.</span> Inicia sesión o
            regístrate completando tus datos.
          </div>
          <div className="columna-howtouse col-6 col-md-4 mb-3">
            <FaCheckCircle className="icono"></FaCheckCircle>
            <span className="numero-howtouse bolder">5.</span> ¡Listo! Habrás
            contratado el renting de tu vehículo ideal.
          </div>
        </div>
      </div>
    </section>
  );
};
