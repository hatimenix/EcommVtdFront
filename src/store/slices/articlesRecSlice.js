// articleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const recSlice = createSlice({
    name: 'rec',
    initialState: {
        recs: [],
    },
    reducers: {
        setArticleRec: (state, action) => {
            state.recs = action.payload;
        },

    },

});

export const { setArticleRec } = recSlice.actions;
export default recSlice.reducer;
