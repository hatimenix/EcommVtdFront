import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error("Axios Error:", error);

    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");

    if (error.response && error.response.status === 401 && refreshToken) {
      try {
        const refreshResponse = await axios.post(
          "http://127.0.0.1:8000/token/customer/refresh/",
          { refresh: refreshToken }
        );

        const newAccessToken = refreshResponse.data.access;
        localStorage.setItem("ACCESS_TOKEN", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Token Refresh Error:", refreshError);
        // Handle refresh error (e.g., redirect to login)
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;


export const linkImage = 'http://127.0.0.1:8000'

