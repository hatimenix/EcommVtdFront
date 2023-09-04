import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Authentication/Login";
import LoginVendeur from "./pages/Authentication/Login_vendeur";
import ListeArticles from "./pages/EspaceVendeur/GestionArticles/ListeArticles";
import NewArticle from "./pages/EspaceVendeur/GestionArticles/NewArticle";
import Dash from "./pages/EspaceVendeur/Dashboard/Dash";
import DetailsArticle from "./pages/EspaceVendeur/GestionArticles/DetailsArticle";
import EditArticle from "./pages/EspaceVendeur/GestionArticles/EditArticle";





const App = () => {
  return (
      <Router>
        <ScrollToTop>
          <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }>
            <Routes>
            <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<Home/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/login"}
                element={<Login/>}
              />
               <Route
                path={process.env.PUBLIC_URL + "/login-vendeur"}
                element={<LoginVendeur/>}
              />
               <Route
                path={process.env.PUBLIC_URL + "/espace-vendeur"}
                element={<Dash/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/gestion-articles"}
                element={<ListeArticles/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/nouveau-article"}
                element={<NewArticle/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/details-article"}
                element={<DetailsArticle/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/edit-article"}
                element={<EditArticle/>}
              />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
  );
};

export default App;