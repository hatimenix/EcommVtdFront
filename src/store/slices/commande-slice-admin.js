import cogoToast from 'cogo-toast';
import axiosClient from '../../axios-client';


const id_user = parseInt(localStorage.getItem("cu"))

const { createSlice } = require('@reduxjs/toolkit');




const commandeSliceAdmin = createSlice({
    name: 'commandeListAdmin',
    initialState: {
        commandeListAdminItem: [], // Ensure this property is defined
    },
    reducers: {
        // initialisation du Commande
        initCommandeAdmin(state, action) {
            const sortedcommandeListItem = action.payload.slice().sort((a, b) => b.id_com - a.id_com);
            state.commandeListAdminItem = sortedcommandeListItem
        }

    },
});

export const { initCommandeAdmin } = commandeSliceAdmin.actions;
export default commandeSliceAdmin.reducer;
