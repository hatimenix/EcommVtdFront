import { createSlice } from '@reduxjs/toolkit';
import { fetchCst } from '../../services/fetchData';

const CstSlice = createSlice({
    name: 'cst',
    initialState: {
        sellers: [], // Initial state for sellers
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCst.fulfilled, (state, action) => {
            state.csts = action.payload; // Update the sellers array with fetched data
        });
    },
});

export default CstSlice.reducer;
