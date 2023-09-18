import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticles } from '../store/slices/articlesSlice';
import { setCategories } from '../store/slices/categoriesSlice';
import { initCart } from '../store/slices/cart-slice';
import { fetchArticles, fetchArticlesRec, fetchCategories, fetchPanier, fetchFavori, fetchUser, fetchProperties, fetchPackages, fetchCst, fetchCstAsyn, fetchLot } from './fetchData';
import { setArticleRec } from '../store/slices/articlesRecSlice';
import { initFavoris } from '../store/slices/wishlist-slice';
import { useCurrentUserSelector } from '../store/selectors/selectors';
import { userChanged } from '../store/slices/userSlice';
import { setProperties } from '../store/slices/propertiesSlice';
import { setPackages } from '../store/slices/pkgSlice__';
import { setCst } from '../store/slices/CstSlice';
// import { fetchArticles, fetchCategories, fetchFavori, fetchPanier } from './fetchData';

const usePersistData = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.userData);
    // console.log("user..............", user);



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

            // // recuperation du panier
            // try {
            //     const panier = await fetchPanier(2);
            //     dispatch(initCart(panier));
            // } catch (error) {
            //     console.error('Error fetching categories:', error);
            // }

            // // recuperation du favoris
            // try {
            //     const favori = await fetchFavori(2);
            //     dispatch(initFavoris(favori));
            // } catch (error) {
            //     console.error('Error fetching categories:', error);
            // }


            try {
                const recs = await fetchArticlesRec();
                dispatch(setArticleRec(recs));
            } catch (error) {
                console.error('Error fetching recs:', error);
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
                localStorage.setItem("pkgs", JSON.stringify(pkg))

                console.log("persist pkg", pkg);
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
                dispatch(setCst(lot));
                localStorage.setItem("lots", JSON.stringify(lot))

                // localStorage.setItem("lo", JSON.stringify(cs))

                console.log("persist lots", lot);
            } catch (error) {
                console.error('Error fetching lots:', error);
            }




            // fetch user and initialise card and fav
            try {
                const recs = await fetchUser();
                dispatch(userChanged(recs));
                localStorage.setItem("cu", recs.id)
                console.log("user identifff..............", recs.id);

                // fetch panier
                const panier = await fetchPanier(recs.id);
                dispatch(initCart(panier));


                // fetch favoris
                const favori = await fetchFavori(recs.id);
                dispatch(initFavoris(favori));



                dispatch(fetchCst());



            } catch (error) {
                console.error('Error fetching recs:', error);
            }
        };





        fetchData();
    }, [dispatch]);

};

export default usePersistData;