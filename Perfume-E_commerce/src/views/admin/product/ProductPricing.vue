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

      <div class="space-y-5">
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
              class="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
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
              class="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
              placeholder="Optional"
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
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
            />
            <button
              v-if="hasVariants"
              @click="syncStockFromVariants"
              type="button"
              class="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors whitespace-nowrap"
              title="Sum all variant stocks"
            >
              Auto Calculate
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
          class="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors flex items-center gap-2"
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
      <div v-else class="space-y-6">
        <div
          v-for="(variant, index) in modelValue.variants"
          :key="index"
          class="p-5 border border-gray-200 rounded-xl bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <div class="flex items-center justify-between mb-6">
            <h4 class="text-sm font-bold text-gray-700">Variant {{ index + 1 }}</h4>
            <button
              @click="removeVariant(index)"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Remove variant"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column: Inputs -->
            <div class="lg:col-span-2 space-y-4">
              <!-- Size Label -->
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-2">Size Label</label>
                <input
                  v-model="variant.size"
                  type="text"
                  placeholder="e.g. 50ml, 100ml, 200ml"
                  class="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                />
              </div>

              <!-- Image URL Input -->
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-2">Image URL</label>
                <input
                  v-model="variant.imageUrl"
                  type="text"
                  placeholder="Paste direct image URL for this size..."
                  class="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors placeholder:text-gray-400"
                />
                <p class="text-xs text-gray-500 mt-1">
                  URL should end with .jpg, .png, .webp, etc.
                </p>
              </div>

              <!-- Price, Stock & Min Stock -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-2">Price ($)</label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                      >$</span
                    >
                    <input
                      v-model.number="variant.price"
                      type="number"
                      min="0"
                      step="0.01"
                      class="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-2">Stock</label>
                  <input
                    v-model.number="variant.stock"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-2">Min Stock</label>
                  <input
                    v-model.number="variant.minStock"
                    type="number"
                    min="0"
                    placeholder="5"
                    class="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-purple-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <!-- Right Column: Image Preview -->
            <div class="lg:col-span-1">
              <label class="block text-xs font-medium text-gray-600 mb-2">Image Preview</label>
              <div
                v-if="variant.imageUrl"
                class="relative group h-64 w-full bg-white rounded-xl border-2 border-gray-200 overflow-hidden"
              >
                <img
                  :src="variant.imageUrl"
                  class="w-full h-full object-contain p-4"
                  :alt="variant.size ? `${variant.size} variant image` : 'Variant image'"
                  @error="handleImageError($event, index)"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                ></div>
                <button
                  @click="variant.imageUrl = ''"
                  class="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
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
                <div
                  v-if="variant.size"
                  class="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded"
                >
                  {{ variant.size }}
                </div>
              </div>
              <div
                v-else
                class="h-64 w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 text-gray-400"
              >
                <svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p class="text-xs text-center px-4">Add an image URL to see preview</p>
              </div>

              <div v-if="variant.imageUrl" class="mt-2 text-center">
                <button
                  @click="refreshImage(index)"
                  class="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Refresh Image
                </button>
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product, ProductVariant } from '@/types/Product'

const props = defineProps<{
  modelValue: Product
}>()

const emit = defineEmits(['update:modelValue'])

// Helpers
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
    price: props.modelValue.price,
    stock: 0,
    minStock: 5,
    imageUrl: '',
  }
  const currentVariants = props.modelValue.variants ? [...props.modelValue.variants] : []
  currentVariants.push(newVariant)
  updateField('variants', currentVariants)
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

const handleImageError = (event: Event, index: number) => {
  const img = event.target as HTMLImageElement
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRkZGRkUiLz48cGF0aCBkPSJNNTAgNTAgTDE1MCA1MCAxNTAgMTUwIDUwIDE1MFoiIHN0cm9rZT0iI0U1RTVFNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTcwIDcwIEwxMzAgNzAgMTMwIDEzMCA3MCAxMzBaIiBzdHJva2U9IiNFNUU1RTUiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIHN0cm9rZT0iI0U1RTVFNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'
}

const refreshImage = (index: number) => {
  const variant = props.modelValue.variants?.[index]
  if (variant && variant.imageUrl) {
    const url = new URL(variant.imageUrl)
    url.searchParams.set('t', Date.now().toString())
    variant.imageUrl = url.toString()
    
    const currentVariants = [...(props.modelValue.variants || [])]
    updateField('variants', currentVariants)
  }
}
</script>
