<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div class="flex items-center gap-2 mb-6">
      <div class="p-2 bg-purple-50 rounded-lg">
        <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-lg font-bold text-gray-900">Basic Information</h2>
    </div>

    <div class="space-y-5">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Product Name <span class="text-red-500">*</span></label>
        <input 
          :value="modelValue.name"
          @input="updateField('name', ($event.target as HTMLInputElement).value)"
          type="text" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 hover:border-gray-400" 
          placeholder="e.g. Chanel No. 5" 
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Brand <span class="text-red-500">*</span></label>
          <select 
            :value="modelValue.brand"
            @change="updateField('brand', ($event.target as HTMLSelectElement).value)"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none hover:border-gray-400 transition-colors bg-white"
          >
            <option value="" disabled>Select Brand</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Category (Gender) <span class="text-red-500">*</span></label>
          <select 
            :value="modelValue.category"
            @change="updateField('category', ($event.target as HTMLSelectElement).value)"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none hover:border-gray-400 transition-colors bg-white"
          >
            <option value="" disabled>Select Category</option>
            <option value="MEN">Men</option>
            <option value="WOMEN">Women</option>
            <option value="UNISEX">Unisex</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          Summary 
          <span class="text-xs font-normal text-gray-400 ml-1">(Short description for cards)</span>
        </label>
        <textarea 
          :value="modelValue.summary"
          @input="updateField('summary', ($event.target as HTMLTextAreaElement).value)"
          rows="2" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none placeholder:text-gray-400 hover:border-gray-400 transition-colors" 
          placeholder="Brief product summary..."
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
        <textarea 
          :value="modelValue.description"
          @input="updateField('description', ($event.target as HTMLTextAreaElement).value)"
          rows="4" 
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none placeholder:text-gray-400 hover:border-gray-400 transition-colors" 
          placeholder="Detailed product description..."
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/Product'

const props = defineProps<{
  modelValue: Product, 
  brands: string[]
}>()

const emit = defineEmits(['update:modelValue'])

const updateField = (field: keyof Product, value: any) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>