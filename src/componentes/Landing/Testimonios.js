import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
export const Testimonios = () => {
  const testimonios = [
    {
      nombre: "Laura G.",
      puesto: "Diseñadora UX",
      mensaje:
        "Desde el primer momento me encantó el diseño de la web. Es limpia, rápida y muy fácil de navegar. Todo se entiende a la primera, sin distracciones.",
    },
    {
      nombre: "Marcos H.",
      puesto: "Desarrollador frontend",
      mensaje:
        "No tuve que pensar demasiado para encontrar lo que buscaba. Todo está bien organizado y se nota que hay un trabajo cuidadoso detrás.",
    },
    {
      nombre: "Andrea R.",
      puesto: "Estudiante de ingeniería",
      mensaje:
        "Entré desde el móvil y la experiencia fue igual de fluida que en el ordenador. Carga rápido, se ve genial y no hay elementos que se desordenen.",
    },
    {
      nombre: "Sergio M.",
      puesto: "Emprendedor",
      mensaje:
        "El contenido me pareció útil, directo y muy bien redactado. Me resolvió una duda que llevaba semanas arrastrando.",
    },
    {
      nombre: "Valeria C.",
      puesto: "Consultora digital",
      mensaje:
        "Me dio mucha confianza desde el primer clic. Se nota que hay una propuesta sólida detrás, tanto visual como técnica.",
    },
    {
      nombre: "Joel T.",
      puesto: "Marketer freelance",
      mensaje:
        "No suelo dejar opiniones, pero esta web me sorprendió para bien. Ya la tengo guardada en favoritos para volver pronto.",
    },
  ];

  return (
    <section className="seccion-testimonios row">
      <div className="col-12">
        <div className="row">
          <h2 className="col-12 text-center">Que opinan nuestros usuarios?</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <Swiper
              modules={[Navigation]}
              loop={true}
              navigation={true}
              spaceBetween={20}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1440: {
                  slidesPerView: 4,
                },
                1920: {
                  slidesPerView: 5,
                },
              }}
              className="container-swiper swiper"
            >
              {testimonios.map((testimonio) => (
                <SwiperSlide key={JSON.stringify(testimonio)}>
                  <div className="swiper-card swiper-slide">
                    <div className="row">
                      <div className="col-12 text-center d-flex justify-content-center">
                        <div className="quote-container">
                          <FaQuoteLeft className="quote"></FaQuoteLeft>
                        </div>
                      </div>
                    </div>
                    <div className="user-info">
                      <div className="row">
                        <div className="col-12 text-center">
                          <span className="name text-center">
                            {testimonio.nombre}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center">
                          <span className="role text-center">
                            {testimonio.puesto}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="message text-center">{testimonio.mensaje}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
