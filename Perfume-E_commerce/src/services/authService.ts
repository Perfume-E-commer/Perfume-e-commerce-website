import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:8080/api`
const API = `${API_BASE_URL}/auth`

export default {
  async login(email: string, password: string) {
    const res = await axios.post(`${API}/signin`, { email, password })
    return res.data
  },

  async register(firstName: string, lastName: string, email: string, password: string) {
    const res = await axios.post(`${API}/register`, {
      firstName,
      lastName,
      email,
      password,
    })
    return res.data
  },

  async verifyEmail(email: string, code: string) {
    const res = await axios.post(`${API}/verify`, null, {
      params: { email, code },
    })
    return res.data
  },

  async resendCode(email: string) {
    const res = await axios.post(`${API}/resend-verification`, null, {
      params: { email },
    })
    return res.data
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  isAuthenticated() {
    const token = localStorage.getItem('token')
    return !!token
  },
}
