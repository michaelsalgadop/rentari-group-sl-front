import { useCallback, useState } from "react";
import { AuthContext } from "./AuthContext";
import { schemaContextAuth } from "../../schemas/contextsSchemas";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContextProvider = (props) => {
  const token = localStorage.getItem("token");
  const [logueado, setLogueado] = useState(!!token);
  const [role, setRole] = useState("user");
  const { logout } = useAuth0();
  const { children } = props;
  const loguearUsuario = useCallback(() => {
    setLogueado(true);
  }, []);
  const desloguearUsuario = useCallback(() => {
    localStorage.removeItem("token");
    setLogueado(false);
    logout({ returnTo: window.location.origin });
  }, [logout]);
  return (
    <AuthContext.Provider
      value={{
        logueado,
        token,
        role,
        loguearUsuario,
        desloguearUsuario,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = schemaContextAuth;
