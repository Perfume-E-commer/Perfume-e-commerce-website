import { defineStore } from 'pinia'
import apiClient from '@/services/apiClient'
import { ref, computed } from 'vue'

export interface CartItem {
  productId: string
  productName: string
  imageUrl?: string
  size?: string
  category: string
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  totalPrice: number
  subtotal: number      
  shippingCost: number
}

export interface AddToCartPayload {
  productId: string
  size?: string
  quantity: number
}

export interface UpdateCartQuantityPayload {
  productId: string
  size?: string
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart>({ 
    items: [], 
    totalPrice: 0,
    subtotal: 0,       
    shippingCost: 0
  })
  const isLoading = ref(false)

  const itemCount = computed(() => {
    return cart.value.items.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cart.value.totalPrice
  })

  const findCartItem = (productId: string, size?: string) => {
    return cart.value.items.find(
      (item) => item.productId === productId && (!size || item.size === size),
    )
  }

  async function fetchCart() {
    isLoading.value = true
    try {
      const response = await apiClient.get('/cart')
      cart.value = response.data
    } catch (error) {
      console.error('Failed to fetch cart', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function addToCart(payload: AddToCartPayload) {
    try {
      const response = await apiClient.post('/cart/add', {
        productId: payload.productId,
        size: payload.size,
        quantity: payload.quantity,
      })
      cart.value = response.data
    } catch (error) {
      console.error('Error adding to cart', error)
      throw error
    }
  }

  async function updateQuantity(payload: UpdateCartQuantityPayload) {
    const item = findCartItem(payload.productId, payload.size)
    if (item) {
      item.quantity = payload.quantity
    }

    try {
      const response = await apiClient.put(`/cart/update/${payload.productId}`, {
        quantity: payload.quantity,
        size: payload.size,
      })

      cart.value = response.data
    } catch (error) {
      console.error('Error updating quantity', error)

      await fetchCart()
      throw error
    }
  }

  async function removeFromCart(productId: string, size?: string) {
    const originalCart = { ...cart.value }
    const itemIndex = cart.value.items.findIndex(
      (item) => item.productId === productId && (!size || item.size === size),
    )

    if (itemIndex !== -1) {
      cart.value.items.splice(itemIndex, 1)
      cart.value.totalPrice = cart.value.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      )
    }

    try {
      const url = size
        ? `/cart/remove/${productId}?size=${encodeURIComponent(size)}`
        : `/cart/remove/${productId}`

      const response = await apiClient.delete(url)
      cart.value = response.data
    } catch (error) {
      console.error('Error removing item', error)
      cart.value = originalCart
      throw error
    }
  }

  async function clearCart() {
    isLoading.value = true
    try {
      const response = await apiClient.delete('/cart/clear')
      cart.value = response.data
    } catch (error) {
      console.error('Error clearing cart', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  function resetCart() {
    cart.value = { items: [], totalPrice: 0, subtotal: 0, shippingCost: 0 }
  }

  return {
    cart,
    itemCount,
    totalPrice,
    isLoading,
    findCartItem,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    resetCart,
  }
})
