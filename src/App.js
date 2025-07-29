import { DarkScreenContextProvider } from "./contextos/DarkScreen/DarkScreenContextProvider";
import { Cabecera } from "./componentes/Cabecera";
import { Footer } from "./componentes/Footer";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Landing } from "./paginas/Landing";
import { PageNotFound } from "./paginas/PageNotFound";

function App() {
  return (
    <>
      <DarkScreenContextProvider>
        <Router>
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
        </Router>
        <Footer></Footer>
      </DarkScreenContextProvider>
    </>
  );
}

export default App;
