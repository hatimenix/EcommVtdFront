import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import articleReducer from './slices/articlesSlice';
import categorieReducer from './slices/categoriesSlice';
import favoriReducer from './slices/favoriteSlice';
import cstReducer from './slices/CstSlice';
import compareReducer from './slices/compare-slice';
import wishlistReducer from './slices/wishlist-slice';
import cartReducer from './slices/cart-slice';
import currencyReducer from './slices/currency-slice';
import reviewReducer from './slices/reviewsSlice';
import replieReducer from './slices/repliesSlice';
import propertiesReducer from './slices/propertiesSlice';
import boostReducer from './slices/boostSlice';
import userReducer from './slices/userSlice';
import firstNameMiddleware from './middlewares/userMiddleware';
import recReducer from './slices/articlesRecSlice';


const store = configureStore({
    reducer: {
        article: articleReducer,
        categorie: categorieReducer,
        favori: favoriReducer,
        cst: cstReducer,
        compare: compareReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        currency: currencyReducer,
        review: reviewReducer,
        replie: replieReducer,
        propertie: propertiesReducer,
        boosts: boostReducer,

        user: userReducer,
        rec: recReducer


    },
    middleware: [...getDefaultMiddleware(), firstNameMiddleware],

});

export default store;
