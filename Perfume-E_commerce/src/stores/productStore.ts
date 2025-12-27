import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductPage } from '@/types/clientProduct'
import { productService } from '../services/apiProduct'

// Transform backend product data to frontend Product type
function transformBackendProduct(backendData: any): Product {
  return {
    id: backendData.id,
    name: backendData.name,
    price: backendData.price,
    image: backendData.imageUrl, // Map imageUrl to image
    descriptions: backendData.description, // Map description to descriptions
    variants: (backendData.variants || []).map((v: any) => ({
      id: v.id || v.size, // Fallback to size if id doesn't exist
      size: v.size,
      imageUrl: v.imageUrl,
      price: v.price,
      stock: v.stock,
    })),
    productStorys: {
      intro: backendData.productStory?.intro || { title: '', content: '' },
      overture: backendData.productStory?.overture || { title: '', content: '' },
      keyNotes: [], // Backend doesn't have keyNotes separately
      features: backendData.features || [],
      scentNotes: (backendData.scentNotes || []).map((note: any) => ({
        type: note.type,
        scent: note.scent,
        image: note.imageUrl, // Map imageUrl to image
      })),
    },
  }
}

export const useProductStore = defineStore('product', () => {
  // Product State
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)

  // Pagination State
  const pagination = ref({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    last: false,
  })

  // UI State
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasProducts = computed(() => products.value.length > 0)
  const totalProducts = computed(() => pagination.value.totalElements)

  async function fetchAllProducts() {
    loading.value = true
    error.value = null

    try {
      const response = await productService.getAllProducts()
      products.value = response.data.map(transformBackendProduct)
    } catch (err: any) {
      console.error('Error fetching products:', err)
      error.value = err.response?.data?.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchProducts(page: number = 0, size: number = 16) {
    loading.value = true
    error.value = null

    try {
      const response = await productService.getPaginationProducts(page, size)
      const data: ProductPage = response.data

      // Transform backend products to match frontend type
      products.value = data.content.map(transformBackendProduct)
      pagination.value = {
        page: data.number,
        size: data.size,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        last: data.last,
      }
    } catch (err: any) {
      console.error('Error fetching products:', err)
      error.value = err.response?.data?.message || 'Failed to fetch products'
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id: string) {
    loading.value = true
    error.value = null
    currentProduct.value = null // Reset current view

    try {
      const response = await productService.getProductById(id)
      const backendData = response.data

      // Transform backend data to match frontend Product type
      currentProduct.value = transformBackendProduct(backendData)
    } catch (err: any) {
      error.value = 'Failed to load product details'
    } finally {
      loading.value = false
    }
  }

  async function searchProducts(query: string) {
    loading.value = true
    try {
      const response = await productService.searchProducts(query)
      products.value = response.data
    } catch (err: any) {
      error.value = 'Search failed'
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    products,
    currentProduct,
    pagination,
    loading,
    error,

    // Getters
    hasProducts,
    totalProducts,

    // Actions
    fetchAllProducts,
    fetchProducts,
    fetchProductById,
    searchProducts,
  }
})
