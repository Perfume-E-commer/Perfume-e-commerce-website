<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center gap-2 mb-6">
      <div class="p-2 bg-pink-50 rounded-lg">
        <svg class="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 class="text-lg font-bold text-gray-900">Product Images</h2>
    </div>

    <div class="space-y-6">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Main Cover Image <span class="text-red-500">*</span>
        </label>
        
        <div 
          v-if="!modelValue.imageUrl"
          @click="triggerMainUpload"
          class="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-gray-50 hover:border-pink-400 transition-all group"
        >
          <div class="p-4 bg-gray-50 rounded-full mb-3 group-hover:bg-white transition-colors shadow-sm">
            <svg class="w-8 h-8 text-gray-400 group-hover:text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p class="text-sm font-medium text-gray-600 group-hover:text-pink-600">Click to upload cover image</p>
          <p class="text-xs text-gray-400 mt-1">Supports JPG, PNG, WEBP</p>
        </div>

        <div v-else class="relative group rounded-xl overflow-hidden border border-gray-200">
          <img :src="modelValue.imageUrl" class="w-full h-64 object-contain bg-gray-50" />
          
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button 
              @click="triggerMainUpload"
              class="px-4 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 shadow-lg"
            >
              Change
            </button>
            <button 
              @click="removeMainImage"
              class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 shadow-lg"
            >
              Remove
            </button>
          </div>
        </div>
        
        <input 
          ref="mainInputRef"
          type="file" 
          accept="image/*" 
          class="hidden" 
          @change="onMainImageSelected"
        />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-3">Gallery Images</label>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(img, idx) in modelValue.images" :key="idx" class="relative group aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
            <img :src="img" class="w-full h-full object-cover" />
            <button 
              @click="removeGalleryImage(idx)"
              class="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
            >
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            @click="triggerGalleryUpload"
            class="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 hover:bg-gray-50 transition-colors text-gray-400 hover:text-pink-500"
          >
            <svg class="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-xs font-medium">Add Photo</span>
          </div>
        </div>

        <input 
          ref="galleryInputRef"
          type="file" 
          accept="image/*" 
          multiple
          class="hidden" 
          @change="onGalleryImagesSelected"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types/Product'

const props = defineProps<{
  modelValue: Product
}>()

const emit = defineEmits(['update:modelValue'])

const mainInputRef = ref<HTMLInputElement | null>(null)
const galleryInputRef = ref<HTMLInputElement | null>(null)

// --- Logic ---

const updateField = (field: keyof Product, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

// 1. Main Image Logic
const triggerMainUpload = () => mainInputRef.value?.click()

const onMainImageSelected = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    updateField('imageUrl', e.target?.result as string)
  }
  reader.readAsDataURL(file)
  
  // Reset input so you can select same file again if needed
  if (mainInputRef.value) mainInputRef.value.value = ''
}

const removeMainImage = () => {
  updateField('imageUrl', '')
}

// 2. Gallery Logic
const triggerGalleryUpload = () => galleryInputRef.value?.click()

const onGalleryImagesSelected = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  // Need to process multiple files async, but emit once
  const newImages: string[] = []
  let processedCount = 0

  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        newImages.push(e.target.result as string)
      }
      processedCount++
      
      // When all files are processed, emit the update
      if (processedCount === files.length) {
        const currentImages = props.modelValue.images ? [...props.modelValue.images] : []
        updateField('images', [...currentImages, ...newImages])
      }
    }
    reader.readAsDataURL(file)
  })

  if (galleryInputRef.value) galleryInputRef.value.value = ''
}

const removeGalleryImage = (index: number) => {
  const currentImages = props.modelValue.images ? [...props.modelValue.images] : []
  currentImages.splice(index, 1)
  updateField('images', currentImages)
}
</script>