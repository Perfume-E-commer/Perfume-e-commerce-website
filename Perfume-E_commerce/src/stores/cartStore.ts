import { defineStore } from 'pinia'
import apiClient from '@/services/apiClient'
import { ref, computed } from 'vue'

export interface CartItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  totalPrice: number
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart>({ items: [], totalPrice: 0 })
  const isLoading = ref(false)

  const itemCount = computed(() => {
    return cart.value.items.reduce((total, item) => total + item.quantity, 0)
  })

  async function fetchCart() {
    isLoading.value = true
    try {
      const response = await apiClient.get('/cart')
      cart.value = response.data
    } catch (error) {
      console.error('Failed to fetch cart', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addToCart(productId: string, quantity: number = 1) {
    try {
      const response = await apiClient.post('/cart/add', { productId, quantity })
      cart.value = response.data
    } catch (error) {
      console.error('Error adding to cart', error)
      throw error
    }
  }

  async function removeFromCart(productId: string) {
    try {
      const response = await apiClient.delete(`/cart/remove/${productId}`)
      cart.value = response.data
    } catch (error) {
      console.error('Error removing item', error)
    }
  }

  return { 
    cart, 
    itemCount, 
    isLoading, 
    fetchCart, 
    addToCart, 
    removeFromCart 
  }
})