import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticles } from '../store/slices/articlesSlice';
import { setCategories } from '../store/slices/categoriesSlice';
import { initCart } from '../store/slices/cart-slice';
import { fetchArticles, fetchArticlesRec, fetchCategories, fetchPanier, fetchFavori, fetchUser, fetchProperties, fetchPackages, fetchCst, fetchCommande, fetchBoosts, fetchCstAsyn, fetchLot, fetchRatings, fetchAdminCommande } from './fetchData';
import { setArticleRec } from '../store/slices/articlesRecSlice';
import { setBoosts } from '../store/slices/boostSlice';
import { initFavoris } from '../store/slices/wishlist-slice';
import { useCurrentUserSelector } from '../store/selectors/selectors';
import { userChanged } from '../store/slices/userSlice';
import { setProperties } from '../store/slices/propertiesSlice';
import { setPackages } from '../store/slices/pkgSlice__';
import { setCst } from '../store/slices/CstSlice';
import { initCommande } from '../store/slices/commande-slice';
import { setLots } from '../store/slices/lotSlice';
import { setRatings } from '../store/slices/ratingSlice';
import { initAchat } from '../store/slices/achatLot-slice';
import { initCommandeAdmin } from '../store/slices/commande-slice-admin';
// import { fetchArticles, fetchCategories, fetchFavori, fetchPanier } from './fetchData';

const usePersistData = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articles = await fetchArticles();
                dispatch(setArticles(articles));
                localStorage.setItem("articles", JSON.stringify(articles))

            } catch (error) {
                console.error('Error fetching articles:', error);
            }

            try {
                const categories = await fetchCategories();
                dispatch(setCategories(categories));
            } catch (error) {
                console.error('Error fetching categories:', error);
            }

            try {
                const panier = await fetchPanier(2);
                dispatch(initCart(panier));
            } catch (error) {
                console.error('Error fetching panier:', error);
            }

            try {
                const favori = await fetchFavori(2);
                dispatch(initFavoris(favori));
            } catch (error) {
                console.error('Error fetching favori:', error);
            }

            try {
                const recs = await fetchArticlesRec();
                dispatch(setArticleRec(recs));
            } catch (error) {
                console.error('Error fetching recs:', error);
            }

            try {
                const boosts = await fetchBoosts();
                dispatch(setBoosts(boosts));
            } catch (error) {
                console.error('Error fetching boosts:', error);
            }

            try {
                const prp = await fetchProperties();
                dispatch(setProperties(prp));
            } catch (error) {
                console.error('Error fetching props:', error);
            }

            try {
                const pkg = await fetchPackages();
                dispatch(setPackages(pkg));
            } catch (error) {
                console.error('Error fetching packages:', error);
            }

            try {
                const cs = await fetchCstAsyn();
                dispatch(setCst(cs));
                localStorage.setItem("csts", JSON.stringify(cs))

                console.log("persist csts", cs);
            } catch (error) {
                console.error('Error fetching csts:', error);
            }

            try {
                const lot = await fetchLot();
                dispatch(setLots(lot));
                dispatch(initAchat(lot));
                localStorage.setItem("lots", JSON.stringify(lot))

                // localStorage.setItem("lo", JSON.stringify(cs))

                console.log("persist lots", lot);
            } catch (error) {
                console.error('Error fetching lots:', error);
            }

            // fetch user and initialize cart and favoris
            try {
                const recs = await fetchUser();
                dispatch(userChanged(recs));
                localStorage.setItem('cu', recs.id);
                console.log('user identifier:', recs.id);

                // fetch panier
                const panier = await fetchPanier(recs.id);
                dispatch(initCart(panier));

                // fetch favoris
                const favori = await fetchFavori(recs.id);
                dispatch(initFavoris(favori));
            } catch (error) {
                console.error('Error fetching user and initializing cart and favoris:', error);
            }

            try {
                const pkg = await fetchPackages();
                dispatch(setPackages(pkg));
                localStorage.setItem("pkgs", JSON.stringify(pkg));
                console.log("persist pkg", pkg);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
            try {
                const rt = await fetchRatings();
                dispatch(setRatings(rt));
                console.log("persist rt", rt);
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }

            // fetch user and initialize cart and favoris
            try {
                const recs = await fetchUser();
                dispatch(userChanged(recs));
                localStorage.setItem("cu", recs.id);
                console.log("user identifier:", recs.id);

                // fetch panier
                const panier = await fetchPanier(recs.id);
                dispatch(initCart(panier));

                // fetch commande
                const commande = await fetchCommande(recs.id);
                dispatch(initCommande(commande));

                // fetch commandeAdmin
                const commandeAdmin = await fetchAdminCommande(recs.id);
                dispatch(initCommandeAdmin(commandeAdmin));



                fetchCst(recs.id);

                // dispatch(fetchCst(cst));


            } catch (error) {
                console.error('Error fetching recs:', error);
            }
        };

        fetchData();
    }, [dispatch]);
};

export default usePersistData;
