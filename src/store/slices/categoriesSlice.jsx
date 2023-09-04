import { createSlice } from '@reduxjs/toolkit';
import { fetchArticlesByCategory } from '../../services/fetchData';

const categoriesSlice = createSlice({
    name: 'categorie',
    initialState: {
        categories: [],
        selectedCategory: JSON.parse(localStorage.getItem('selectedCategory')) || null,
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        selectCategory(state, action) {
            const selectedCategory = action.payload;
            localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory)); // Store selected category in localStorage
            state.selectedCategory = selectedCategory;
        },

        resetSelectedCategory(state) {
            localStorage.removeItem('selectedCategory'); // Remove selected category from localStorage
            state.selectedCategory = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticlesByCategory.fulfilled, (state, action) => {
            state.articles = action.payload;
        });
        // Handle other action types if needed...
    },
});

export const { setCategories, selectCategory, resetSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
