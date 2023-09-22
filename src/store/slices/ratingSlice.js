import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ratings: [],
};

const ratingsSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setRatings: (state, action) => {
      state.ratings = action.payload;
    },
  },
});

export const { setRatings } = ratingsSlice.actions;
export default ratingsSlice.reducer;