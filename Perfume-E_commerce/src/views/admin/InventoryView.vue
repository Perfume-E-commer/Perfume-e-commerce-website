<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Warehouse Inventory</h1>
      <button class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
        Download Report
      </button>
    </div>

    <div v-if="lowStockProducts.length > 0" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">
            <span class="font-medium">Attention needed:</span> 
            You have {{ lowStockProducts.length }} products with low stock (5 or less).
          </p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
          <tr>
            <th class="p-4 font-medium">Product Name</th>
            <th class="p-4 font-medium">Category</th>
            <th class="p-4 font-medium">Status</th>
            <th class="p-4 font-medium text-right">Stock Level</th>
            <th class="p-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="product in sortedProducts" :key="product.id" class="hover:bg-gray-50 transition">
            <td class="p-4 font-medium text-gray-900">{{ product.name }}</td>
            <td class="p-4 text-gray-500">{{ product.category }}</td>
            <td class="p-4">
              <span 
                :class="product.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'"
                class="px-2 py-1 rounded-full text-xs font-bold"
              >
                {{ product.stock <= 5 ? 'Low Stock' : 'In Stock' }}
              </span>
            </td>
            <td class="p-4 text-right font-mono text-gray-700">{{ product.stock }}</td>
            <td class="p-4 text-right">
              <button 
                @click="openRestockModal(product)"
                class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                Restock
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import productService from '@/services/productService'
import type { Product } from '@/types/adminProduct' 

const products = ref<Product[]>([])

onMounted(async () => {
  try {
    const res = await productService.getAllProducts({ page: 0, size: 100, search: '' })
    products.value = res.data.content || res.data 
  } catch (err) {
    console.error("Failed to load inventory", err)
  }
})

const sortedProducts = computed(() => {
  return [...products.value].sort((a, b) => a.stock - b.stock)
})

const lowStockProducts = computed(() => {
  return products.value.filter(p => p.stock <= 5)
})

const openRestockModal = (product: Product) => {
  const newStock = prompt(`Restock ${product.name}. Current: ${product.stock}. Enter new total:`, product.stock.toString())
  if (newStock && !isNaN(Number(newStock))) {
    alert(`Ideally, this sends an API call to update stock to ${newStock}`)
  }
}
</script>