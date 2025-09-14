import { NavbarLinks } from "./NavbarLinks/NavbarLinks.js";

export const Navbar = () => {
  return (
    <nav className={`navegacion col-12 col-md-8`}>
      <NavbarLinks></NavbarLinks>
    </nav>
  );
};
