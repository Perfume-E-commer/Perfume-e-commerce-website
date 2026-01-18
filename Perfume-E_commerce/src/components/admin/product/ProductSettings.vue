<template>
  <div class="border-t border-gray-100 pt-8 mt-8">
    <h3 class="text-sm font-semibold text-gray-700 mb-4">Product Settings</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div>
          <p class="font-medium text-gray-900 text-sm">Active Status</p>
          <p class="text-xs text-gray-500 mt-0.5">Show in shop</p>
        </div>
        <button 
          type="button"
          @click="updateField('isActive', !modelValue.isActive)"
          :class="modelValue.isActive ? 'bg-green-500' : 'bg-gray-200'"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <span 
            :class="modelValue.isActive ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          ></span>
        </button>
      </div>

      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div>
          <p class="font-medium text-gray-900 text-sm">Featured</p>
          <p class="text-xs text-gray-500 mt-0.5">Show in carousel</p>
        </div>
        <button 
          type="button"
          @click="updateField('isFeatured', !modelValue.isFeatured)"
          :class="modelValue.isFeatured ? 'bg-indigo-900' : 'bg-gray-200'"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <span 
            :class="modelValue.isFeatured ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          ></span>
        </button>
      </div>

      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div>
          <p class="font-medium text-gray-900 text-sm">On Sale</p>
          <p class="text-xs text-gray-500 mt-0.5">Show sale badge</p>
        </div>
        <button 
          type="button"
          @click="updateField('isOnSale', !modelValue.isOnSale)"
          :class="modelValue.isOnSale ? 'bg-red-500' : 'bg-gray-200'"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <span 
            :class="modelValue.isOnSale ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          ></span>
        </button>
      </div>

      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div>
          <p class="font-medium text-gray-900 text-sm">Tax Included</p>
          <p class="text-xs text-gray-500 mt-0.5">Price includes tax</p>
        </div>
        <button 
          type="button"
          @click="updateField('taxIncluded', !modelValue.taxIncluded)"
          :class="modelValue.taxIncluded ? 'bg-indigo-900' : 'bg-gray-200'"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <span 
            :class="modelValue.taxIncluded ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          ></span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/adminProduct'

const props = defineProps<{
  modelValue: Product
}>()

const emit = defineEmits(['update:modelValue'])

const updateField = (field: keyof Product, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>
