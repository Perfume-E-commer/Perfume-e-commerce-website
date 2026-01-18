<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center gap-3 mb-8">
      <div class="p-2 bg-green-50 rounded-lg">
        <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <h2 class="text-xl font-bold text-gray-900">Pricing & Inventory</h2>
        <p class="text-sm text-gray-500 mt-1">
          Set product pricing, stock levels, and size variants
        </p>
      </div>
    </div>

    <!-- Base Pricing Section -->
    <div class="mb-10">
      <h3 class="text-sm font-semibold text-gray-700 mb-5">Base Product Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >Base Price ($) <span class="text-red-500">*</span></label
          >
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              :value="modelValue.price"
              @input="updatePrice('price', $event)"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Discounted Price
            <span
              v-if="discountPercentage > 0"
              class="ml-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full"
            >
              {{ discountPercentage }}% OFF
            </span>
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              :value="modelValue.discountedPrice"
              @input="updatePrice('discountedPrice', $event)"
              type="number"
              min="0"
              step="0.01"
              placeholder="Optional"
              class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Total Stock</label>
          <div class="flex gap-3">
            <input
              :value="modelValue.stock"
              @input="
                updateField('stock', parseInt(($event.target as HTMLInputElement).value) || 0)
              "
              type="number"
              min="0"
              placeholder="0"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
            />
            <button
              v-if="hasVariants"
              @click="syncStockFromVariants"
              type="button"
              class="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors whitespace-nowrap"
              title="Sum all variant stocks"
            >
              Auto
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            <span v-if="hasVariants">Total from variants: {{ totalVariantStock }}</span>
            <span v-else>Set total available quantity</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Variants Section -->
    <div class="border-t border-gray-100 pt-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-sm font-semibold text-gray-700 mb-1">Product Variants (Sizes)</h3>
          <p class="text-sm text-gray-500">
            Define different bottle sizes with individual pricing and images
          </p>
        </div>
        <button
          @click="addVariant"
          type="button"
          class="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Size
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="!modelValue.variants || modelValue.variants.length === 0"
        class="text-center py-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50"
      >
        <svg
          class="w-12 h-12 text-gray-300 mx-auto mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="text-sm text-gray-500">
          No specific sizes added. Product is sold as a single unit.
        </p>
      </div>

      <!-- Variants List -->
      <div v-else class="space-y-4">
        <div
          v-for="(variant, index) in modelValue.variants"
          :key="index"
          class="p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:border-green-200 transition-colors relative"
        >
          <!-- Remove Button -->
          <button
            @click="removeVariant(index)"
            class="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove variant"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <!-- Left Column: Inputs -->
            <div class="lg:col-span-8">
              <div class="space-y-4">
                <!-- Changed from grid grid-cols-1 md:grid-cols-4 gap-4 -->
                <!-- Size Label -->
                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >Size / Name</label
                  >
                  <input
                    v-model="variant.size"
                    type="text"
                    placeholder="e.g. 50ml"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                  />
                </div>

                <!-- Price -->
                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >Price ($)</label
                  >
                  <input
                    v-model.number="variant.price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                  />
                </div>

                <!-- Stock -->
                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >Stock</label
                  >
                  <input
                    v-model.number="variant.stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                  />
                </div>

                <!-- Min Stock -->
                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >Min Stock</label
                  >
                  <input
                    v-model.number="variant.minStock"
                    type="number"
                    min="0"
                    placeholder="5"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <!-- Right Column: Image -->
            <div class="lg:col-span-4">
              <div class="flex flex-col gap-4">
                <!-- Image Preview - Made larger -->
                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
                    >Image Preview</label
                  >
                  <div
                    class="h-40 w-full bg-white rounded-xl border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center relative group"
                  >
                    <img
                      v-if="variant.imageUrl"
                      :src="variant.imageUrl"
                      class="h-full w-full object-cover"
                      @error="handleImageError($event, index)"
                    />
                    <div v-else class="text-sm text-gray-400 text-center p-4">
                      <svg
                        class="w-8 h-8 mx-auto mb-2 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p>No image set</p>
                    </div>

                    <button
                      v-if="variant.imageUrl"
                      @click="variant.imageUrl = ''"
                      class="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                      aria-label="Remove image"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Image Input -->
                <div class="space-y-2">
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >Variant Image</label
                  >

                  <!-- Input Mode Toggle -->
                  <div class="flex gap-2 mb-1">
                    <button
                      type="button"
                      @click="toggleVariantInputType(index, 'url')"
                      :class="[
                        'text-[10px] font-bold uppercase px-2 py-1 rounded',
                        variantInputTypes[index] === 'url'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-400 hover:text-gray-600',
                      ]"
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      @click="toggleVariantInputType(index, 'upload')"
                      :class="[
                        'text-[10px] font-bold uppercase px-2 py-1 rounded',
                        variantInputTypes[index] === 'upload'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-400 hover:text-gray-600',
                      ]"
                    >
                      Upload
                    </button>
                  </div>

                  <!-- URL Input -->
                  <input
                    v-if="variantInputTypes[index] === 'url'"
                    v-model="variant.imageUrl"
                    placeholder="https://..."
                    class="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none hover:border-gray-400 transition-colors"
                  />

                  <!-- File Upload -->
                  <div v-else class="relative">
                    <input
                      type="file"
                      accept="image/*"
                      @change="(e) => handleVariantUpload(e, index)"
                      class="block w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
                    />
                    <span
                      v-if="uploadingIndex === index"
                      class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-green-600 font-medium animate-pulse"
                      >Uploading...</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Variant Summary -->
      <div v-if="hasVariants" class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-700">Variant Summary</p>
            <p class="text-xs text-gray-500">
              {{ modelValue.variants?.length }} sizes • Total stock: {{ totalVariantStock }}
            </p>
          </div>
          <button
            @click="syncStockFromVariants"
            type="button"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
          >
            Sync Total Stock
          </button>
        </div>
      </div>
    </div>

    <!-- Product Settings Section -->
    <ProductSetting
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import type { Product, ProductVariant } from '../../../types/adminProduct'
import adminService from '../../../services/adminService'
import ProductSetting from './ProductSettings.vue'

const props = defineProps<{
  modelValue: Product
}>()

const emit = defineEmits(['update:modelValue'])

// State
const variantInputTypes = reactive<Record<number, 'url' | 'upload'>>({})
const uploadingIndex = ref<number | null>(null)

// Computed Properties
const hasVariants = computed(
  () => props.modelValue.variants && props.modelValue.variants.length > 0,
)

const discountPercentage = computed(() => {
  const price = props.modelValue.price
  const discount = props.modelValue.discountedPrice
  if (price > 0 && discount && discount < price) {
    return Math.round(((price - discount) / price) * 100)
  }
  return 0
})

const totalVariantStock = computed(() => {
  if (!props.modelValue.variants) return 0
  return props.modelValue.variants.reduce((sum, v) => sum + (v.stock || 0), 0)
})

// Logic
const updateField = (field: keyof Product, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const updatePrice = (field: 'price' | 'discountedPrice', event: Event) => {
  const val = parseFloat((event.target as HTMLInputElement).value)
  updateField(field, isNaN(val) ? 0 : val)
}

const addVariant = () => {
  const newVariant: ProductVariant = {
    size: '',
    price: props.modelValue.price || 0,
    stock: 0,
    minStock: 5,
    imageUrl: '',
  }
  const currentVariants = props.modelValue.variants ? [...props.modelValue.variants] : []
  currentVariants.push(newVariant)
  updateField('variants', currentVariants)

  // Set default input type for new variant
  variantInputTypes[currentVariants.length - 1] = 'url'
}

const removeVariant = (index: number) => {
  const currentVariants = [...(props.modelValue.variants || [])]
  currentVariants.splice(index, 1)
  updateField('variants', currentVariants)
}

const syncStockFromVariants = () => {
  if (!props.modelValue.variants) return
  const total = totalVariantStock.value
  updateField('stock', total)
}

const toggleVariantInputType = (index: number, type: 'url' | 'upload') => {
  variantInputTypes[index] = type
}

const handleVariantUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploadingIndex.value = index

  try {
    // Upload to server
    const res = await adminService.uploadImage(file)
    const currentVariants = [...(props.modelValue.variants || [])]
    currentVariants[index].imageUrl = res.data.url
    updateField('variants', currentVariants)
  } catch (error) {
    console.error('Variant upload failed', error)
    // Fallback to local base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const currentVariants = [...(props.modelValue.variants || [])]
      currentVariants[index].imageUrl = e.target?.result as string
      updateField('variants', currentVariants)
    }
    reader.readAsDataURL(file)
  } finally {
    uploadingIndex.value = null(
      // Clear the input so same file can be selected again
      event.target as HTMLInputElement,
    ).value = ''
  }
}

const handleImageError = (event: Event, index: number) => {
  const img = event.target as HTMLImageElement
  img.src =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRkZGRkUiLz48cGF0aCBkPSJNNTAgNTAgTDE1MCA1MCAxNTAgMTUwIDUwIDE1MFoiIHN0cm9rZT0iI0U1RTVFNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTcwIDcwIEwxMzAgNzAgMTMwIDEzMCA3MCAxMzBaIiBzdHJva2U9IiNFNUU1RTUiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIHN0cm9rZT0iI0U1RTVFNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'
}
</script>
