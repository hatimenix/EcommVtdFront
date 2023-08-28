import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ListeArticles from "./pages/EspaceVendeur/GestionArticles/ListeArticles";
import Dash from "./pages/EspaceVendeur/Dashboard/Dash";
import ProfileSide from "./pages/ProfileSettings/ProfileSide";
import Profile from "./pages/ProfileSettings/Profile";



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
                path={process.env.PUBLIC_URL + "/espace-vendeur"}
                element={<Dash/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/gestion-articles"}
                element={<ListeArticles/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/gestion-profil"}
                element={<ProfileSide/>}
              />
               <Route
                path={process.env.PUBLIC_URL + "/profil"}
                element={<Profile/>}
              />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
  );
};

export default App;