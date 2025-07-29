import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="footer-col col-12 col-md-4 form-group">
          <a href="/">
            <Logo
              alt="Logo de Rentari, empresa especializada en Rentings de vehículos, en el pie de página."
              width="140px"
              height="140px"
              className="logo-footer img-fluid"
            ></Logo>
          </a>
        </div>
        <div className="footer-col col-12 col-md-4 form-group">
          <p className="bolder">Sobre Rentari:</p>
          <ul className="listado-footer">
            <li>Aviso Legal</li>
            <li>Política de Privacidad</li>
            <li>Terminos y Condiciones</li>
            <li>Cookies y Datos Recopilados</li>
          </ul>
        </div>
        <div className="footer-col col-12 col-md-4 form-group">
          <p className="bolder">Contactame:</p>
          <ul className="listado-footer">
            <li>Email: contacto@rentari.com</li>
            <li>Teléfono: +34 635 382 150</li>
            <li>Dirección: Avenida Liria, 500, 9º 1º</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <p className="copyright mb-2">
            Copyright © {new Date().getFullYear()} Rentari Group S.L. All
            rights reserved.
          </p>
          <p className="creator mb-1">
            By&nbsp;
            <a
              href="https://github.com/michaelsalgadop"
              className="link-creator"
              target="_blank"
              rel="noreferrer"
            >
              @michaelsalgadop
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center form-group">
          <ul className="social-networks d-flex justify-content-center align-items-center">
            <li>
              <a
                href="https://www.instagram.com/michaelsp11/"
                target="_blank"
                rel="noreferrer"
                className="link-network"
              >
                <FaInstagram></FaInstagram>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/michael-salgado-perez/"
                target="_blank"
                rel="noreferrer"
                className="link-network"
              >
                <FaLinkedin></FaLinkedin>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
