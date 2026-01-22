import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types/clientProduct'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category?: string
  size?: string
  description?: string
  addedAt: number
}

export interface AddToWishlistPayload {
  id: string
  name: string
  price: number
  image: string
  category?: string
  size?: string
  description?: string
}

// Helper to get the current user's email for storage key
const getCurrentUserKey = (): string => {
  const userStr = localStorage.getItem('user')
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      return user.email || 'guest'
    } catch {
      return 'guest'
    }
  }
  return 'guest'
}

// Helper to get storage key for current user
const getStorageKey = (): string => {
  return `wishlist_${getCurrentUserKey()}`
}

export const useWishlistStore = defineStore('wishlist', () => {
  const getInitialWishlist = (): WishlistItem[] => {
    const saved = localStorage.getItem(getStorageKey())
    return saved ? JSON.parse(saved) : []
  }

  const wishlistItems = ref<WishlistItem[]>(getInitialWishlist())

  const wishlistCount = computed(() => wishlistItems.value.length)

  const isInWishlist = (productId: string) => {
    return wishlistItems.value.some((item) => item.id === productId)
  }

  const addToWishlist = (product: AddToWishlistPayload) => {
    if (!isInWishlist(product.id)) {
      const newItem: WishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: product.size,
        description: product.description,
        addedAt: Date.now(),
      }
      wishlistItems.value.push(newItem)
      localStorage.setItem(getStorageKey(), JSON.stringify(wishlistItems.value))
      return true
    }
    return false
  }

  const removeFromWishlist = (productId: string) => {
    const index = wishlistItems.value.findIndex((item) => item.id === productId)
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
      localStorage.setItem(getStorageKey(), JSON.stringify(wishlistItems.value))
      return true
    }
    return false
  }

  const toggleWishlist = (product: AddToWishlistPayload) => {
    if (isInWishlist(product.id)) {
      return removeFromWishlist(product.id)
    } else {
      return addToWishlist(product)
    }
  }

  const clearWishlist = () => {
    wishlistItems.value = []
    localStorage.setItem(getStorageKey(), JSON.stringify(wishlistItems.value))
  }

  // Load wishlist for current user (call this after login)
  const loadUserWishlist = () => {
    const saved = localStorage.getItem(getStorageKey())
    wishlistItems.value = saved ? JSON.parse(saved) : []
  }

  // Clear wishlist from memory (call this on logout, doesn't delete from storage)
  const resetWishlist = () => {
    wishlistItems.value = []
  }

  return {
    wishlistItems,
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    loadUserWishlist,
    resetWishlist,
  }
})
