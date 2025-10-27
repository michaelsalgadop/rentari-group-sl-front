import React from "react";
import ReactDOM from "react-dom/client"; // Importa desde "react-dom/client"
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/montserrat/400.css"; // normal
import "@fontsource/montserrat/700.css"; // bold
import "swiper/css";
import "swiper/css/navigation";
import "intersection-observer";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = window.location.origin;

const root = ReactDOM.createRoot(document.getElementById("root")); // Crear el root
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: redirectUri }}
    useRefreshTokens={false}
    cacheLocation="localstorage"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
);
