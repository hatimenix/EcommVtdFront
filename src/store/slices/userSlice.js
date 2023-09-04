// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axiosClient.get('/auth/user/');
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default userSlice.reducer;
