// articleSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchArticleById } from '../../services/fetchData'; // Import the function to fetch a single article by ID

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        articles: [],
        articleDetail: null, // Add this state to store the details of a single article
    },
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload;
        },
        setArticleDetail: (state, action) => {
            state.articleDetail = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticleById.fulfilled, (state, action) => {
            state.articleDetail = action.payload;
        });
        // Handle other action types if needed...
    },
});

export const { setArticles, setArticleDetail } = articleSlice.actions;
export default articleSlice.reducer;
