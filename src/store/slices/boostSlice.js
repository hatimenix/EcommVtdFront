import { createSlice } from '@reduxjs/toolkit';
import { fetchBoosts } from '../../services/fetchData';

const boostSlice = createSlice({
  name: 'boost',
  initialState: {
    boosts: [], // Initial state is an empty array
    loading: false,
    error: null,
  },
  reducers: {
  setBoosts: (state, action) => {
            state.boosts = action.payload;
        }

  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBoosts.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchBoosts.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.boosts = action.payload; // Update the state with the fetched boosts
  //     })
  //     .addCase(fetchBoosts.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });
  // },
});
export const { setBoosts } = boostSlice.actions;

export default boostSlice.reducer;