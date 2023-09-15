import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
import { fetchPanier, fetchPanierAsync } from '../../services/fetchData';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';





const addPanier = async (dataForm) => {
    try {
        const response = await axiosClient.post(`panier/`, dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};



//update le panier
const updatePanier = (id_pan, dataForm) => {
    try {
        const response = axiosClient.patch(`panier/${id_pan}/`, dataForm);
        console.log('updating..............', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const retrievePanier = (id_user) => {
    // recuperation du panier
    try {
        const panier = fetchPanier(id_user);
        return panier
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}



const deleteCart = async (id_pan) => {
    // recuperation du panier
    try {
        const panier = await axiosClient.delete(`panier/${id_pan}/`);
        return panier
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

const deleteAllCart = async (id_user) => {
    // recuperation du panier
    try {
        const panier = await axiosClient.get(`panier/deleteAllCart/?customer=${id_user}`);
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
        cartItems: [], // Ensure this property is defined
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            if (product.id_art) {
                const id_user = localStorage.getItem("cu")
                // console.log("le log du user actuel:", id_user);

                const cartItem = state.cartItems.find(item => item.id_art === product.id_art);
                if (!cartItem) {

                    dataForm = {
                        "article": product.id_art,
                        "quantity": product.quantity ? product.quantity : 1,
                        "customer": id_user
                    }

                    // ajouter le panier
                    addPanier(dataForm)

                    // console.log("Ajout de l'article: ", state.cartItems)

                    // state.cartItems.push({
                    //     ...product,
                    //     quantity: product.quantity ? product.quantity : 1
                    //     // cartItemId: uuidv4()
                    // });

                } else {
                    state.cartItems = state.cartItems.map(item => {
                        if (item.id_pan === cartItem.id_pan) {

                            dataForm = {
                                "article": product.id_art,
                                "quantity": product.quantity ? item.quantity + product.quantity : item.quantity + 1,
                                "customer": id_user
                            }
                            console.log("mise à jour de l'article: ", item.id_pan)

                            //mettre à jour le panier
                            updatePanier(item.id_pan, dataForm)
                            return {
                                ...item,
                                quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1
                            }
                        }
                        return item;

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
            // state.cartItems = retrievePanier(1)

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
            // state.cartItems = retrievePanier(1)

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
            deleteCart(action.payload)
            state.cartItems = state.cartItems.filter(item => item.id_pan !== action.payload);
            cogoToast.error("Removed From Cart", { position: "bottom-left" });
        },
        decreaseQuantity(state, action) {

            const id_user = localStorage.getItem("cu")

            const product = action.payload;
            if (product.quantity === 1) {
                //suppression de l'article du panier
                deleteCart(action.payload.id_pan)
                state.cartItems = state.cartItems.filter(item => item.id_pan !== product.id_pan);
                cogoToast.error("Removed From Cart", { position: "bottom-left" });
            } else {

                dataForm = {
                    "article": product.id_art,
                    "quantity": product.quantity - 1,
                    "customer": id_user
                }

                //mettre à jour le panier
                updatePanier(product.id_pan, dataForm)

                // retrievePanier(id_user).then(cartData => {
                //     console.log("ca marche: ", cartData);
                //     data = cartData
                //     state.cartItems = cartData;
                // });

                // console.log("le log data: ", data);

                state.cartItems = state.cartItems.map(item =>
                    item.id_pan === product.id_pan
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
                cogoToast.warn("Item Decremented From Cart", { position: "bottom-left" });
            }
        },
        deleteAllFromCart(state) {
            const id_user = localStorage.getItem("cu")
            // console.log("le log du user actuel:", id_user);

            deleteAllCart(id_user)
            state.cartItems = []
        },

        initCart(state, action) {
            const sortedCartItems = action.payload.slice().sort((a, b) => b.id_pan - a.id_pan);
            state.cartItems = sortedCartItems
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchPanierAsync.fulfilled, (state, action) => {
    //             state.cartItems = action.payload;
    //         })
    //         .addMatcher(
    //             (action) =>
    //                 action.type.endsWith('/fulfilled') && action.type.includes('cart/'),
    //             (state, action) => {
    //                 // This code block will execute when a successful cart-related action is dispatched
    //                 // You can put any logic you need here
    //                 console.log('Cart-related action dispatched:', action);
    //                 // Dispatch fetchPanierAsync after any successful cart-related action
    //                 const dispatch = useDispatch(); // Make sure you have access to s
    //                 );
    //             }
    //         );
    // }


});

export const { addToCart, deleteFromCart, decreaseQuantity, deleteAllFromCart, initCart } = cartSlice.actions;
export default cartSlice.reducer;
