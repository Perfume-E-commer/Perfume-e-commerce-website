<template>
  <div class="border-t border-gray-100 pt-8 mt-8">
    <h3 class="text-sm font-semibold text-gray-700 mb-4">Product Settings</h3>
    
    <div class="max-w-md">
      <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div>
          <p class="font-medium text-gray-900 text-sm">Active Status</p>
          <p class="text-xs text-gray-500 mt-0.5">Show in shop</p>
        </div>
        
        <button 
          type="button"
          @click="toggleStatus"
          :class="isOn ? 'bg-green-500' : 'bg-gray-200'"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
        >
          <span 
            :class="isOn ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          ></span>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../../../types/adminProduct'

const props = defineProps<{
  modelValue: Product
}>()

const emit = defineEmits(['update:modelValue'])

const isOn = computed(() => {
  const p = props.modelValue as any
  return p.isActive ?? p.active ?? false
})

const toggleStatus = () => {
  const newValue = !isOn.value
  
  const updatedProduct = {
    ...props.modelValue,
    isActive: newValue,
  };
  (updatedProduct as any).active = newValue
  emit('update:modelValue', updatedProduct)
}
</script>