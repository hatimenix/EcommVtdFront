import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setArticles } from '../store/slices/articlesSlice';
import axiosClient from '../axios-client';

const BASE_URL = 'http://127.0.0.1:8000/';

export const fetchArticlesByCategory = createAsyncThunk(
    'articles/fetchByCategory',
    async (categoryId, thunkAPI) => {
        try {
            const response = await axiosClient.get(`articles/category/${categoryId}/`, {
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
    const response = await axiosClient.get(`articles/`, {
        withCredentials: true,
    });
    return response.data;
};

export const fetchBoosts = async () => {
    const response = await axios.get(`${BASE_URL}boosts/`, {
        withCredentials: true,
    });
    return response.data;
};

export const fetchArticlesRec = async () => {
    const response = await axiosClient.get(`tracked-articles/`, {
        withCredentials: true,
    });
    return response.data;
};

export const fetchArticleById = createAsyncThunk(
    'article/fetchById',
    async (articleId, thunkAPI) => {
        try {
            const response = await axiosClient.get(`articles/${articleId}/`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            // Handle errors here
            throw error;
        }
    }
);

// export const fetchBoosts = createAsyncThunk(
//   'boosts/fetchBoosts',
//   async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}boosts/`, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching boosts:', error);
//       throw error;
//     }
//   }
// );

export const fetchArticlesdetails = async (id_art) => {
    const response = await axiosClient.get(`articles/${id_art}/`, {
        withCredentials: true,
    });
    return response.data;
};


export const fetchReplies = async () => {
    try {
        const response = await axiosClient.get(`replies/`, {
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
    const response = await axiosClient.get(`reviews/`, {
        withCredentials: true,
    });
    return response.data;
};


export const fetchProperties = async () => {
    try {
        const response = await axiosClient.get(`properties/`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
};



export const fetchCategories = async () => {
    const response = await axiosClient.get(`categories/`, {
        withCredentials: true,
    });
    return response.data;
};

export const fetchLikesCount = async () => {
    const response = await axiosClient.get(`article-likes-count/`, {
        withCredentials: true,
    });
    return response.data;
};


export const fetchSellers = createAsyncThunk('seller/fetchSellers', async () => {
    const response = await axiosClient.get(`sellers/`, {
        withCredentials: true,
    });
    return response.data;
});

export const fetchCst = createAsyncThunk('seller/fetchCst', async () => {
    const response = await axiosClient.get(`customers/`, {
        withCredentials: true,
    });
    return response.data;
});


//recuperation du panier
export const fetchPanier = async (id_user) => {
    const response = await axiosClient.get(`panier/?search=${id_user}`, {
        withCredentials: true,
    });
    return response.data;
};



//recuperation du favoris
export const fetchFavori = async (id_user) => {
    const response = await axiosClient.get(`favoris/?search=${id_user}`, {
        withCredentials: true,
    });
    console.log("le panier: ", response.data);
    return response.data;
};


// get user
export const fetchUser = async () => {
    const response = await axiosClient.get('/auth/user/');
    return response.data;
};


export const fetchPackages = async () => {
    const response = await axios.get(`${BASE_URL}reduction/`, {
        withCredentials: true,
    });
    return response.data;
};

