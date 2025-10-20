import { FaAddressCard, FaSearch, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CabeceraNavbarMobile } from "./CabeceraNavbarMobile";
import { AuthLinks } from "./AuthLinks/AuthLinks.js";
import { useCallback, useState } from "react";
export const NavbarLinks = (props) => {
  const { isMobile, mostrarOcultarBarraMobile } = props;

  const [mostrarPropiedadesPerfil, setMostrarPropiedadesPerfil] =
    useState(false);

  const accionNavLink = useCallback(
    (callbackFunc = null) => {
      if (callbackFunc) callbackFunc();
      if (isMobile) mostrarOcultarBarraMobile();
      mostrarOcultarDesplegable(false);
    },
    [isMobile, mostrarOcultarBarraMobile],
  );

  const classNameLink = ({ isActive }) =>
    (isActive ? "activo " : "") + "link-nav d-flex align-items-center";

  const mostrarOcultarDesplegable = (valor) => {
    setMostrarPropiedadesPerfil(valor);
  };

  return (
    <ul className="d-flex">
      <CabeceraNavbarMobile
        isMobile={isMobile}
        accionNavLink={accionNavLink}
      ></CabeceraNavbarMobile>
      <li>
        <NavLink
          to="/search"
          className={classNameLink}
          onClick={() => accionNavLink()}
        >
          <FaSearch className="icon-nav"></FaSearch>
          Buscar
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={classNameLink}
          onClick={() => accionNavLink()}
        >
          <FaAddressCard className="icon-nav"></FaAddressCard>
          Quienes Somos
        </NavLink>
      </li>
      <AuthLinks
        accionNavLink={accionNavLink}
        classNameLink={classNameLink}
        mostrarPropiedadesPerfil={mostrarPropiedadesPerfil}
        mostrarOcultarDesplegable={mostrarOcultarDesplegable}
      ></AuthLinks>
    </ul>
  );
};
