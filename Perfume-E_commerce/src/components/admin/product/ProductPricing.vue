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

    <!-- Base Product Information (Variant #0) -->
    <div v-if="baseVariant" class="mb-10">
      <h3 class="text-sm font-semibold text-gray-700 mb-5">Base Product Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >Base Price ($) <span class="text-red-500">*</span></label
          >
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              v-model.number="baseVariant.price"
              @input="syncPriceToRoot"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              class="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Base Size</label>
          <div class="relative">
            <input
              v-model="baseVariant.size"
              type="text"
              placeholder="e.g. 100 ml"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Base Stock</label>
          <input
            v-model.number="baseVariant.stock"
            @input="recalculateTotalStock"
            type="number"
            min="0"
            placeholder="0"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Low Stock Alert</label>
          <input
            v-model.number="baseVariant.minStock"
            type="number"
            min="0"
            placeholder="5"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >Total Stock <span class="text-xs text-gray-500">(Auto-calculated)</span></label
          >
          <div class="relative">
            <input
              :value="totalStock"
              readonly
              type="number"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-100 text-gray-900 font-bold focus:outline-none cursor-not-allowed"
            />
            <div
              class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 font-medium"
            >
              {{ totalStock }} units
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Variants Section -->
    <div class="border-t border-gray-100 pt-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-sm font-semibold text-gray-700 mb-1">Additional Variants</h3>
          <p class="text-sm text-gray-500">Define different bottle sizes with individual pricing</p>
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
          Add Variant
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-if="variants.length <= 1"
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
          No additional variants. Product only available in base size.
        </p>
      </div>

      <!-- Variants List -->
      <div v-if="variants.length > 1" class="space-y-4">
        <div
          v-for="(variant, index) in additionalVariants"
          :key="index"
          class="p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:border-green-200 transition-colors relative"
        >
          <!-- Remove Button -->
          <button
            type="button" 
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

                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >Price ($)</label
                  >
                  <input
                    :value="variant.price"
                    @input="
                      variant.price = parseFloat(($event.target as HTMLInputElement).value) || 0
                    "
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >Stock</label
                  >
                  <input
                    v-model.number="variant.stock"
                    @input="recalculateTotalStock"
                    type="number"
                    min="0"
                    placeholder="0"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-1 focus:ring-green-500 focus:border-transparent outline-none hover:border-gray-400 transition-colors"
                  />
                </div>

                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
                    >Low Stock Alert</label
                  >
                  <input
                    v-model.number="variant.minStock"
                    type="number"
                    min="0"
                    placeholder="Default: 5"
                    class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Right Column: Variant-specific Image -->
            <div class="lg:col-span-4">
              <div class="flex flex-col gap-4">
                <div>
                  <label
                    class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
                    >Variant Image (Optional)</label
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
                      <p>Uses product main image</p>
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

                <div class="space-y-2">
                  <div class="flex gap-2 mb-1">
                    <button
                      type="button"
                      @click="toggleVariantInputType(index + 1, 'url')"
                      :class="[
                        'text-[10px] font-bold uppercase px-2 py-1 rounded',
                        variantInputTypes[index + 1] === 'url'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-400 hover:text-gray-600',
                      ]"
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      @click="toggleVariantInputType(index + 1, 'upload')"
                      :class="[
                        'text-[10px] font-bold uppercase px-2 py-1 rounded',
                        variantInputTypes[index + 1] === 'upload'
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-400 hover:text-gray-600',
                      ]"
                    >
                      Upload
                    </button>
                  </div>

                  <input
                    v-if="variantInputTypes[index + 1] === 'url'"
                    v-model="variant.imageUrl"
                    placeholder="https://..."
                    class="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:ring-1 focus:ring-green-500 outline-none hover:border-gray-400 transition-colors"
                  />

                  <div v-else class="relative">
                    <input
                      type="file"
                      accept="image/*"
                      @change="(e) => handleVariantUpload(e, index + 1)"
                      class="block w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none"
                    />
                    <span
                      v-if="uploadingIndex === index + 1"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import type { Product, ProductVariant } from '../../../types/adminProduct'
import adminService from '../../../services/adminService'

const props = defineProps<{
  modelValue: Product
}>()

const emit = defineEmits(['update:modelValue'])

const variantInputTypes = reactive<Record<number, 'url' | 'upload'>>({})
const uploadingIndex = ref<number | null>(null)

const updateField = (field: keyof Product, value: any) => {
  console.log('Updating:', field, 'with:', value)
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const variants = computed(() => {
  console.log('variants computed:', props.modelValue.variants)
  return props.modelValue.variants || []
})

const baseVariant = computed(() => {
  if (variants.value.length > 0) return variants.value[0]
  return null
})

const basePrice = computed(() => {
  const bp = baseVariant.value ? Number(baseVariant.value.price) : Number(props.modelValue.price)
  return isNaN(bp) ? 0 : bp
})

const additionalVariants = computed(() => {
  const result = variants.value.length > 1 ? variants.value.slice(1) : []
  console.log('additionalVariants computed:', result)
  return result
})

const totalStock = computed(() => {
  return variants.value.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)
})

onMounted(() => {
  if (!props.modelValue.variants || props.modelValue.variants.length === 0) {
    const initVariants: ProductVariant[] = [
      {
        size: '',
        price: props.modelValue.price || 0,
        stock: props.modelValue.stock || 0,
        minStock: props.modelValue.minStockLevel || 5,
        imageUrl: '',
      },
    ]
    updateField('variants', initVariants)
  }
})

const syncPriceToRoot = () => {
  if (baseVariant.value) {
    updateField('price', baseVariant.value.price)
  }
}

const recalculateTotalStock = () => {
  updateField('stock', totalStock.value)
}

const addVariant = () => {
  const newVariant: ProductVariant = {
    size: '',
    price: 0,
    stock: 0,
    minStock: 5,
    imageUrl: '',
  }

  const updatedList = [...(props.modelValue.variants || []), newVariant]
  console.log('Updated variants:', updatedList)
  updateField('variants', updatedList)
  variantInputTypes[updatedList.length - 1] = 'url'

  setTimeout(() => {
    recalculateTotalStock()
  }, 0)
}

const removeVariant = (offsetIndex: number) => {
  const realIndex = offsetIndex + 1
  const updatedList = [...variants.value]
  updatedList.splice(realIndex, 1)
  updateField('variants', updatedList)
  recalculateTotalStock()
}

const toggleVariantInputType = (index: number, type: 'url' | 'upload') => {
  variantInputTypes[index] = type
}

const handleVariantUpload = async (event: Event, index: number) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  uploadingIndex.value = index

  try {
    const res = await adminService.uploadImage(file)
    const currentVariants = [...(props.modelValue.variants || [])]
    if (!currentVariants[index]) {
      currentVariants[index] = { size: '', price: 0, stock: 0, minStock: 5, imageUrl: '' }
    }
    currentVariants[index].imageUrl = res.data.url
    updateField('variants', currentVariants)
  } catch (error) {
    console.error('Variant upload failed', error)
    const reader = new FileReader()
    reader.onload = (e) => {
      const currentVariants = [...(props.modelValue.variants || [])]
      if (!currentVariants[index]) {
        currentVariants[index] = { size: '', price: 0, stock: 0, minStock: 5, imageUrl: '' }
      }
      currentVariants[index].imageUrl = e.target?.result as string
      updateField('variants', currentVariants)
    }
    reader.readAsDataURL(file)
  } finally {
    uploadingIndex.value = null
    ;(event.target as HTMLInputElement).value = ''
  }
}

const handleImageError = (event: Event, index: number) => {
  const img = event.target as HTMLImageElement
  img.src =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRkZGRkUiLz48cGF0aCBkPSJNNTAgNTAgTDE1MCA1MCAxNTAgMTUwIDUwIDE1MFoiIHN0cm9rZT0iI0U1RTVFNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTcwIDcwIEwxMzAgNzAgMTMwIDEzMCA3MCAxMzBaIiBzdHJva2U9IiNFNUU1RTUiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIHN0cm9rZT0iI0U1RTVFNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'
}
</script>
