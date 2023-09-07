// articleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const pkgSlice = createSlice({
    name: 'pkg',
    initialState: {
        pkgs: [],

    },
    reducers: {
        setPackages: (state, action) => {
            state.pkgs = action.payload;
        },

    },

});

export const { setPackages } = pkgSlice.actions;
export default pkgSlice.reducer;
