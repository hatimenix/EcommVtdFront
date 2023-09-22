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
import ArticlePkg__ from "./components/article-archetype/ArticlePkg__";
import Wallet from "./pages/ProfileSettings/Paiement/Wallet";
import AboutUs from "./pages/FooterPages/AboutUs";
import ArticlePkg from "./components/article-archetype/ArticlePkg";
import Contact from "./pages/FooterPages/Contact";
import TermsAndConditions from "./pages/FooterPages/TermsAndConditions";
import PrivacyPolicy from "./pages/FooterPages/PrivacyPolicy";
import Commande from "./pages/other/commande";
import CommandeAdmin from "./pages/other/commandeAdmin";
import RequireAuth from "./hooks/RequireAuth";
import EditMail from "./pages/ProfileSettings/Edit_mail/EditMail";


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
              element={<RequireAuth element={<Dash />}/>}

            />
            <Route
              path={process.env.PUBLIC_URL + "/gestion-articles"}
              element={<ListeArticles />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/gestion-profil"}
              element={<RequireAuth element={<ProfileSide />}/>}

            />
            <Route
              path={process.env.PUBLIC_URL + "/profil"}
              element={<RequireAuth element={<Profile />}/>}
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
              element={<RequireAuth element={<ListeArticles />}/>}

            />
            <Route
              path={process.env.PUBLIC_URL + "/nouveau-article"}
              element={<RequireAuth element={<NewArticle />}/>}
            />
            <Route
              path={process.env.PUBLIC_URL + "/details-article"}
              element={<RequireAuth element={<DetailsArticle />}/>}

            />
            <Route
              path={process.env.PUBLIC_URL + "/edit-article"}
              element={<RequireAuth element={<EditArticle />}/>}

            />


            <Route
              path={process.env.PUBLIC_URL + "/category/:categoryId"} // Updated route path
              element={
                <Home />
              }
            />
            <Route
              path={process.env.PUBLIC_URL + "wallet"}
              element={
                <Wallet />
              }
            />


            <Route
              path={process.env.PUBLIC_URL + "/bundles/:articleId"}
              element={<ArticlePkg />}
            />


            <Route
              path={process.env.PUBLIC_URL + "/commande"}
              element={<Commande />}
            />



            <Route
              path={process.env.PUBLIC_URL + "/mesVentes"}
              element={<CommandeAdmin />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/a-propos"}
              element={<AboutUs />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/contact"}
              element={<Contact />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/termes-et-conditions"}
              element={<TermsAndConditions />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/Politique-de-confidentialité"}
              element={<PrivacyPolicy />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/modification_mail/:userId/:token/:expires"}
              element={<EditMail />}
            />

          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;