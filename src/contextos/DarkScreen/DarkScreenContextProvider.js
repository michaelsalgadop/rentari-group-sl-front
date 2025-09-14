import { useState } from "react";
import { DarkScreenContext } from "./DarkScreenContext";

export const DarkScreenContextProvider = (props) => {
  const [showBar, setShowBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { children } = props;
  return (
    <DarkScreenContext.Provider
      value={{ showBar, setShowBar, loading, setLoading }}
    >
      <div className={`dark-screen ${showBar || loading ? "show" : ""}`}>
        {loading ? "Cargando..." : ""}
      </div>
      {children}
    </DarkScreenContext.Provider>
  );
};
