// articleSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchRepliesByReviewAPI } from '../../services/fetchData'; // Import the function to fetch a single article by ID

const repliessSlice = createSlice({
    name: 'replie',
    initialState: {
        replies: [],
        
    },
    reducers: {
        setReplies: (state, action) => {
            state.replies = action.payload;
        },
       
    },
   
});

export const { setReplies } = repliessSlice.actions;
export default repliessSlice.reducer;