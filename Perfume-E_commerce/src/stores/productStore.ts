import { defineStore } from 'pinia'
import axios from 'axios'
import type { Product, ProductFilter, ProductPage } from '@/types/Product'

const API_URL = '/api/products'
import axios from 'axios'
import { defineStore } from 'pinia'

interface StorySection {
  title: string
  content: string
}

interface KeyNote {
  id: number
  type: string
  scent: string
  image: string
}

export interface Product {
  title: string
  price: number
  image: string
  description: string
  variants: any[]
  productStory: {
    intro: StorySection
    overture: StorySection
    keyNotes: KeyNote[]
    features: StorySection[]
  }
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    currentProduct: null as Product | null,
    filter: {
      page: 0,
      size: 10,
    } as ProductFilter,
    pageData: null as ProductPage | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(API_URL)
        this.products = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },

    async fetchFilteredProducts(filter: ProductFilter) {
      this.loading = true
      this.error = null
      this.filter = filter
      try {
        const params = new URLSearchParams()
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            params.append(key, value.toString())
          }
        })

        const response = await axios.get(`${API_URL}/filter?${params}`)
        this.pageData = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id: string) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_URL}/${id}`)
        this.currentProduct = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to fetch product'
      } finally {
        this.loading = false
      }
    },

    async createProduct(product: Product) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(API_URL, product)
        this.products.push(response.data)
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to create product'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id: string, product: Product) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.put(`${API_URL}/${id}`, product)
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.products[index] = response.data
        }
        if (this.currentProduct?.id === id) {
          this.currentProduct = response.data
        }
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to update product'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id: string) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`${API_URL}/${id}`)
        this.products = this.products.filter((p) => p.id !== id)
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to delete product'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearCurrentProduct() {
      this.currentProduct = null
    },
  },

  getters: {
    totalProducts: (state) => state.pageData?.totalElements || state.products.length,
    getProductById: (state) => (id: string) => {
      return state.products.find((product) => product.id === id)
    },
    featuredProducts: (state) => state.products.filter((p) => p.isFeatured),
    onSaleProducts: (state) => state.products.filter((p) => p.isOnSale),
    outOfStockProducts: (state) => state.products.filter((p) => p.stock <= 0),
  },
  }),

  getters: {
    getAllProduct: (state) => state.products,
  },

  actions: {},
})
