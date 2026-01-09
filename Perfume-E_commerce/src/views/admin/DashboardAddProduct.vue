<template>
  <div class="max-w-7xl mx-auto pb-10 p-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">
          {{ isEditMode ? 'Edit Product' : 'Add New Product' }}
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          {{ isEditMode ? 'Update existing product details' : 'Create a new product listing' }}
        </p>
      </div>
      <div class="flex gap-3 w-full sm:w-auto">
        <button
          @click="router.push('/mainDashboard/products')"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="px-5 py-2.5 rounded-lg bg-indigo-900 text-white hover:bg-indigo-800 font-medium transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto disabled:opacity-50"
        >
          <span v-if="isLoading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          {{ isEditMode ? 'Update Product' : 'Publish Product' }}
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
      <p class="font-medium">Error</p>
      <p class="text-sm">{{ errorMessage }}</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      
      <div class="hidden lg:block w-64 flex-shrink-0 space-y-1">
        <a href="#basic" class="block px-4 py-2 font-medium text-indigo-900 bg-indigo-50 rounded-lg">Basic Info</a>
        <a href="#media" class="block px-4 py-2 font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Media & Gallery</a>
        <a href="#pricing" class="block px-4 py-2 font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Pricing & Stock</a>
        <a href="#attributes" class="block px-4 py-2 font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Story & Notes</a>
      </div>

      <div class="flex-1 space-y-8">
        
        <div id="basic">
          <ProductBasicInfo v-model="formData" />
        </div>

        <div id="media">
          <ProductMedia v-model="formData" />
        </div>

        <div id="pricing">
          <ProductPricing v-model="formData" />
        </div>

        <div id="attributes">
          <ProductAttributes v-model="formData" />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productService from '@/services/productService'

// Component Imports
import ProductBasicInfo from './product/ProductBasicInfo.vue'
import ProductMedia from './product/ProductMedia.vue'
import ProductPricing from './product/ProductPricing.vue'
import ProductAttributes from './product/ProductAttributes.vue'

const route = useRoute()
const router = useRouter()

// State
const isLoading = ref(false)
const errorMessage = ref('')
const isEditMode = ref(false)
const productId = ref('')

// Initialize Empty Data Structure (CRITICAL FIX FOR CRASH)
// We initialize `productStory` and arrays so child components don't read undefined.
const formData = ref({
  // Basic
  name: '',
  brand: '',
  category: '',
  description: '',
  summary: '',
  scent: '', // For "Fragrance Family" summary
  occasion: '',
  
  // Media
  imageUrl: '',
  images: [] as string[],
  
  // Pricing
  price: 0,
  discountedPrice: 0,
  stock: 0,
  minStockLevel: 5,
  taxIncluded: false,
  isOnSale: false,
  isFeatured: false,
  isActive: true,
  
  // Complex Structures
  variants: [] as any[],
  
  scentNotes: [] as any[], // Initialized empty array
  
  productStory: {          // Initialized object (Fixes the reading 'intro' error)
    intro: { title: '', content: '' },
    overture: { title: '', content: '' }
  },
  
  features: [] as any[]
})

// Validation
const validateForm = () => {
  if (!formData.value.name) return 'Product Name is required.'
  if (formData.value.price <= 0) return 'Price must be greater than 0.'
  if (!formData.value.imageUrl) return 'Main Product Image is required.'
  return null
}

// Submit Handler
const handleSubmit = async () => {
  errorMessage.value = ''
  const error = validateForm()
  if (error) {
    errorMessage.value = error
    return
  }

  isLoading.value = true
  try {
    if (isEditMode.value) {
      await productService.updateProduct(productId.value, formData.value)
    } else {
      await productService.createProduct(formData.value)
    }
    router.push('/mainDashboard/products')
  } catch (err: any) {
    console.error(err)
    errorMessage.value = err.response?.data?.message || 'Failed to save product.'
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true
    productId.value = route.params.id as string
    try {
      const res = await productService.getProductById(productId.value)
      const data = res.data

      formData.value = {
        ...formData.value, 
        ...data,          
        productStory: data.productStory || { intro: { title: '', content: '' }, overture: { title: '', content: '' } },
        scentNotes: data.scentNotes || [],
        features: data.features || [],
        images: data.images || [],
        variants: data.variants || []
      }
    } catch (err) {
      errorMessage.value = 'Failed to load product details.'
    }
  }
})
</script>