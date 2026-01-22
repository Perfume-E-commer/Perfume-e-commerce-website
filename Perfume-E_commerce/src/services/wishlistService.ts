import apiClient from './apiClient'

export interface WishlistProduct {
  id: string
  name: string
  brand: string
  description: string
  price: number
  discountedPrice?: number
  category: string
  imageUrl: string
  images: string[]
  stock: number
  averageRating: number
  totalReviews: number
  variants: Array<{
    id: string
    size: string
    imageUrl: string
    price: number
    stock: number
  }>
}

const wishlistService = {
  getWishlist() {
    return apiClient.get<WishlistProduct[]>('/wishlist')
  },

  addToWishlist(productId: string) {
    return apiClient.post<string[]>(`/wishlist/${productId}`)
  },

  removeFromWishlist(productId: string) {
    return apiClient.delete<string[]>(`/wishlist/${productId}`)
  },
}

export default wishlistService
