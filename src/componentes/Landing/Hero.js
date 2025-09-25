import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="seccion-hero row">
      <img
        src="https://qfjfnkewfpeazdgqkxdw.supabase.co/storage/v1/object/public/imagenes-rentari//coche-hero.png"
        alt="imagen pantalla principal con un coche blanco, que sobresale de la web."
        className="coche-hero img-fluid"
      />
      <div className="contenedor-hero col-6 col-md-12">
        <h1 className="titulo-hero">El renting que se adapta a ti.</h1>
        <p className="frase-hero">
          Compara, elige y conduce. Sin complicaciones.
        </p>
        <button
          className="cta btn btn-light mt-2"
          onClick={() => navigate("/search")}
        >
          Empieza a comparar
        </button>
      </div>
    </section>
  );
};
