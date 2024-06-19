import { defineStore } from "pinia";
import axiosInstance from "../axios/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async login(email, password) {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      const user = await response.data;
      this.user = user;
      localStorage.setItem("token", user.token);
      localStorage.setItem("role_id", user.role_id);
    },

    initUser() {
      const token = localStorage.getItem("token");
      const role_id = localStorage.getItem("role_id");
      if (token) {
        this.user = {
          token,
          role_id,
        };
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role_id");
    },
  },
});
