import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setArticles } from '../store/slices/articlesSlice';

const BASE_URL = 'http://127.0.0.1:8000/';

export const fetchArticlesByCategory = createAsyncThunk(
    'articles/fetchByCategory',
    async (categoryId, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}articles/category/${categoryId}/`, {
                withCredentials: true,
            });
            console.log("response", response.data);
            setArticles(response.data)
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

export const fetchArticlesRec = async () => {
    const response = await axios.get(`${BASE_URL}tracked-articles/`, {
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

export const fetchBoosts = createAsyncThunk(
  'boosts/fetchBoosts',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}boosts/`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching boosts:', error);
      throw error;
    }
  }
);

export const fetchArticlesdetails = async (id_art) => {
    const response = await axios.get(`${BASE_URL}articles/${id_art}/`, {
        withCredentials: true,
    });
    return response.data;
};


export const fetchReplies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}replies/`, {
            withCredentials: true, // If you need credentials
        });
        return response.data;
    } catch (error) {
        // Handle any errors here
        console.error('Error fetching replies:', error);
        throw error; // Optionally re-throw the error to handle it elsewhere
    }
};

export const fetchReviews = async () => {
    const response = await axios.get(`${BASE_URL}reviews/`, {
        withCredentials: true,
    });
    return response.data;
};


export const fetchProperties = async () => {
    try {
        const response = await axios.get(`${BASE_URL}properties/`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
};



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


//recuperation du panier
export const fetchPanier = async (id_user) => {
    const response = await axios.get(`${BASE_URL}panier/?search=${id_user}`, {
        withCredentials: true,
    });
    // console.log("le panier: ", response.data);
    return response.data;
};