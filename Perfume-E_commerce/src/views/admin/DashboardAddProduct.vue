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
          @click="router.push('/admin/products')"
          class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors shadow-sm w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="px-5 py-2.5 rounded-lg bg-indigo-900 text-white hover:bg-indigo-800 font-medium transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto disabled:opacity-50"
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
      class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg"
    >
      <p class="font-medium">Error</p>
      <p class="text-sm">{{ errorMessage }}</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <div class="hidden lg:block w-64 flex-shrink-0 space-y-1 sticky top-20 self-start">
        <a
          @click.prevent="scrollToSection('basic')"
          href="#basic"
          class="group flex items-center gap-3 px-4 py-2.5 rounded-lg border-l-4 transition-all duration-200"
          :class="
            activeSection === 'basic'
              ? 'block px-4 py-2 font-medium text-indigo-900 bg-indigo-50 rounded-lg border-indigo-600 shadow-sm'
              : 'block px-4 py-2 font-medium text-gray-600 border-transparent hover:bg-gray-50 rounded-lg'
          "
          >Basic Info</a
        >
        <a
          @click.prevent="scrollToSection('media')"
          href="#media"
          class="group flex items-center gap-3 px-4 py-2.5 rounded-lg border-l-4 transition-all duration-200"
          :class="
            activeSection === 'media'
              ? 'block px-4 py-2 font-medium text-indigo-900 bg-indigo-50 rounded-lg border-indigo-600 shadow-sm'
              : 'block px-4 py-2 font-medium text-gray-600 border-transparent hover:bg-gray-50 rounded-lg'
          "
          >Media & Gallery</a
        >
        <a
          @click.prevent="scrollToSection('pricing')"
          href="#pricing"
          class="group flex items-center gap-3 px-4 py-2.5 rounded-lg border-l-4 transition-all duration-200"
          :class="
            activeSection === 'pricing'
              ? 'block px-4 py-2 font-medium text-indigo-900 bg-indigo-50 rounded-lg border-indigo-600 shadow-sm'
              : 'block px-4 py-2 font-medium text-gray-600 border-transparent hover:bg-gray-50 rounded-lg'
          "
          >Pricing & Stock</a
        >
        <a
          @click.prevent="scrollToSection('attributes')"
          href="#attributes"
          class="group flex items-center gap-3 px-4 py-2.5 rounded-lg border-l-4 transition-all duration-200"
          :class="
            activeSection === 'attributes'
              ? 'block px-4 py-2 font-medium text-indigo-900 bg-indigo-50 rounded-lg border-indigo-600 shadow-sm'
              : 'block px-4 py-2 font-medium text-gray-600 border-transparent hover:bg-gray-50 rounded-lg'
          "
          >Story & Notes</a
        >
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
import productService from '../../services/productService'
import ProductBasicInfo from '../../components/admin/product/ProductBasicInfo.vue'
import ProductMedia from '../../components/admin/product/ProductMedia.vue'
import ProductPricing from '../../components/admin/product/ProductPricing.vue'
import ProductAttributes from '../../components/admin/product/ProductAttributes.vue'

const route = useRoute()
const router = useRouter()

const isLoading = ref(false)
const errorMessage = ref('')
const isEditMode = ref(false)
const productId = ref('')

const formData = ref<any>({
  name: '',
  brand: '',
  category: '',
  description: '',
  summary: '',
  scent: '',
  occasion: '',
  images: [] as string[],
  price: 0,
  discountedPrice: 0,
  stock: 0,
  minStockLevel: 5,
  isActive: true,
  variants: [] as any[],
  scentNotes: [] as any[],
  productStory: {
    intro: { title: '', content: '' },
    overture: { title: '', content: '' },
  },

  features: [] as any[],
})

// Track which section is active and provide a smooth scroll helper
const activeSection = ref<string>('basic')

const scrollToSection = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeSection.value = id
    try {
      history.replaceState(null, '', `#${id}`)
    } catch (e) {
      /* ignore */
    }
  }
}

// const activeSection = ref('basic')
window.addEventListener('scroll', () => {
  const sections = ['basic', 'media', 'pricing', 'attributes']

  for (const id of sections) {
    const el = document.getElementById(id)
    if (!el) continue

    const rect = el.getBoundingClientRect()
    if (rect.top <= 120 && rect.bottom >= 120) {
      activeSection.value = id
      break
    }
  }
})

const validateForm = () => {
  if (!formData.value.name) return 'Product Name is required.'
  if (formData.value.price <= 0) return 'Price must be greater than 0.'
  if (!formData.value.imageUrl && !formData.value.variants?.[0]?.imageUrl) {
    return 'Main Product Image is required.'
  }
  return null
}

const handleSubmit = async () => {
  errorMessage.value = ''
  const error = validateForm()
  if (error) {
    errorMessage.value = error
    return
  }

  isLoading.value = true
  try {
    const payload = {
      ...formData.value,
      
      active: formData.value.isActive,

      productStory: formData.value.productStory,

      features: (formData.value.features || []).filter(
        (f: any) => f.title?.trim() !== '' || f.content?.trim() !== ''
      ),

      scentNotes: (formData.value.scentNotes || []).filter(
        (n: any) => n.scent?.trim() !== '' || n.type?.trim() !== ''
      )
    }

    if (isEditMode.value) {
      await productService.updateProduct(productId.value, payload)
    } else {
      await productService.createProduct(payload)
    }
    router.push('/admin/products')
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
        isActive: data.active !== undefined ? data.active : true,
        productStory: data.productStory || {
          intro: { title: '', content: '' },
          overture: { title: '', content: '' },
        },
        scentNotes: data.scentNotes || [],
        features: data.features || [],
        images: data.images || [],
        variants: data.variants || [],
      }
    } catch (err) {
      errorMessage.value = 'Failed to load product details.'
    }
  }

  const ids = ['basic', 'media', 'pricing', 'attributes']
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = (entry.target as HTMLElement).id
        }
      })
    },
    { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.1 },
  )

  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})
</script>
