// assign for admin plate form
export interface Product {
  id?: string
  name: string
  brand: string
  category: string
  description?: string
  scent?: string
  occasion?: string
  gender?: string
  summary?: string
  baseSize?: string
  price: number
  discountedPrice?: number
  stock: number
  orders?: number
  images?: string[]
  averageRating?: number
  totalReviews?: number
  ratings?: Rating[]
  variants?: ProductVariant[]
  productStory?: ProductStory
  features?: ProductFeature[]
  scentNotes?: ScentNote[]
  minStockLevel?: number
  isActive?: boolean
  isFeatured?: boolean
  isOnSale?: boolean
  createdAt?: string
  createdDate?: string
}

export interface Rating {
  userId?: string
  userName: string
  rating: number
  review?: string
  createdAt: string
  verified?: boolean
}

export interface ProductStorySection {
  title: string
  content: string
}

export interface ProductFilter {
  search?: string
  category?: string
  gender?: string
  outOfStock?: boolean
  page: number
  size: number
}

export interface ProductPage {
  content: Product[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export interface ProductVariant {
  size: string
  volume?: string
  price: number
  stock: number
  imageUrl?: string
  minStock?: number
}

export interface ProductStory {
  intro: ProductStorySection
  overture: ProductStorySection
}

export interface ProductFeature {
  name: string
  description: string
}

export interface ScentNote {
  type: 'TOP' | 'MIDDLE' | 'BASE'
  notes: string[]
}
