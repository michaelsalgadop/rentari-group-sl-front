import { Hero } from "../componentes/Landing/Hero";
import { ComoFunciona } from "../componentes/Landing/ComoFunciona";
import { Ventajas } from "../componentes/Landing/Ventajas";
import { Testimonios } from "../componentes/Landing/Testimonios";
import { CTA } from "../componentes/Landing/CTA";

export const Landing = () => {
  return (
    <>
      <Hero></Hero>
      <ComoFunciona></ComoFunciona>
      <Ventajas></Ventajas>
      <Testimonios></Testimonios>
      <CTA></CTA>
    </>
  );
};
