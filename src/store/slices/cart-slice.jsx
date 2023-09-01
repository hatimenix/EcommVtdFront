import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
import { fetchPanier } from '../../services/fetchData';
import axios from 'axios';
import { useDispatch } from 'react-redux';


const { createSlice } = require('@reduxjs/toolkit');

const panier = await fetchPanier(1);
const BASE_URL = 'http://127.0.0.1:8000/';

const id_user = 1

const addPanier = async (dataForm) => {
    try {
        const response = await axios.post(`${BASE_URL}panier/`, dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};



//update le panier
const updatePanier = async (id_pan, dataForm) => {
    try {
        const response = await axios.patch(`${BASE_URL}panier/${id_pan}/`, dataForm);
        // console.log('updating..............', dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const retrievePanier = async (id_user) => {
    // recuperation du panier
    try {
        const panier = await fetchPanier(id_user);
        return panier
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

//dataForm
let dataForm = {}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: panier, // Ensure this property is defined
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            if (product.id_art) {
                const cartItem = state.cartItems.find(item => item.id_art === product.id_art);
                // console.log("le produit et l'article: ", product)

                if (!cartItem) {

                    dataForm = {
                        "article": product.id_art,
                        "quantity": product.quantity ? product.quantity : 1,
                        "Customer": id_user
                    }

                    // ajouter le panier
                    addPanier(dataForm)
                    state.cartItems = retrievePanier(1)

                    // console.log("Ajout de l'article: ", state.cartItems)

                    // state.cartItems.push({
                    //     ...product,
                    //     quantity: product.quantity ? product.quantity : 1,
                    //     cartItemId: uuidv4()
                    // });

                } else {
                    state.cartItems.map(item => {
                        if (item.cartItemId === cartItem.cartItemId) {

                            dataForm = {
                                "article": product.id_art,
                                "quantity": product.quantity ? item.quantity + product.quantity : item.quantity + 1,
                                "Customer": id_user
                            }
                            console.log("mise à jour de l'article: ", item.id_pan)
                            //mettre à jour le panier
                            updatePanier(item.id_pan, dataForm)
                            state.cartItems = retrievePanier(1)


                        }
                    })
                }

            }
            // else {
            //     //else..........
            //     const cartItem = state.cartItems.find(
            //         item =>
            //             item.id_art === product.id_art &&
            //             product.selectedProductColor &&
            //             product.selectedProductColor === item.selectedProductColor &&
            //             product.selectedProductSize &&
            //             product.selectedProductSize === item.selectedProductSize &&
            //             (product.cartItemId ? product.cartItemId === item.cartItemId : true)
            //     );
            //     if (!cartItem) {

            //         dataForm = {
            //             "article": product.id_art,
            //             "quantity": product.quantity ? product.quantity : 1,
            //             "Customer": id_user
            //         }

            //         // ajout au panier
            //         addPanier(dataForm)
            //         state.cartItems = retrievePanier(1)

            //         // state.cartItems.push({
            //         //     ...product,
            //         //     quantity: product.quantity ? product.quantity : 1,
            //         //     cartItemId: uuidv4()
            //         // });

            //     } else if (cartItem !== undefined && (cartItem.selectedProductColor !== product.selectedProductColor || cartItem.selectedProductSize !== product.selectedProductSize)) {

            //         dataForm = {
            //             "article": product.id,
            //             "quantity": product.quantity ? product.quantity : 1,
            //             "Customer": id_user
            //         }

            //         // ajout au panier
            //         addPanier(dataForm)
            //         state.cartItems = retrievePanier(1)

            //         // state.cartItems = [
            //         //     ...state.cartItems,
            //         //     {
            //         //         ...product,
            //         //         quantity: product.quantity ? product.quantity : 1,
            //         //         cartItemId: uuidv4()
            //         //     }
            //         // ]
            //     } else {
            //         state.cartItems = state.cartItems.map(item => {
            //             if (item.cartItemId === cartItem.cartItemId) {

            //                 dataForm = {
            //                     "article": product.id,
            //                     "quantity": product.quantity ? product.quantity : item.quantity + 1,
            //                     "Customer": id_user
            //                 }


            //                 return {
            //                     ...item,
            //                     quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
            //                     selectedProductColor: product.selectedProductColor,
            //                     selectedProductSize: product.selectedProductSize
            //                 }
            //             }
            //             return item;
            //         });
            //     }
            // }

            cogoToast.success("Added To Cart", { position: "bottom-left" });
        },
        deleteFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.cartItemId !== action.payload);
            cogoToast.error("Removed From Cart", { position: "bottom-left" });
        },
        decreaseQuantity(state, action) {
            const product = action.payload;
            if (product.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.cartItemId !== product.cartItemId);
                cogoToast.error("Removed From Cart", { position: "bottom-left" });
            } else {
                state.cartItems = state.cartItems.map(item =>
                    item.cartItemId === product.cartItemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
                cogoToast.warn("Item Decremented From Cart", { position: "bottom-left" });
            }
        },
        deleteAllFromCart(state) {
            state.cartItems = []
        },

        initCart(state, action) {
            state.cartItems = action.payload
        }
    },
});

export const { addToCart, deleteFromCart, decreaseQuantity, deleteAllFromCart, initCart } = cartSlice.actions;
export default cartSlice.reducer;
