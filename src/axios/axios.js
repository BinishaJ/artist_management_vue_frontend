import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNywiZXhwIjoxNzE4Nzc2OTUwfQ.tNhK2_ufhSgWIUCdE0sFxpaxjspHjf52R1BKOdOiArI";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    // if (error.response && error.response.status === 403) {
    //   window.location.href = "/logout";
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
