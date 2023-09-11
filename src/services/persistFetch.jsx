import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setArticles } from '../store/slices/articlesSlice';
import { setCategories } from '../store/slices/categoriesSlice';
import { initCart } from '../store/slices/cart-slice';
import { fetchArticles, fetchArticlesRec, fetchBoosts, fetchCategories, fetchPanier } from './fetchData';
import { setArticleRec } from '../store/slices/articlesRecSlice';
import { setBoosts } from '../store/slices/boostSlice';

const usePersistData = () => {
    const dispatch = useDispatch();

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

            // recuperation du panier
            try {
                const panier = await fetchPanier(1);
                dispatch(initCart(panier));
            } catch (error) {
                console.error('Error fetching categories:', error);
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
        };

        fetchData();
    }, [dispatch]);
};

export default usePersistData;