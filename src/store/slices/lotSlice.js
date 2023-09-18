// articleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const lotSlice = createSlice({
    name: 'lot',
    initialState: {
        lots: [],
    },
    reducers: {
        setLots: (state, action) => {
            state.lots = action.payload;
        },

    },

});

export const { setLots } = lotSlice.actions;
export default lotSlice.reducer;
