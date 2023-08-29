import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://127.0.0.1:8000/';

export const fetchArticlesByCategory = createAsyncThunk(
    'articles/fetchByCategory',
    async (categoryId, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}articles/category/${categoryId}/`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {

            throw error;
        }
    }
);
export const fetchArticles = async () => {
    const response = await axios.get(`${BASE_URL}articles/`, {
        withCredentials: true,
    });
    return response.data;
};

export const fetchArticleById = createAsyncThunk(
    'article/fetchById',
    async (articleId, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}articles/${articleId}/`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            // Handle errors here
            throw error;
        }
    }
);

export const fetchCategories = async () => {
    const response = await axios.get(`${BASE_URL}categories/`, {
        withCredentials: true,
    });
    return response.data;
};

export const fetchLikesCount = async () => {
    const response = await axios.get(`${BASE_URL}article-likes-count/`, {
        withCredentials: true,
    });
    return response.data;
};


export const fetchSellers = createAsyncThunk('seller/fetchSellers', async () => {
    const response = await axios.get(`${BASE_URL}sellers/`, {
        withCredentials: true,
    });
    return response.data;
});

export const fetchCst = createAsyncThunk('seller/fetchCst', async () => {
    const response = await axios.get(`${BASE_URL}customers/`, {
        withCredentials: true,
    });
    return response.data;
});