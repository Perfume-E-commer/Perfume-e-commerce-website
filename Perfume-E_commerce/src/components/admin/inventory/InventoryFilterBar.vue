<template>
  <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
    
    <div class="relative w-full md:w-64">
      <span class="absolute left-3 top-2.5 text-gray-400">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </span>
      <input 
        :value="searchQuery"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        type="text" 
        placeholder="Search product..." 
        class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
      >
    </div>

    <div class="flex flex-wrap gap-3 w-full md:w-auto">
      
      <select 
        :value="activeBrand"
        @change="$emit('update:activeBrand', ($event.target as HTMLSelectElement).value)"
        class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
      >
        <option value="All">All Brands</option> <option v-for="brand in uniqueBrands" :key="brand" :value="brand">{{ brand }}</option>
      </select>

      <select 
        :value="activeCategory"
        @change="$emit('update:activeCategory', ($event.target as HTMLSelectElement).value)"
        class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
      >
        <option value="All">All Categories</option> <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <select 
        :value="activeStatus"
        @change="$emit('update:activeStatus', ($event.target as HTMLSelectElement).value)"
        class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
      >
        <option value="All">All Status</option>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>

      <button 
        @click="$emit('refresh')" 
        class="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition" 
        title="Refresh Data"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
      </button>

      <button 
        @click="$emit('download')"
        class="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        Report
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props received from the Parent (InventoryView)
const props = defineProps<{
  searchQuery: string
  activeBrand: string
  activeCategory: string
  activeStatus: string
  uniqueBrands: string[]
  uniqueCategories: string[]
}>()

// Emits to notify Parent of changes
defineEmits([
  'update:searchQuery', 
  'update:activeBrand', 
  'update:activeCategory', 
  'update:activeStatus',
  'reset-filters',
  'refresh', 
  'download',
  'add-brand'
])

const hasActiveFilters = computed(() => {
  return props.activeBrand !== '' || props.activeCategory !== '' || props.activeStatus !== 'all' || props.searchQuery !== ''
})
</script>