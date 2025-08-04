import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { Cabecera } from "./componentes/Cabecera";
import { Footer } from "./componentes/Footer";

import { DarkScreenContextProvider } from "./contextos/DarkScreen/DarkScreenContextProvider";
import { AuthContextProvider } from "./contextos/Auth/AuthContextProvider";

import { Landing } from "./paginas/Landing";
import { PageNotFound } from "./paginas/PageNotFound";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <DarkScreenContextProvider>
            <Cabecera></Cabecera>
            <main className="container-fluid">
              <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route
                  path="/inicio"
                  element={<Navigate to="/" replace />}
                ></Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </main>
          </DarkScreenContextProvider>
        </AuthContextProvider>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;
