import { CTA } from "../componentes/Landing/CTA";

export const About = () => {
  return (
    <div className="cuerpo-pagina">
      {/* --- Nuestra misión --- */}
      <div className="espaciado-bloques text-center">
        <span className="nuestra-mision">Nuestra misión</span>
      </div>
      {/* --- Título --- */}
      <h1 className="titulo-about text-center">
        Un renting sencillo, adaptado y transparente
      </h1>
      {/* --- Introducción --- */}
      <section className="seccion-about espaciado-bloques text-center">
        <p className="parrafo-about text-center">
          En Rentari creemos que el renting no debería ser complicado, ni lleno
          de letra pequeña. Nacimos con una idea sencilla: que elegir tu coche
          sea tan emocionante como conducirlo.
        </p>
        <p className="parrafo-about text-center">
          Desde julio de 2025, trabajamos para hacer del renting una experiencia
          <span className="bolder">
            {" "}
            sencilla, transparente y adaptada a ti
          </span>
          . Queremos que entiendas cada paso, que confíes en lo que eliges y te
          sientas comodo.
        </p>
      </section>
      {/* --- Historia --- */}
      <section className="espaciado-bloques seccion-explicacion">
        <p className="parrafo-autor text-center">
          “ Rentari nace de la pasión por el motor, la tecnología y la
          curiosidad por construir algo diferente. ”
        </p>
        <p className="parrafo-about text-center">
          Su fundador soñó con una plataforma que uniera innovación y cercanía,
          donde cada decisión se tomara con claridad y cada cliente se sintiera
          acompañado. Lo que empezó como una idea, hoy se ha convertido en una
          comunidad que cree en una nueva forma de moverse.
        </p>
      </section>
      {/* --- Autor --- */}
      <section className="seccion-protagonista seccion-autor espaciado-bloques">
        <div className="motivational-words-autor">
          <p className="parrafo-autor text-center">
            “ Cuando pones pasión en lo que haces, las ideas encuentran su
            camino. ”
          </p>
          <span className="name-autor">- Michael Salgado</span>
        </div>

        <div className="columna-imagen-autor text-center">
          <img
            src="https://qfjfnkewfpeazdgqkxdw.supabase.co/storage/v1/object/public/imagenes-rentari/1627145361694.jpg"
            alt="imagen del autor"
            width="600px"
            height="600px"
            className="imagen-autor img-fluid"
          />
        </div>
      </section>
      {/* --- Cierre --- */}
      <section className="seccion-about espaciado-bloques">
        <p className="parrafo-about text-center">
          En Rentari queremos que sientas la libertad de elegir sin presión.
          Compara, descubre y selecciona tu próximo coche —sea un SUV, un
          compacto o un modelo premium— y vive el renting como nunca antes:{" "}
          <span className="bolder">fácil, claro y sin sorpresas</span>.
        </p>
      </section>
      <section className="seccion-about espaciado-bloques">
        <CTA
          titulo="Ahora es tu decisión...te unes a nosotros?"
          textoBtn="Empieza a comparar"
        ></CTA>
      </section>
    </div>
  );
};
