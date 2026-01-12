<template>
  <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <div class="relative flex-1 max-w-lg">
        <input 
          :value="searchQuery"
          @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          type="text" 
          placeholder="🔍 Search by product, brand, or category..." 
          class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      <div class="flex gap-3">
        <button 
          @click="$emit('refresh')"
          class="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition border border-gray-200"
          title="Refresh Data"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </button>

        <button 
          @click="$emit('download')"
          class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <span class="hidden sm:inline">Export</span>
        </button>

        <button 
          @click="$emit('add-brand')"
          class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md transition"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          <span>Add Brand</span>
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
      
      <select 
        :value="activeBrand"
        @change="$emit('update:activeBrand', ($event.target as HTMLSelectElement).value)"
        class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 min-w-[140px]"
      >
        <option value="">All Brands</option>
        <option v-for="brand in uniqueBrands" :key="brand" :value="brand">{{ brand }}</option>
      </select>

      <select 
        :value="activeCategory"
        @change="$emit('update:activeCategory', ($event.target as HTMLSelectElement).value)"
        class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 min-w-[140px]"
      >
        <option value="">All Categories</option>
        <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <select 
        :value="activeStatus"
        @change="$emit('update:activeStatus', ($event.target as HTMLSelectElement).value)"
        class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 min-w-[140px]"
      >
        <option value="all">All Status</option>
        <option value="in">✅ In Stock</option>
        <option value="low">⚠️ Low Stock</option>
        <option value="out">❌ Out of Stock</option>
      </select>

      <button 
        v-if="hasActiveFilters"
        @click="$emit('reset-filters')"
        class="text-sm text-red-600 hover:text-red-800 font-medium px-2 py-2"
      >
        Clear Filters
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