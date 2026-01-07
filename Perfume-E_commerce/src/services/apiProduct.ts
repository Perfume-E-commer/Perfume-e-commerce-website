// services/apiProduct.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import type { Product } from '../types/adminProduct'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:8080/api`

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

api.interceptors.response.use(
  (response) => {
    console.groupCollapsed(
      `🚀 [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
    )
    console.log('✅ Status:', response.status)
    console.log('📦 Data Received:', response.data)
    console.groupEnd()
    return response
  },
  (error) => {
    console.groupCollapsed(`❌ [API Error] ${error.config?.url}`)
    console.error('Status:', error.response?.status)
    console.error('Message:', error.message)
    if (error.config?.data) {
      try {
        console.error('📤 Payload Sent:', JSON.parse(error.config.data))
      } catch (e) {
        console.error('📤 Payload Sent:', error.config.data)
      }
    }
    console.error('📥 Server Response:', error.response?.data)
    console.groupEnd()
    return Promise.reject(error)
  },
)

export const productService = {
  getAllProducts(params: { page: number; size: number; search: string }) {
    return api.get('/products', {
      params: {
        page: params.page,
        size: params.size,
        search: params.search, 
      },
    })
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

  getFeaturedProducts() {
    return api.get('/products/featured')
  },

  getActiveProducts() {
    return api.get('/products/active')
  },
}

export default api
