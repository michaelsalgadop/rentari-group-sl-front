import { NavbarLinks } from "./NavbarLinks/NavbarLinks.js";

export const NavbarMobile = (props) => {
  const { showBar, mostrarOcultarBarraMobile } = props;
  return (
    <nav
      role="navigation"
      aria-label="Menú móvil"
      className={`menu-mobile navegacion-mobile${showBar ? " show" : ""}`}
    >
      <NavbarLinks
        isMobile={true}
        mostrarOcultarBarraMobile={mostrarOcultarBarraMobile}
      ></NavbarLinks>
    </nav>
  );
};
