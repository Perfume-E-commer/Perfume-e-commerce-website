<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    
    <div v-if="loading" class="p-12 flex justify-center items-center text-gray-500">
      <svg class="animate-spin h-8 w-8 text-indigo-600 mr-3" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading inventory...
    </div>

    <div v-else-if="products.length === 0" class="p-12 text-center text-gray-500">
      <p class="text-lg font-medium">No products found.</p>
      <p class="text-sm">Try adjusting your filters or search query.</p>
    </div>

    <div v-else>
      
      <div class="md:hidden divide-y divide-gray-100">
        <div v-for="product in products" :key="product.id" class="p-4 space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold text-gray-900">{{ product.name }}</h3>
              <p class="text-xs text-gray-500">{{ product.brand }} • {{ product.category }}</p>
            </div>
            <span :class="getStatusBadge(product.stock).class">
              {{ getStatusBadge(product.stock).label }}
            </span>
          </div>
          
          <div class="flex justify-between items-center pt-2">
            <div class="text-sm">
              <span class="text-gray-500">Stock:</span>
              <span class="font-mono font-bold ml-1" :class="getStockColor(product.stock)">{{ product.stock }}</span>
            </div>
            <button 
              @click="$emit('restock', product)"
              class="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition"
            >
              Restock
            </button>
          </div>
        </div>
      </div>

      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th class="p-4 font-medium cursor-pointer hover:text-indigo-600" @click="$emit('sort', 'name')">Product Name ↕</th>
              <th class="p-4 font-medium cursor-pointer hover:text-indigo-600" @click="$emit('sort', 'brand')">Brand ↕</th>
              <th class="p-4 font-medium cursor-pointer hover:text-indigo-600" @click="$emit('sort', 'category')">Category ↕</th>
              <th class="p-4 font-medium text-right cursor-pointer hover:text-indigo-600" @click="$emit('sort', 'stock')">Stock ↕</th>
              <th class="p-4 font-medium text-center">Status</th>
              <th class="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition group">
              <td class="p-4 font-medium text-gray-900">{{ product.name }}</td>
              <td class="p-4 text-gray-600">{{ product.brand }}</td>
              <td class="p-4 text-gray-500 text-xs">
                <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded">{{ product.category }}</span>
              </td>
              <td class="p-4 text-right font-mono text-gray-900 font-bold" :class="getStockColor(product.stock)">
                {{ product.stock }}
              </td>
              <td class="p-4 text-center">
                <span :class="getStatusBadge(product.stock).class">
                  {{ getStatusBadge(product.stock).label }}
                </span>
              </td>
              <td class="p-4 text-right">
                <button 
                  @click="$emit('restock', product)"
                  class="text-indigo-600 hover:text-indigo-900 text-sm font-medium hover:underline"
                >
                  Restock
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  products: any[],
  loading?: boolean
}>()

// Emits
defineEmits(['restock', 'sort'])

// Helper: Get Badge Styles
const getStatusBadge = (stock: number) => {
  if (stock === 0) return { label: 'Out of Stock', class: 'bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold border border-red-200' }
  if (stock <= 5) return { label: 'Low Stock', class: 'bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold border border-amber-200' }
  return { label: 'In Stock', class: 'bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-200' }
}

// Helper: Text Color for Stock Number
const getStockColor = (stock: number) => {
  if (stock === 0) return 'text-red-600'
  if (stock <= 5) return 'text-amber-600'
  return 'text-gray-900'
}
</script>