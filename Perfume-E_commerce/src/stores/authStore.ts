import { defineStore } from "pinia";
import authService from "@/services/authService";
import router from "@/router";

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
        const data = await authService.login(email, password);

        this.token = data.token;
        this.user = { email: data.email, role: data.role }; 

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(this.user));

        if (data.role === 'ADMIN') {
            router.push('/admindashboard');
        } else {
            router.push('/');
        }
        
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Login failed";
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(firstName: string, lastName: string, email: string, password: string) {
      this.loading = true;
      this.error = "";

      try {
        await authService.register(firstName, lastName, email, password);
        router.push('/login'); 
        return true;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Registration failed";
        return false;
      } finally {
        this.loading = false;
      }
    },

    async verify(email: string, code: string) {
      this.loading = true;
      this.error = "";
      try {
        await authService.verifyEmail(email, code);
        return true;
      } catch (err: any) {
        this.error = err.response?.data || "Verification failed";
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async resend(email: string) {
        try {
            await authService.resendCode(email);
            return true;
        } catch (err: any) {
            this.error = "Failed to resend code";
            return false;
        }
    },

    logout() {
      this.user = null;
      this.token = "";
      authService.logout();
      router.push('/login');
    }
  }
});
