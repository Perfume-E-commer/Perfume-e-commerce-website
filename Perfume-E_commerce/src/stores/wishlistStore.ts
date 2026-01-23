import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useToastStore } from '@/stores/toastStore'
import type { Product } from '@/types/clientProduct'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export interface WishlistItemWrapper {
  product: Product
  selectedSize: string | null
}

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref<WishlistItemWrapper[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const wishlistCount = computed(() => wishlistItems.value.length)

  const fetchWishlist = async () => {
    const authStore = useAuthStore()
    if (!authStore.token) {
      wishlistItems.value = []
      return
    }

    isLoading.value = true
    error.value = null
    try {
      const response = await axios.get(`${API_BASE_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      })
      wishlistItems.value = response.data
    } catch (err: any) {
      console.error('Failed to fetch wishlist:', err)
      error.value = err.response?.data?.message || 'Failed to load wishlist'
    } finally {
      isLoading.value = false
    }
  }

  const addToWishlist = async (payload: { productId: string; size?: string }) => {
    const authStore = useAuthStore()
    const toastStore = useToastStore()

    if (!authStore.token) {
      toastStore.showToast('Please login to add to wishlist', 'error')
      return false
    }

    if (isInWishlist(payload.productId, payload.size)) {
      toastStore.showToast('Item already in wishlist', 'info')
      return false
    }

    isLoading.value = true
    try {
      await axios.post(
        `${API_BASE_URL}/wishlist/add`,
        { productId: payload.productId, size: payload.size },
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )

      await fetchWishlist()
      return true
    } catch (err: any) {
      console.error('Failed to add to wishlist:', err)
      error.value = err.response?.data?.message || 'Failed to add to wishlist'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // CHANGED: Accepts size parameter
  const removeFromWishlist = async (productId: string, size?: string) => {
    const authStore = useAuthStore()
    if (!authStore.token) return false

    isLoading.value = true
    try {
      // Send JSON body to remove specific variant
      await axios.post(
        `${API_BASE_URL}/wishlist/remove`,
        { productId, size },
        { headers: { Authorization: `Bearer ${authStore.token}` } },
      )

      // Optimistic update: Remove from local state
      wishlistItems.value = wishlistItems.value.filter((item) => {
        const p = item.product || (item as any)
        // Keep item if ID doesn't match OR (if ID matches, size doesn't match)
        if (String(p.id) !== String(productId)) return true
        if (size && item.selectedSize !== size) return true
        return false // Remove match
      })

      await fetchWishlist() // Sync to be sure
      return true
    } catch (err: any) {
      console.error('Failed to remove from wishlist:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // CHANGED: Check logic for wrappers
  const isInWishlist = (productId: string, size?: string) => {
    return wishlistItems.value.some((wrapper) => {
      const p = wrapper.product || (wrapper as any)

      // Basic check: Product ID matches
      const idMatch = String(p.id) === String(productId)
      if (!idMatch) return false

      // Strict check: If size provided, it must match.
      // If not provided, we might just return true (product is in list).
      if (size) {
        return wrapper.selectedSize === size
      }
      return true
    })
  }

  const clearWishlist = async () => {
    // You might need a specific endpoint for clear all, or loop remove
    // For now, resetting local state
    wishlistItems.value = []
  }

  async function loadUserWishlist() {
    await fetchWishlist()
  }

  function resetWishlist() {
    wishlistItems.value = []
  }

  return {
    wishlistItems,
    wishlistCount,
    isLoading,
    error,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    loadUserWishlist,
    resetWishlist,
  }
})
