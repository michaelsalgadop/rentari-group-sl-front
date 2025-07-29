import React from "react";
import ReactDOM from "react-dom/client"; // Importa desde "react-dom/client"
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/montserrat/400.css"; // normal
import "@fontsource/montserrat/700.css"; // bold
import "swiper/css";
import "swiper/css/navigation";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Crear el root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
