import { useState } from "react";
import { AuthContext, AUTH_MODES } from "./AuthContext";

export const AuthContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const [authMode, setAuthMode] = useState(AUTH_MODES.LOGIN); // Modo Loguin o Registro
  const [logueado, setLogueado] = useState(!!token);
  const [role, setRole] = useState("user");
  const { children } = props;
  const cambiarEntreLoginYRegistro = (accion) => {
    if (
      accion &&
      (accion === AUTH_MODES.LOGIN || accion === AUTH_MODES.REGISTER)
    ) {
      setAuthMode(accion);
    } else {
      setAuthMode(
        authMode === AUTH_MODES.LOGIN ? AUTH_MODES.REGISTER : AUTH_MODES.LOGIN,
      );
    }
  };
  const loguearUsuario = () => {
    setLogueado(true);
  };
  const desloguearUsuario = () => {
    localStorage.removeItem("token");
    setLogueado(false);
  };
  return (
    <AuthContext.Provider
      value={{
        logueado,
        token,
        authMode,
        role,
        loguearUsuario,
        desloguearUsuario,
        cambiarEntreLoginYRegistro,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
