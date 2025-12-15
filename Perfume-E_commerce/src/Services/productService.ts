// services/api.js
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import type { Product } from '@/types/adminProduct'

const API_BASE_URL = 'https://rithserver.tail683264.ts.net:8443/api/'

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
  // Get all products
  getAllProducts() {
    return api.get('/products')
  },

  getPaginationProducts(page: number, limit: number) {
    return api.get(`/products?page=${page}&limit=${limit}`)
  },
  // Get product by ID
  getProductById(id: string) {
    return api.get(`/products/${id}`)
  },

  // Create new product
  createProduct(productData: Product) {
    return api.post('/products', productData)
  },

  // Update product
  updateProduct(id: string, productData: Product) {
    return api.put(`/products/${id}`, productData)
  },

  // Delete product
  deleteProduct(id: string) {
    return api.delete(`/products/${id}`)
  },

  // Search products
  searchProducts(query: string) {
    return api.get(`/products/search?q=${query}`)
  },

  // Get products by category
  getProductsByCategory(category: string) {
    return api.get(`/products/category/${category}`)
  },
}

export default api
