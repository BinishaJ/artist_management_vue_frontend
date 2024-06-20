import axios from "axios";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

const setupInterceptors = () => {
  const userStore = useUserStore();
  const router = useRouter();

  axiosInstance.interceptors.request.use((config) => {
    const token = userStore.user?.token;
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
      if (error.response && error.response.status === 403) {
        router.push({ path: "/logout" });
      }
      return Promise.reject(error);
    }
  );
};

export { axiosInstance, setupInterceptors };
