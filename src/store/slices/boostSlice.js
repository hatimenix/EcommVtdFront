import { createSlice } from '@reduxjs/toolkit';
import { fetchBoosts } from '../../services/fetchData';

const boostSlice = createSlice({
  name: 'boosts',
  initialState: {
    boosts: [], // Initial state is an empty array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoosts.fulfilled, (state, action) => {
        state.loading = false;
        state.boosts = action.payload; // Update the state with the fetched boosts
      })
      .addCase(fetchBoosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default boostSlice.reducer;