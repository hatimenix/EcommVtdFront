import { Suspense, lazy, useEffect } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Authentication/Login";
import ListeArticles from "./pages/EspaceVendeur/GestionArticles/ListeArticles";
import NewArticle from "./pages/EspaceVendeur/GestionArticles/NewArticle";
import Dash from "./pages/EspaceVendeur/Dashboard/Dash";
import DetailsArticle from "./pages/EspaceVendeur/GestionArticles/DetailsArticle";
import EditArticle from "./pages/EspaceVendeur/GestionArticles/EditArticle";


import ProfileSide from "./pages/ProfileSettings/ProfileSide";
import Profile from "./pages/ProfileSettings/Profile";
import ArticleGridDs from "./components/article-archetype/ArticleGridDs";
import persistanceThroughObjects from "./services/persistFetch";
import ProductTabRight from './pages/shop-product/ProductTabRight'; // Assuming this is where your individual Article component is located


const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const App = () => {

  persistanceThroughObjects()




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
              element={<Home />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/espace-vendeur"}
              element={<Dash />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/gestion-articles"}
              element={<ListeArticles />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/gestion-profil"}
              element={<ProfileSide />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/profil"}
              element={<Profile />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/articles/:articleId"}
              element={<ProductTabRight />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/wishlist"}
              element={<Wishlist />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/cart"}
              element={<Cart />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={<Checkout />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/art"}
              element={<ArticleGridDs />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/gestion-articles"}
              element={<ListeArticles />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/nouveau-article"}
              element={<NewArticle />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/details-article"}
              element={<DetailsArticle />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/edit-article"}
              element={<EditArticle />}
            />

          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;