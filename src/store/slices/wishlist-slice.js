import cogoToast from 'cogo-toast';
import { fetchFavori } from '../../services/fetchData';
import axios from 'axios';


const { createSlice } = require('@reduxjs/toolkit');

const favoris = await fetchFavori(1);
const BASE_URL = 'http://127.0.0.1:8000/';

const id_user = 1

const addFavoris = async (dataForm) => {
    try {
        const response = await axios.post(`${BASE_URL}favoris/`, dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};



//delete le Favoris
const deleteFavoris = async (id_pan) => {
    try {
        const response = await axios.delete(`${BASE_URL}favoris/${id_pan}/`);
        // console.log('updating..............', dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};


//delete le Favoris
const deleteAllFavoris = async (id_pan) => {
    try {
        const response = await axios.delete(`${BASE_URL}favoris/${id_pan}/`);
        // console.log('updating..............', dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const retrieveFavoris = async (id_user) => {
    // recuperation du Favoris
    try {
        const Favoris = await fetchFavori(id_user);
        return Favoris
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}


//dataForm
let dataForm = {}


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlistItems: favoris, // Ensure this property is defined
  },
    reducers: {
        addToWishlist(state, action) {
            const isInWishlist = state.wishlistItems.findIndex(item => item.id === action.payload.id);
            if(isInWishlist > -1){
                cogoToast.info("Product already in wishlist", {position: "bottom-left"});
            } else {
                // state.wishlistItems.push(action.payload);
                const wlist = action.payload

                dataForm = {
                    "article": wlist.id_art,
                    "Customer": id_user
                }

                // ajouter le panier
                addFavoris(dataForm)
                state.wishlistItems = retrieveFavoris(1)
                cogoToast.success("Added To wishlist", {position: "bottom-left"});
            }
            
        },
        deleteFromWishlist(state, action){
            // state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
            const id_fav = action.payload
            console.log("le fav est: ",id_fav);
            deleteFavoris(id_fav)
            state.wishlistItems = retrieveFavoris(1)
            cogoToast.error("Removed From Wishlist", {position: "bottom-left"});
        },
        deleteAllFromWishlist(state){
            state.wishlistItems = []
        },

        // initialisation du favoris
        initFavoris(state, action) {
            state.wishlistItems = action.payload
        }

    },
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist,initFavoris } = wishlistSlice.actions;
export default wishlistSlice.reducer;
