import { FaTimes } from "react-icons/fa";
import { Logo } from "../../Logo.js";
import { NavLink } from "react-router-dom";
import { schemaCabeceraNavbarMobile } from "../../../schemas/layoutSchemas.js";

export const CabeceraNavbarMobile = (props) => {
  const { isMobile, accionNavLink } = props;

  return (
    <>
      {isMobile && (
        <li>
          <div className="cabecera-nav-mobile d-flex justify-content-between align-items-center">
            <FaTimes
              className="pointer"
              onClick={() => accionNavLink()}
              aria-label="Cerrar menú"
            />
            <NavLink to="/" onClick={() => accionNavLink()}>
              <Logo
                alt="Logo de Rentari, en la barra de navegación"
                className="imagen-corporativa img-fluid"
              ></Logo>
            </NavLink>
          </div>
        </li>
      )}
    </>
  );
};
CabeceraNavbarMobile.propTypes = schemaCabeceraNavbarMobile;
