import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WishlistProduct } from '@/Services/wishlistService'
import wishlistService from '@/Services/wishlistService'

export interface WishlistItem {
  id: string
  name: string
  brand: string
  price: number
  discountedPrice?: number
  image: string
  category?: string
  description?: string
  stock: number
  averageRating: number
  variants: Array<{
    id: string
    size: string
    imageUrl: string
    price: number
    stock: number
  }>
}

export interface AddToWishlistPayload {
  id: string
  name?: string
  price?: number
  image?: string
  category?: string
  size?: string
  description?: string
}

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlistItems = ref<WishlistItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const wishlistCount = computed(() => wishlistItems.value.length)

  const isInWishlist = (productId: string) => {
    return wishlistItems.value.some((item) => item.id === productId)
  }

  // Map API response to WishlistItem
  const mapProductToWishlistItem = (product: WishlistProduct): WishlistItem => {
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.discountedPrice || product.price,
      discountedPrice: product.discountedPrice,
      image: product.imageUrl || (product.images && product.images[0]) || '',
      category: product.category,
      description: product.description,
      stock: product.stock,
      averageRating: product.averageRating,
      variants: product.variants || [],
    }
  }

  // Fetch wishlist from API
  const fetchWishlist = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await wishlistService.getWishlist()
      wishlistItems.value = response.data.map(mapProductToWishlistItem)
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch wishlist'
      console.error('Error fetching wishlist:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Add to wishlist via API
  const addToWishlist = async (product: AddToWishlistPayload) => {
    if (isInWishlist(product.id)) {
      return false
    }

    isLoading.value = true
    error.value = null
    try {
      await wishlistService.addToWishlist(product.id)
      // Refetch to get the full product data
      await fetchWishlist()
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to add to wishlist'
      console.error('Error adding to wishlist:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Remove from wishlist via API
  const removeFromWishlist = async (productId: string) => {
    isLoading.value = true
    error.value = null
    try {
      await wishlistService.removeFromWishlist(productId)
      wishlistItems.value = wishlistItems.value.filter((item) => item.id !== productId)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to remove from wishlist'
      console.error('Error removing from wishlist:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Toggle wishlist status
  const toggleWishlist = async (product: AddToWishlistPayload) => {
    if (isInWishlist(product.id)) {
      return await removeFromWishlist(product.id)
    } else {
      return await addToWishlist(product)
    }
  }

  // Clear wishlist (remove all items)
  const clearWishlist = async () => {
    isLoading.value = true
    error.value = null
    try {
      // Remove all items one by one
      const removePromises = wishlistItems.value.map((item) =>
        wishlistService.removeFromWishlist(item.id),
      )
      await Promise.all(removePromises)
      wishlistItems.value = []
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to clear wishlist'
      console.error('Error clearing wishlist:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Load wishlist for current user (call this after login)
  const loadUserWishlist = async () => {
    await fetchWishlist()
  }

  // Clear wishlist from memory (call this on logout)
  const resetWishlist = () => {
    wishlistItems.value = []
    error.value = null
  }

  return {
    wishlistItems,
    wishlistCount,
    isLoading,
    error,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    loadUserWishlist,
    resetWishlist,
    fetchWishlist,
  }
})
