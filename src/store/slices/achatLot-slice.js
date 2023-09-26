import cogoToast from 'cogo-toast';
import axiosClient from '../../axios-client';


const id_user = parseInt(localStorage.getItem("cu"))

const { createSlice } = require('@reduxjs/toolkit');


const achatSlice = createSlice({
    name: 'achatList',
    initialState: {
        achatListItem: [], // Ensure this property is defined
    },
    reducers: {
        // initialisation du Commande
        initAchat(state, action) {
            // const sortedachatListItem = action.payload.slice().sort((a, b) => b.id_com - a.id_com);
            state.achatListItem = action.payload
        }

    },
});

export const { initAchat } = achatSlice.actions;
export default achatSlice.reducer;
