import axios from "axios";

const API = "http://localhost:3000/api/auth";

export default {
  async login(email: string, password: string) {
    const res = await axios.post(`${API}/login`, { email, password });
    return res.data;
  },

  async register(name: string, email: string, password: string) {
    const res = await axios.post(`${API}/register`, { name, email, password });
    return res.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};
