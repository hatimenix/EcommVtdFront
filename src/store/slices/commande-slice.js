import cogoToast from 'cogo-toast';
import axiosClient from '../../axios-client';


const id_user = parseInt(localStorage.getItem("cu"))

const { createSlice } = require('@reduxjs/toolkit');


const addCommande = async (dataForm) => {
    try {
        const response = await axiosClient.post(`commande/`, dataForm);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};



const commandeSlice = createSlice({
    name: 'commandeList',
    initialState: {
        commandeListItem: [], // Ensure this property is defined
    },
    reducers: {
        // initialisation du Commande
        initCommande(state, action) {
            console.log('la liste de commande', action.payload);
            state.commandeListItem = action.payload
        }

    },
});

export const { addToCommandelist, initCommande } = commandeSlice.actions;
export default commandeSlice.reducer;
