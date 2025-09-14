import { useContext } from "react";
import { DarkScreenContext } from "../contextos/DarkScreen/DarkScreenContext";
import { BtnHamburguesa } from "./Navbar/BtnHamburguesa";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar/Navbar";
import { NavbarMobile } from "./Navbar/NavbarMobile";
import { NavLink } from "react-router-dom";

export const Cabecera = () => {
  const { setShowBar, showBar } = useContext(DarkScreenContext);
  const mostrarOcultarBarraMobile = () => {
    setShowBar(!showBar);
  };
  return (
    <>
      <header className="cabecera">
        <div className="row justify-content-between">
          <div className="col-7 col-md-4">
            <NavLink to="/" className="d-flex align-items-center">
              <Logo
                alt="Logo de Rentari, empresa de renting de coches"
                width="40px"
                height="40px"
                className="imagen-corporativa img-fluid mr-1"
              ></Logo>
              <span className="titulo-corporativo">RENTARI</span>
            </NavLink>
          </div>
          <BtnHamburguesa
            mostrarOcultarBarraMobile={mostrarOcultarBarraMobile}
            showBar={showBar}
          ></BtnHamburguesa>
          <Navbar></Navbar>
        </div>
      </header>
      <NavbarMobile
        showBar={showBar}
        mostrarOcultarBarraMobile={mostrarOcultarBarraMobile}
      ></NavbarMobile>
    </>
  );
};
