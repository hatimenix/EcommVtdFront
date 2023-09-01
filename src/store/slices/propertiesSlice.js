// articleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const propertiesSlice = createSlice({
    name: 'propertie',
    initialState: {
        properties: [],
        
    },
    reducers: {
        setProperties: (state, action) => {
            state.properties = action.payload;
        },
       
    },
   
});

export const { setProperties } = propertiesSlice.actions;
export default propertiesSlice.reducer;