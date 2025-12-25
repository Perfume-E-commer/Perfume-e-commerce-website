<template>
  <div class="max-w-7xl mx-auto pb-10">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">
          {{ isEditMode ? 'Edit Product' : 'Add New Product' }}
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          {{ isEditMode ? 'Update existing product details' : 'Create a new product listing' }}
        </p>
      </div>
      <div class="flex gap-3">
        <button
          @click="$router.push('/mainDashboard/products')"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm hover:shadow"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="px-5 py-2.5 rounded-lg bg-[#280559] text-white hover:bg-[#280559]/90 font-medium transition-colors flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            v-if="isLoading"
            class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
          ></span>
          {{ isEditMode ? 'Update Product' : 'Publish Product' }}
        </button>
      </div>
    </div>

    <div
      v-if="errorMessage"
      class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3"
    >
      <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="text-sm font-medium">{{ errorMessage }}</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <!-- Basic Information Component -->
        <ProductBasicInfo v-model="formData" :brands="brands" />

        <!-- Pricing & Inventory Component -->
        <ProductPricing v-model="formData" />
      </div>

      <div class="space-y-8">
        <!-- Media Component -->
        <ProductMedia v-model="formData" />

        <!-- Attributes Component -->
        <ProductAttributes v-model="formData" :scents="scents" :occasions="occasions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { productService } from '@/services/apiProduct'
import type { Product } from '../../types/adminProduct'
import ProductBasicInfo from './product/ProductBasicInfo.vue'
import ProductPricing from './product/ProductPricing.vue'
import ProductAttributes from './product/ProductAttributes.vue'
import ProductMedia from './product/ProductMedia.vue'

const router = useRouter()
const route = useRoute()

const isLoading = ref(false)
const errorMessage = ref('')
const isEditMode = ref(false)
const productId = ref<string | null>(null)

// Hardcoded Lists
const brands = ['Chanel', 'Dior', 'Gucci', 'Versace', 'Yves Saint Laurent', 'Tom Ford', 'Hermes']
const scents = ['Floral', 'Woody', 'Fresh', 'Oriental', 'Citrus', 'Spicy']
const occasions = ['Casual', 'Formal', 'Evening', 'Daily Wear', 'Party']

// Initialize form data according to backend model
const formData = ref<Product>({
  name: '',
  brand: '',
  category: '',
  description: '',
  summary: '',
  scent: '',
  occasion: '',
  price: 0,
  discountedPrice: 0,
  stock: 0,
  orders: 0,
  imageUrl: '',
  images: [],
  variants: [],
  isActive: true,
  isFeatured: false,
  isOnSale: false,
  taxIncluded: false,
  averageRating: 0,
  totalReviews: 0,
  ratings: [],
  features: [],
  scentNotes: [],
  minStockLevel: 5,
  createdAt: new Date(),
})

const handleSubmit = async () => {
  errorMessage.value = ''

  // Validation
  if (
    !formData.value.name ||
    !formData.value.price ||
    !formData.value.brand ||
    !formData.value.category
  ) {
    errorMessage.value = 'Please fill in required fields: Name, Price, Brand, and Category.'
    return
  }

  // Validate price
  if (formData.value.price <= 0) {
    errorMessage.value = 'Price must be greater than 0.'
    return
  }

  // Validate main image
  if (!formData.value.imageUrl) {
    errorMessage.value = 'Main cover image is required.'
    return
  }

  isLoading.value = true
  try {
    if (isEditMode.value && productId.value) {
      await productService.updateProduct(productId.value, formData.value)
    } else {
      await productService.createProduct(formData.value)
    }
    router.push('/mainDashboard/products')
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || 'Failed to save product.'
  } finally {
    isLoading.value = false
  }
}

// Load Data on Mount
onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true
    productId.value = route.params.id as string
    try {
      const res = await productService.getProductById(productId.value)
      // Map backend response to frontend form
      formData.value = {
        ...res.data,
        // Ensure arrays are initialized
        variants: res.data.variants || [],
        images: res.data.images || [],
        features: res.data.features || [],
        scentNotes:
          res.data.scentNotes?.map((note: any) => ({
            type: note.type,
            notes: note.notes || [],
            imageUrl: note.imageUrl || '',
          })) || [],
        ratings: res.data.ratings || [],
      }
    } catch (e) {
      errorMessage.value = 'Failed to load product details.'
    }
  }
})
</script>
