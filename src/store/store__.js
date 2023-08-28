import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './slices/articlesSlice';
import categorieReducer from './slices/categoriesSlice';
import favoriReducer from './slices/favoriteSlice';
import cstReducer from './slices/CstSlice';

const store = configureStore({
    reducer: {
        article: articleReducer,
        categorie: categorieReducer,
        favori: favoriReducer,

        cst: cstReducer

    },

});

export default store;
