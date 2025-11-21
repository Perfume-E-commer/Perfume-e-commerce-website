import { defineStore } from "pinia";
import AuthService from "@/Services/authService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token") || "",
    loading: false,
    error: ""
  }),

  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = "";

      try {
        const data = await AuthService.login(email, password);

        this.token = data.token;
        this.user = data.user;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Login failed";
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(name: string, email: string, password: string) {
      this.loading = true;
      this.error = "";

      try {
        await AuthService.register(name, email, password);
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Registration failed";
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = "";
      AuthService.logout();
    }
  }
});
