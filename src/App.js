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
import { Auth } from "./paginas/Auth";
import { PageNotFound } from "./paginas/PageNotFound";
import { Profile } from "./paginas/Profile";
import { Search } from "./paginas/Search";

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
                <Route path="/search" element={<Search />}></Route>
                <Route path="/login" element={<Auth />}></Route>
                <Route path="/register" element={<Auth />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
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
