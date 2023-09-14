import cogoToast from 'cogo-toast';
import { fetchFavori } from '../../services/fetchData';
import axiosClient from '../../axios-client';

const id_user = parseInt(localStorage.getItem("cu"))

const { createSlice } = require('@reduxjs/toolkit');


const addFavoris = async (dataForm) => {
    try {
        const response = await axiosClient.post(`favoris/`, dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};



//delete le Favoris
const deleteFavoris = async (id_pan) => {
    try {
        const response = await axiosClient.delete(`favoris/${id_pan}/`);
        // console.log('updating..............', dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};


//delete le Favoris
const deleteAllFavoris = async (id_user) => {
    try {
        const response = await axiosClient.get(`favoris/deleteAllFavoris/?customer=${id_user}`);
        // console.log('updating..............', dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// const retrieveFavoris = async (id_user) => {
//     // recuperation du Favoris
//     try {
//         const Favoris = await fetchFavori(id_user);
//         return Favoris
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//     }
// }


//dataForm
let dataForm = {}


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlistItems: [], // Ensure this property is defined
    },
    reducers: {
        addToWishlist(state, action) {
            const isInWishlist = state.wishlistItems.findIndex(item => item.id_art === action.payload.id_art);
            if (isInWishlist > -1) {
                cogoToast.info("Product already in wishlist", { position: "bottom-left" });
            } else {
                const wlist = action.payload
                dataForm = {
                    "article": wlist.id_art,
                    "Customer": id_user
                }

                // ajouter à la liste
                addFavoris(dataForm)
                // state.wishlistItems.push(action.payload)
                cogoToast.success("Added To wishlist", { position: "bottom-left" });
            }

        },
        deleteFromWishlist(state, action) {
            const id_fav = action.payload
            deleteFavoris(id_fav)
            state.wishlistItems = state.wishlistItems.filter(item => item.id_fav !== id_fav);
            cogoToast.error("Removed From Wishlist", { position: "bottom-left" });
        },
        deleteAllFromWishlist(state) {
            deleteAllFavoris(id_user)
            state.wishlistItems = []
        },

        // initialisation du favoris
        initFavoris(state, action) {
            state.wishlistItems = action.payload
        }

    },
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist, initFavoris } = wishlistSlice.actions;
export default wishlistSlice.reducer;
