import { FaAddressCard, FaSearch, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CabeceraNavbarMobile } from "./CabeceraNavbarMobile";
import { AuthLinks } from "./AuthLinks/AuthLinks.js";
import { useCallback, useState } from "react";
import { schemaNavbarLinks } from "../../../schemas/layoutSchemas.js";
export const NavbarLinks = (props) => {
  const { isMobile, mostrarOcultarBarraMobile } = props;

  const [mostrarPropiedadesPerfil, setMostrarPropiedadesPerfil] =
    useState(false);
  /**
   * Cuando cliquemos una opcion del navbar, mirará si además tiene alguna callback que se deba ejecutar,
   * si es movil, pues que se oculte la barra lateral o en caso de que sea un dropdown que hemos clicado,
   * pues cerrarlo el dropdown.
   */
  const accionNavLink = useCallback(
    (callbackFunc = null) => {
      if (callbackFunc) callbackFunc();
      if (isMobile) mostrarOcultarBarraMobile();
      mostrarOcultarDesplegable(false);
    },
    [isMobile, mostrarOcultarBarraMobile],
  );
  /**
   * DRY(Don't repeat yourself), muchas opciones del navbar repetian classes, y decidí hacer esto y que no sea tan repetitivo.
   * @param {*} isActive miramos si esa opción está activa y le aplicamos su respectivo css
   * @returns
   */
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
NavbarLinks.propTypes = schemaNavbarLinks;
