export interface StorySection {
  title: string
  content: string
}

export interface KeyNote {
  id: number
  type: string
  scent: string
  image: string
}

export interface ScentNote {
  type: string
  scent: string
  image: string
}

export interface ProductVariant {
  id: number | string
  size: string
  imageUrl: string
  price: number
  stock: number
}

export interface Product {
  id?: string | number 
  name: string
  price: number
  image: string
  descriptions: string
  variants: ProductVariant[]
  RatingReviews?: RatingReview[]
  averageRating?: number
  totalReviews?: number
  brand?: string
  category?: string
  scent?: string | null
  occasion?: string | null
  productStorys: {
    intro: StorySection
    overture: StorySection
    keyNotes: KeyNote[]
    features: StorySection[]
    scentNotes: ScentNote[]
  }
}

export interface RatingReview {
  userId: string
  userName: string
  stars: number
  comment: string
}

export interface ProductPage {
  content: Product[]
  totalElements: number
  totalPages: number
  last: boolean
  size: number
  number: number
}

export interface ProductFilter {
  page: number
  size: number
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
}
