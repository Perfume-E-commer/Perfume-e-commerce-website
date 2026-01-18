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
      
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th class="p-4 w-10"></th> <th class="p-4 font-medium cursor-pointer hover:text-indigo-600" @click="$emit('sort', 'name')">Product ↕</th>
              <th class="p-4 font-medium cursor-pointer hover:text-indigo-600" @click="$emit('sort', 'category')">Category ↕</th>
              <th class="p-4 font-medium text-right cursor-pointer hover:text-indigo-600" @click="$emit('sort', 'stock')">Total Stock ↕</th>
              <th class="p-4 font-medium text-center">Status</th>
              <th class="p-4 font-medium text-center">Active</th>
              <th class="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <template v-for="product in products" :key="product.id">
              <tr class="hover:bg-gray-50 transition group" :class="{'bg-gray-50': expandedRows.has(product.id)}">
                <td class="p-4 text-center">
                  <button 
                    v-if="product.variants && product.variants.length > 0"
                    @click="toggleExpand(product.id)"
                    class="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-indigo-600 transition"
                  >
                    <svg class="w-5 h-5 transform transition-transform duration-200" :class="{'rotate-90': expandedRows.has(product.id)}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </td>
                <td class="p-4">
                  <div class="font-bold text-gray-900">{{ product.name }}</div>
                  <div class="text-xs text-gray-500">{{ product.brand }}</div>
                </td>
                <td class="p-4 text-sm text-gray-600">
                  <span class="bg-gray-100 px-2 py-1 rounded text-xs">{{ product.category }}</span>
                </td>
                <td class="p-4 text-right font-mono font-bold" :class="getStockColor(product.stock, product.minStockLevel)">
                  {{ product.stock }}
                </td>
                <td class="p-4 text-center">
                  <span :class="getStatusBadge(product.stock, product.minStockLevel).class">
                    {{ getStatusBadge(product.stock, product.minStockLevel).label }}
                  </span>
                </td>
                <td class="p-4 text-center">
                  <button 
                    @click="$emit('toggleStatus', product)"
                    class="relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none"
                    :class="product.active ? 'bg-indigo-600' : 'bg-gray-200'"
                  >
                    <span 
                      class="inline-block w-3 h-3 transform bg-white rounded-full transition-transform ml-1" 
                      :class="product.active ? 'translate-x-4' : 'translate-x-0'"
                    />
                  </button>
                </td>
                <td class="p-4 text-right flex items-center justify-end gap-2">
                  <button @click="$emit('viewHistory', product)" class="p-1.5 text-gray-400 hover:text-indigo-600 rounded hover:bg-gray-100" title="Stock History">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </button>
                  
                  <button 
                    v-if="!product.variants || product.variants.length === 0"
                    @click="$emit('restock', product)"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-900 hover:underline"
                  >
                    Restock
                  </button>
                  <button 
                    v-else
                    @click="toggleExpand(product.id)"
                    class="text-sm font-medium text-gray-500 hover:text-indigo-600 hover:underline"
                  >
                    Manage Variants
                  </button>
                </td>
              </tr>

              <tr v-if="expandedRows.has(product.id)" class="bg-gray-50/50 shadow-inner">
                <td colspan="7" class="p-4 sm:pl-16 sm:pr-8">
                  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table class="w-full text-sm">
                      <thead class="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                        <tr>
                          <th class="px-4 py-2 text-left">Variant Size</th>
                          <th class="px-4 py-2 text-right">Current Stock</th>
                          <th class="px-4 py-2 text-right">Min Limit</th>
                          <th class="px-4 py-2 text-center">Status</th>
                          <th class="px-4 py-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-50">
                        <tr v-for="(variant, idx) in product.variants" :key="idx" class="hover:bg-gray-50">
                          <td class="px-4 py-3 font-medium text-gray-800">{{ variant.size }}</td>
                          <td class="px-4 py-3 text-right font-mono">{{ variant.stock }}</td>
                          <td class="px-4 py-3 text-right text-gray-500">{{ variant.minStock || product.minStockLevel || 5 }}</td>
                          <td class="px-4 py-3 text-center">
                            <span :class="getStatusBadge(variant.stock, variant.minStock || product.minStockLevel).class">
                              {{ getStatusBadge(variant.stock, variant.minStock || product.minStockLevel).label }}
                            </span>
                          </td>
                          <td class="px-4 py-3 text-right">
                            <button 
                              @click="$emit('restock', product, variant)"
                              class="text-xs bg-white border border-gray-300 hover:border-indigo-600 hover:text-indigo-700 text-gray-600 px-3 py-1.5 rounded-md transition shadow-sm font-medium"
                            >
                              Restock / Edit
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="md:hidden divide-y divide-gray-100">
        <div v-for="product in products" :key="product.id" class="p-4 space-y-3 bg-white">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold text-gray-900">{{ product.name }}</h3>
              <p class="text-xs text-gray-500">{{ product.brand }} • {{ product.category }}</p>
            </div>
            <span :class="getStatusBadge(product.stock, product.minStockLevel).class">
              {{ getStatusBadge(product.stock, product.minStockLevel).label }}
            </span>
          </div>
          
          <div class="flex justify-between items-center pt-2">
             <div class="text-sm">
              <span class="text-gray-500">Total:</span>
              <span class="font-mono font-bold ml-1" :class="getStockColor(product.stock, product.minStockLevel)">{{ product.stock }}</span>
            </div>
            <div class="flex gap-2">
                <button 
                    v-if="product.variants && product.variants.length > 0"
                    @click="toggleExpand(product.id)"
                    class="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg"
                >
                    {{ expandedRows.has(product.id) ? 'Hide Variants' : 'View Variants' }}
                </button>
                <button 
                    v-else
                    @click="$emit('restock', product)"
                    class="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg"
                >
                    Restock
                </button>
            </div>
          </div>

          <div v-if="expandedRows.has(product.id) && product.variants" class="mt-3 border-t border-gray-100 pt-3 space-y-2">
              <div v-for="(variant, idx) in product.variants" :key="idx" class="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-lg">
                  <span class="font-medium text-gray-700">{{ variant.size }}</span>
                  <div class="flex items-center gap-3">
                      <span class="font-mono" :class="getStockColor(variant.stock, variant.minStock || product.minStockLevel)">{{ variant.stock }}</span>
                      <button @click="$emit('restock', product, variant)" class="text-indigo-600 font-medium text-xs border border-indigo-200 px-2 py-1 rounded bg-white">Restock</button>
                  </div>
              </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  products: any[],
  loading?: boolean
}>()

defineEmits(['restock', 'sort', 'viewHistory', 'toggleStatus'])

const expandedRows = ref(new Set<string>())

const toggleExpand = (productId: string) => {
  if (expandedRows.value.has(productId)) {
    expandedRows.value.delete(productId)
  } else {
    expandedRows.value.add(productId)
  }
}

const getStatusBadge = (stock: number, minStock: number = 5) => {
  if (stock === 0) return { label: 'Out of Stock', class: 'bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold border border-red-200' }
  if (stock <= minStock) return { label: 'Low Stock', class: 'bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold border border-amber-200' }
  return { label: 'In Stock', class: 'bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold border border-emerald-200' }
}

const getStockColor = (stock: number, minStock: number = 5) => {
  if (stock === 0) return 'text-red-600'
  if (stock <= minStock) return 'text-amber-600'
  return 'text-gray-900'
}
</script>