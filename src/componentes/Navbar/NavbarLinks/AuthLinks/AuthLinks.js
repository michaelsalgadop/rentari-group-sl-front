import { FaCaretDown, FaUser } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  AuthContext,
  AUTH_MODES,
} from "../../../../contextos/Auth/AuthContext.js";
import { useJWT } from "../../../../hooks/useJWT.js";
import { schemaAuthLinks } from "../../../../schemas/layoutSchemas.js";
export const AuthLinks = (props) => {
  const {
    accionNavLink,
    classNameLink,
    mostrarOcultarDesplegable,
    mostrarPropiedadesPerfil,
  } = props;
  const { logueado, cambiarEntreLoginYRegistro, desloguearUsuario } =
    useContext(AuthContext);
  const { getItemJWT } = useJWT();
  const [nombreUsuario, setNombreUsuario] = useState(null);

  useEffect(() => {
    const nombreUsuarioAsignar = getItemJWT("nombreUsuario");
    if (nombreUsuarioAsignar) setNombreUsuario(nombreUsuarioAsignar);
  }, [getItemJWT]);

  return (
    <>
      {!logueado && (
        <>
          <li>
            <NavLink
              to="/register"
              className={classNameLink}
              onClick={() =>
                accionNavLink(() =>
                  cambiarEntreLoginYRegistro(AUTH_MODES.REGISTER),
                )
              }
            >
              <FaUser className="icon-nav"></FaUser>
              Registrarme
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={classNameLink}
              onClick={() =>
                accionNavLink(() =>
                  cambiarEntreLoginYRegistro(AUTH_MODES.LOGIN),
                )
              }
            >
              <FaArrowRightToBracket className="icon-nav"></FaArrowRightToBracket>
              Iniciar Sesión
            </NavLink>
          </li>
        </>
      )}
      {logueado && (
        <>
          <li className="desplegable">
            <NavLink
              className="link-nav link-nav-profile d-flex align-items-center"
              onClick={() =>
                mostrarOcultarDesplegable(!mostrarPropiedadesPerfil)
              }
            >
              <FaUser className="icon-nav"></FaUser>
              <span className="nombre-desplegable" title={nombreUsuario}>
                {nombreUsuario?.length > 10
                  ? nombreUsuario.slice(0, 11) + "..."
                  : nombreUsuario}
              </span>
              <FaCaretDown
                className={`icon-nav flecha-desplegable ${mostrarPropiedadesPerfil ? "desplegado" : ""}`}
              ></FaCaretDown>
            </NavLink>
            <ul
              className={`menu-desplegable ${mostrarPropiedadesPerfil ? "desplegado" : ""}`}
            >
              <li>
                <NavLink
                  to="/profile"
                  className={classNameLink}
                  onClick={() => accionNavLink()}
                >
                  <FaUser className="icon-nav"></FaUser>
                  Perfil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="link-nav link-logout d-flex align-items-center"
                  onClick={() => accionNavLink(() => desloguearUsuario())}
                >
                  <FaArrowRightToBracket className="icon-nav arrow-left-bracket"></FaArrowRightToBracket>
                  Cerrar Sesión
                </NavLink>
              </li>
            </ul>
          </li>
        </>
      )}
    </>
  );
};
AuthLinks.propTypes = schemaAuthLinks;
