import { FaAddressCard, FaSearch, FaTimes, FaUser } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Logo } from "../Logo";
import { NavLink } from "react-router-dom";
export const NavbarLinks = (props) => {
  const { isMobile, mostrarOcultarBarraMobile } = props;
  return (
    <ul className="d-flex">
      {isMobile && (
        <li>
          <div className="cabecera-nav-mobile d-flex justify-content-between align-items-center">
            <FaTimes
              className="pointer"
              onClick={mostrarOcultarBarraMobile}
              aria-label="Cerrar menú"
            />
            <NavLink to="/" onClick={() => mostrarOcultarBarraMobile()}>
              <Logo
                alt="Logo de Rentari, en la barra de navegación"
                className="imagen-corporativa img-fluid"
              ></Logo>
            </NavLink>
          </div>
        </li>
      )}
      <li>
        <NavLink
          to="/rgewgegg"
          className={({ isActive }) =>
            (isActive ? "activo " : "") + "link-nav d-flex align-items-center"
          }
          onClick={isMobile ? () => mostrarOcultarBarraMobile() : undefined}
        >
          <FaSearch className="icon-nav"></FaSearch>
          Buscar
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rergrwgrg"
          className={({ isActive }) =>
            (isActive ? "activo " : "") + "link-nav d-flex align-items-center"
          }
          onClick={isMobile ? () => mostrarOcultarBarraMobile() : undefined}
        >
          <FaAddressCard className="icon-nav"></FaAddressCard>
          Quienes Somos
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rgrhgregr"
          className={({ isActive }) =>
            (isActive ? "activo " : "") + "link-nav d-flex align-items-center"
          }
          onClick={isMobile ? () => mostrarOcultarBarraMobile() : undefined}
        >
          <FaUser className="icon-nav"></FaUser>
          Registrarme
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wegtergrg"
          className={({ isActive }) =>
            (isActive ? "activo " : "") + "link-nav d-flex align-items-center"
          }
          onClick={isMobile ? () => mostrarOcultarBarraMobile() : undefined}
        >
          <FaArrowRightToBracket className="icon-nav"></FaArrowRightToBracket>
          Iniciar Sesión
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wegregrg"
          className="link-nav link-logout d-flex align-items-center"
          onClick={isMobile ? () => mostrarOcultarBarraMobile() : undefined}
        >
          <FaArrowRightToBracket className="icon-nav arrow-left-bracket"></FaArrowRightToBracket>
          Cerrar Sesión
        </NavLink>
      </li>
    </ul>
  );
};
