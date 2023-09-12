// articlesWithSameCategorySlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const articlesMidRecSlice = createSlice({
    name: 'articlesRec__',
    initialState,
    reducers: {
        storeArticlesMidRec: (state, action) => {
            return action.payload;
        },
    },
});

export const { storeArticlesMidRec } = articlesMidRecSlice.actions;

export default articlesMidRecSlice.reducer;
