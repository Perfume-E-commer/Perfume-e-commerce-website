import { defineStore } from 'pinia'
import apiClient from '@/services/apiClient'
import { ref, computed } from 'vue'

export interface CartItem {
  productId: string
  productName: string
  imageUrl: string
  size: string
  category: string
  variantId: string | number
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  totalPrice: number
}

export interface AddToCartPayload {
  productId: string | number
  variantId: string | number
  quantity: number
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
      const response = await apiClient.get('/cart/fetch')
      cart.value = response.data
    } catch (error) {
      console.error('Failed to fetch cart', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addToCart(payload: AddToCartPayload) {
    try {
      // Pass variantId to the backend
      const response = await apiClient.post('/cart/add', {
        productId: payload.productId, // Include productId for product grouping
        variantId: payload.variantId, // The specific variant being added
        quantity: payload.quantity,
      })
      cart.value = response.data
    } catch (error) {
      console.error('Error adding to cart', error)
      throw error
    }
  }

  async function updateQuantity(productId: string, quantity: number) {
    try {
      const response = await apiClient.put(`/cart/update/${productId}`, { quantity })
      cart.value = response.data
    } catch (error) {
      console.error('Error updating quantity', error)
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
    updateQuantity,
    removeFromCart,
  }
})
