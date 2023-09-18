import { createSlice } from '@reduxjs/toolkit';
import { fetchCst } from '../../services/fetchData';

const CstSlice = createSlice({
    name: 'cst',
    initialState: {
        sellers: [], // Initial state for sellers
    },
    reducers: {

        setCst: (state, action) => {
            state.csts = action.payload;
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchCst.fulfilled, (state, action) => {
            state.csts = action.payload; // Update the sellers array with fetched data
        });
    },
});



export const { setCst } = CstSlice.actions;

export default CstSlice.reducer;
