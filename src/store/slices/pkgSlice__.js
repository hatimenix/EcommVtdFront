// pkgSlice.js

import { createSlice } from '@reduxjs/toolkit';

const pkgSlice = createSlice({
    name: 'pkg',
    initialState: {
        pkgs: [],
        isLoading: false, // Add isLoading state to track the API request
        error: null,      // Add error state to capture any API request errors
    },
    reducers: {
        setPackages: (state, action) => {
            state.pkgs = action.payload;
        },
        createPackageRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        createPackageSuccess: (state, action) => {
            state.pkgs.push(action.payload); // Add the created package to the list
            state.isLoading = false;
        },
        createPackageFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    setPackages,
    createPackageRequest,
    createPackageSuccess,
    createPackageFailure,
} = pkgSlice.actions;
export default pkgSlice.reducer;
