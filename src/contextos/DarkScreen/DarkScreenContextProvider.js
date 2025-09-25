import { useState } from "react";
import { DarkScreenContext } from "./DarkScreenContext";

export const DarkScreenContextProvider = (props) => {
  const [showBar, setShowBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDarkScreen, setShowDarkScreen] = useState(false);
  const { children } = props;
  return (
    <DarkScreenContext.Provider
      value={{
        showBar,
        setShowBar,
        loading,
        setLoading,
        showDarkScreen,
        setShowDarkScreen,
      }}
    >
      <div
        className={`dark-screen ${showBar || loading || showDarkScreen ? "show" : ""}`}
      >
        {loading ? "Cargando..." : ""}
      </div>
      {children}
    </DarkScreenContext.Provider>
  );
};
