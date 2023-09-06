// favoriteSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchLikesCount } from '../../services/fetchData';

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {},
    reducers: {
        setLikeCount: (state, action) => {
            const { articleId, likeCount } = action.payload;
            state[articleId] = likeCount;
        },
    },
});

export const { setLikeCount } = favoriteSlice.actions;
export default favoriteSlice.reducer;

// Thunk to fetch like counts
export const fetchLikeCounts = () => async (dispatch) => {
    try {
        const likesCounts = await fetchLikesCount();
        dispatch(setLikeCount(likesCounts));
    } catch (error) {
        console.error('Error fetching like counts:', error);
    }
};
