// services/apiProduct.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import type { Product } from '@/types/Product'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:8080/api`;

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
    // 🟢 SUCCESS: Log the data we received
    // console.groupCollapsed creates a neat folder you can expand
    console.groupCollapsed(`🚀 [API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`)
    console.log('✅ Status:', response.status)
    console.log('📦 Data Received:', response.data)
    console.groupEnd()
    return response
  },
  (error) => {
    // 🔴 ERROR: Log why it failed
    console.groupCollapsed(`❌ [API Error] ${error.config?.url}`)
    console.error('Status:', error.response?.status)
    console.error('Message:', error.message)
    // This shows exactly what you SENT that caused the error
    if (error.config?.data) {
        try {
            console.error('📤 Payload Sent:', JSON.parse(error.config.data))
        } catch (e) {
            console.error('📤 Payload Sent:', error.config.data)
        }
    }
    // This shows exactly what the Backend replied (e.g., validation errors)
    console.error('📥 Server Response:', error.response?.data)
    console.groupEnd()
    return Promise.reject(error)
  }
)

export const productService = {
  // Get all products
  getAllProducts() {
    return api.get('/products')
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

  // Get featured products
  getFeaturedProducts() {
    return api.get('/products/featured')
  },

  // Get active products
  getActiveProducts() {
    return api.get('/products/active')
  }
}

export default api