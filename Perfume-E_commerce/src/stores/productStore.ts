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
  }),

  getters: {
    getAllProduct: (state) => state.products,
  },

  actions: {},
})
