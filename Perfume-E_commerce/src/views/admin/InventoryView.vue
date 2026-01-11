<template>
  <div class="p-6 space-y-6 min-h-screen bg-gray-50/50">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Warehouse Inventory</h1>
        <p class="text-sm text-gray-500 mt-1">Monitor stock levels and restock products.</p>
      </div>
      
      <div class="flex gap-3">
        <button 
          @click="fetchProducts" 
          class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center shadow-sm text-sm font-medium"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Refresh
        </button>
        <button 
          @click="generatePDF" 
          class="bg-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition flex items-center shadow-sm text-sm font-medium"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Download Report
        </button>
      </div>
    </div>

    <div v-if="lowStockCount > 0" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-fade-in">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Low Stock Alert</h3>
          <div class="mt-1 text-sm text-red-700">
            You have {{ lowStockCount }} items with 5 units or less. Please restock immediately.
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by product name or brand..." 
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
      
      <select 
        v-model="statusFilter" 
        class="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-700 cursor-pointer"
      >
        <option value="all">All Status</option>
        <option value="low">⚠️ Low Stock</option>
        <option value="out">❌ Out of Stock</option>
        <option value="in">✅ In Stock</option>
      </select>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th class="p-4 font-medium">Product Name</th>
              <th class="p-4 font-medium">Brand</th>
              <th class="p-4 font-medium">Category</th>
              <th class="p-4 font-medium text-right">Current Stock</th>
              <th class="p-4 font-medium text-center">Status</th>
              <th class="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="p-8 text-center text-gray-500">No products found matching criteria.</td>
            </tr>
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition group">
              <td class="p-4 font-medium text-gray-900">{{ product.name }}</td>
              <td class="p-4 text-gray-600">{{ product.brand }}</td>
              <td class="p-4 text-gray-500 text-xs">
                <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded">{{ product.category }}</span>
              </td>
              <td class="p-4 text-right font-mono text-gray-900 font-bold">{{ product.stock }}</td>
              <td class="p-4 text-center">
                <span :class="getStatusBadge(product.stock).class">
                  {{ getStatusBadge(product.stock).label }}
                </span>
              </td>
              <td class="p-4 text-right">
                <button 
                  @click="openRestockModal(product)"
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

    <div v-if="showRestockModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-2">Restock Product</h3>
          <p class="text-sm text-gray-500 mb-6">
            Adding inventory for <span class="font-semibold text-gray-800">{{ selectedProduct?.name }}</span>.
            <br>Current Level: {{ selectedProduct?.stock }} units.
          </p>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Add Quantity</label>
              <input 
                v-model.number="restockAmount" 
                type="number" 
                min="1" 
                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. 50"
                @keyup.enter="confirmRestock"
              />
            </div>
          </div>
        </div>
        
        <div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button 
            @click="closeModal" 
            class="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button 
            @click="confirmRestock" 
            :disabled="restockAmount <= 0 || isUpdating"
            class="px-4 py-2 bg-indigo-900 text-white font-medium rounded-lg hover:bg-indigo-800 transition shadow-sm disabled:opacity-50 flex items-center"
          >
            <span v-if="isUpdating" class="animate-spin h-3 w-3 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
            Confirm Restock
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { adminService } from '@/services/adminService'
import productService from '@/services/productService'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Types (Simplified for this view)
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  stock: number;
}

// State
const products = ref<Product[]>([])
const searchQuery = ref('')
const statusFilter = ref('all')
const showRestockModal = ref(false)
const selectedProduct = ref<Product | null>(null)
const restockAmount = ref<number | null>(null)
const isUpdating = ref(false)

// Logic: Status Badges
const getStatusBadge = (stock: number) => {
  if (stock === 0) return { label: '❌ Out of Stock', class: 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200' }
  if (stock <= 5) return { label: '⚠️ Low Stock', class: 'bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200' }
  return { label: '✅ In Stock', class: 'bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200' }
}

// Logic: Filter & Sort
const filteredProducts = computed(() => {
  let result = products.value

  // 1. Search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q)
    )
  }

  // 2. Status Filter
  if (statusFilter.value !== 'all') {
    result = result.filter(p => {
      if (statusFilter.value === 'out') return p.stock === 0
      if (statusFilter.value === 'low') return p.stock > 0 && p.stock <= 5
      if (statusFilter.value === 'in') return p.stock > 5
      return true
    })
  }

  // 3. Sort (Ascending by Stock - Urgent items first)
  return result.sort((a, b) => a.stock - b.stock)
})

// Logic: Low Stock Counter
const lowStockCount = computed(() => {
  return products.value.filter(p => p.stock <= 5).length
})

// Actions
const fetchProducts = async () => {
  try {
    const res = await adminService.getProducts({ page: 0, size: 200, search: '' }) // Get a large batch
    products.value = res.data.content || res.data
  } catch (err) {
    console.error("Failed to load inventory", err)
  }
}

// Modal Actions
const openRestockModal = (product: Product) => {
  selectedProduct.value = product
  restockAmount.value = null
  showRestockModal.value = true
}

const closeModal = () => {
  showRestockModal.value = false
  selectedProduct.value = null
  restockAmount.value = null
}

const confirmRestock = async () => {
  if (!selectedProduct.value || !restockAmount.value || restockAmount.value <= 0) return

  isUpdating.value = true
  try {
    // Get fresh product data
    const freshDataRes = await productService.getProductById(selectedProduct.value.id)
    const freshProduct = freshDataRes.data
    
    // Calculate new stock
    const newStock = freshProduct.stock + restockAmount.value
    
    // Update backend using productService (for updates)
    await productService.updateProduct(selectedProduct.value.id, {
      ...freshProduct,
      stock: newStock
    })

    // Update UI locally
    const pIndex = products.value.findIndex(p => p.id === selectedProduct.value?.id)
    if (pIndex !== -1) {
      products.value[pIndex].stock = newStock
    }

    alert(`✅ ${selectedProduct.value.name} restocked (+${restockAmount.value} units)`)
    closeModal()
  } catch (error) {
    console.error("Restock failed", error)
    alert("Failed to update stock. Please try again.")
  } finally {
    isUpdating.value = false
  }
}

// PDF Generation
const generatePDF = () => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(18)
  doc.text("Warehouse Inventory Report", 14, 22)
  doc.setFontSize(11)
  doc.setTextColor(100)
  doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 30)

  // Table Data
  const tableData = filteredProducts.value.map(p => [
    p.name,
    p.brand,
    p.category,
    p.stock,
    p.stock === 0 ? 'Out of Stock' : (p.stock <= 5 ? 'Low Stock' : 'In Stock')
  ])

  // AutoTable
  autoTable(doc, {
    startY: 40,
    head: [['Product Name', 'Brand', 'Category', 'Stock', 'Status']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [40, 5, 89] }, // Your brand color (Purple)
    styles: { fontSize: 10 },
    columnStyles: {
      3: { halign: 'right' }
    }
  })

  // Save
  doc.save(`Inventory_Report_${new Date().toISOString().slice(0,10)}.pdf`)
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
/* Simple fade in animation for alert */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>