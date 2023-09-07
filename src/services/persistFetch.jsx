import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setArticles } from '../store/slices/articlesSlice';
import { setCategories } from '../store/slices/categoriesSlice';
import { initCart } from '../store/slices/cart-slice';
import { fetchArticles, fetchArticlesRec, fetchCategories, fetchPanier, fetchFavori, fetchUser } from './fetchData';
import { setArticleRec } from '../store/slices/articlesRecSlice';
import { initFavoris } from '../store/slices/wishlist-slice';
import { useCurrentUserSelector } from '../store/selectors/selectors';
import { userChanged } from '../store/slices/userSlice';
import { setProperties } from '../store/slices/propertiesSlice';
import { setPackages } from '../store/slices/pkgSlice__';
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
            } catch (error) {
                console.error('Error fetching packages:', error);
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

            } catch (error) {
                console.error('Error fetching recs:', error);
            }
        };

        fetchData();
    }, [dispatch]);

};

export default usePersistData;