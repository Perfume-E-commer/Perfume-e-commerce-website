import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import type { Product } from '@/types/adminProduct'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

export const productService = {
  getAllProducts() {
    return api.get('/products')
  },

  getPaginationProducts(page: number, limit: number) {
    return api.get(`/products?page=${page}&limit=${limit}`)
  },

  getProductById(id: string) {
    return api.get(`/products/${id}`)
  },

  createProduct(productData: Product) {
    return api.post('/products', productData)
  },

  updateProduct(id: string, productData: Product) {
    return api.put(`/products/${id}`, productData)
  },

  deleteProduct(id: string) {
    return api.delete(`/products/${id}`)
  },

  searchProducts(query: string) {
    return api.get(`/products/search?q=${query}`)
  },

  getProductsByCategory(category: string) {
    return api.get(`/products/category/${category}`)
  },

  submitProductReview(productId: string, reviewData: { stars: number; comment: string }) {
    return api.post(`/products/${productId}/ratings`, reviewData)
  },

  getProductReviews(productId: string) {
    return api.get(`/products/${productId}/reviews`)
  },

  getFilterProducts(filters: Record<string, any>) {
    const queryParams = new URLSearchParams(filters).toString()
    return api.get(`/products/filter?${queryParams}`)
  },
}
