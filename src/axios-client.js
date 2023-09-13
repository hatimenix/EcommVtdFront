import axios from "axios";

export const linkImage = 'https://api.el-bal.ma'

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
    const { response } = error;

    if (
      response &&
      response.status === 401 &&
      response.data.code === "token_not_valid"
    ) {
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");
      if (!refreshToken) {
        // redirect to login page or show error message
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/api/token/refresh/",
          { refresh: refreshToken }
        );
        const accessToken = response.data.access;
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(error.config);
      } catch (err) {
        // redirect to login page or show error message
        return Promise.reject(error);
      }
    }

    throw error;
  }
);

export default axiosClient;

// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://127.0.0.1:8000/",
// });

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("ACCESS_TOKEN");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.error("Axios Error:", error);

//     const originalRequest = error.config;
//     const refreshToken = localStorage.getItem("REFRESH_TOKEN");

//     if (error.response && error.response.status === 401 && refreshToken) {
//       try {
//         const refreshResponse = await axios.post(
//           "http://127.0.0.1:8000/token/customer/refresh/",
//           { refresh: refreshToken }
//         );

//         const newAccessToken = refreshResponse.data.access;
//         localStorage.setItem("ACCESS_TOKEN", newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosClient(originalRequest);
//       } catch (refreshError) {
//         console.error("Token Refresh Error:", refreshError);
//         // Handle refresh error (e.g., redirect to login)
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;



