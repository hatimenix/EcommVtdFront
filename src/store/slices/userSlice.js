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
    initialState: {
        users: [],
    },
    reducers: {
        firstNameChanged: (state, action) => {
            state.first_name = action.payload;
        },

        setUser: (state, action) => {
            state.users = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return action.payload;
        });

        localStorage.setItem("number", 12565555)
    },
});



export const setUsersWithProp = (prop, payload) => (dispatch, getState) => {
    // You can perform any logic with the prop here if needed
    const modifiedPayload = {
        prop,
        users: payload,
    };

    dispatch(setUser(modifiedPayload));
};


export const { firstNameChanged, setUser } = userSlice.actions;


export default userSlice.reducer;
