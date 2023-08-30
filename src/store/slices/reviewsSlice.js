// articleSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchArticleById } from '../../services/fetchData'; // Import the function to fetch a single article by ID

const reviewsSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: [],
        
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
       
    },
   
});

export const { setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;