// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../axios-client';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await axiosClient.get('/auth/user/');
    return response.data;
});

const initialState = {
    first_name: '',
    // other user properties...
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        firstNameChanged: (state, action) => {
            state.first_name = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const { firstNameChanged } = userSlice.actions;


export default userSlice.reducer;