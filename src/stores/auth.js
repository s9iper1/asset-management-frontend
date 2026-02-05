import { defineStore } from "pinia";
import api from "@/api/client";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    access: localStorage.getItem("access_token") || "",
    refresh: localStorage.getItem("refresh_token") || "",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "tesing",
    initialized: false, // <-- to avoid duplicate fetches
  }),

  getters: {
    getLoginUserInfo: (state) => state.user,
  },

  actions: {
    async login(email, password) {
      const { data } = await api.post("/api/auth/token/", { email, password });
      this.access = data.access;
      this.refresh = data.refresh;
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      await this.fetchUser();
    },
    async fetchUser() {
      try {
        const { data } = await api.get("/api/auth/profile/");
        this.user = data;
        localStorage.setItem("user", JSON.stringify(data));
      } catch (err) {
        console.error("Failed to fetch user", err);
        this.logout();
      }
    },
    async init() {
      if (this.access && !this.user && !this.initialized) {
        await this.fetchUser();
      }
      this.initialized = true;
    },
    logout() {
      this.access = "";
      this.refresh = "";
      this.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
    isAuthenticated() {
      return !!this.access;
    },
  },
});
