<template>
  <div class="p-4 md:p-6 space-y-6 min-h-screen bg-gray-50/50">
    
    <div>
      <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Warehouse Inventory</h1>
      <p class="text-sm text-gray-500 mt-1">Monitor stock levels, manage brands, and restock products.</p>
    </div>

    <InventoryFilterBar 
      v-model:searchQuery="searchQuery"
      v-model:activeBrand="activeBrand"
      v-model:activeCategory="activeCategory"
      v-model:activeStatus="activeStatus"
      :uniqueBrands="uniqueBrands"
      :uniqueCategories="uniqueCategories"
      @reset-filters="resetFilters"
      @refresh="fetchProducts"
      @download="generatePDF"
      @add-brand="showAddBrandModal = true"
    />

    <InventoryTable 
      :products="filteredProducts"
      :loading="loading"
      @sort="handleSort"
      @restock="openRestockModal"
    />

    <div v-if="showRestockModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-fade-in-up">
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-2">Restock Product</h3>
          <p class="text-sm text-gray-500 mb-6">
            Adding inventory for <span class="font-semibold text-gray-800">{{ selectedProduct?.name }}</span>.
            <br>Current Level: <span class="font-mono font-bold">{{ selectedProduct?.stock }}</span> units.
          </p>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Add Quantity</label>
            <input 
              v-model.number="restockAmount" 
              type="number" 
              min="1" 
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="e.g. 50"
              @keyup.enter="confirmRestock"
            />
          </div>
        </div>
        
        <div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button @click="closeRestockModal" class="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">Cancel</button>
          <button 
            @click="confirmRestock" 
            :disabled="!restockAmount || restockAmount <= 0 || isUpdating"
            class="px-4 py-2 bg-indigo-900 text-white font-medium rounded-lg hover:bg-indigo-800 transition shadow-sm disabled:opacity-50 flex items-center"
          >
            <span v-if="isUpdating" class="animate-spin h-3 w-3 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
            Confirm Restock
          </button>
        </div>
      </div>
    </div>

    <div v-if="showAddBrandModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Add New Brand</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
              <input v-model="newBrandName" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Chanel" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email (Optional)</label>
              <input type="email" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="contact@brand.com" />
            </div>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button @click="showAddBrandModal = false" class="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">Cancel</button>
          <button @click="saveNewBrand" class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm">Save Brand</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { adminService } from '@/services/adminService'
import { productService } from '@/services/apiProduct' // For updates
import InventoryFilterBar from '@/components/admin/InventoryFilterBar.vue'
import InventoryTable from '@/components/admin/InventoryTable.vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// --- State ---
const products = ref<any[]>([])
const loading = ref(false)

// Filter State
const searchQuery = ref('')
const activeBrand = ref('')
const activeCategory = ref('')
const activeStatus = ref('all')

// Modal State
const showRestockModal = ref(false)
const showAddBrandModal = ref(false)
const selectedProduct = ref<any>(null)
const restockAmount = ref<number | null>(null)
const isUpdating = ref(false)
const newBrandName = ref('')

// Manual list of extra brands (since we don't have a backend table for brands yet)
const localBrands = ref<string[]>([]) 

// --- Computed Data ---

// Extract Unique Lists for Dropdowns
const uniqueBrands = computed(() => {
  const dbBrands = products.value.map(p => p.brand).filter(Boolean)
  return [...new Set([...dbBrands, ...localBrands.value])].sort()
})

const uniqueCategories = computed(() => {
  const cats = products.value.map(p => p.category).filter(Boolean)
  return [...new Set(cats)].sort()
})

// Filter Logic
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

  // 2. Filters
  if (activeBrand.value) result = result.filter(p => p.brand === activeBrand.value)
  if (activeCategory.value) result = result.filter(p => p.category === activeCategory.value)
  
  // 3. Status
  if (activeStatus.value !== 'all') {
    result = result.filter(p => {
      if (activeStatus.value === 'out') return p.stock === 0
      if (activeStatus.value === 'low') return p.stock > 0 && p.stock <= 5
      if (activeStatus.value === 'in') return p.stock > 5
      return true
    })
  }

  return result
})

// --- Methods ---

const fetchProducts = async () => {
  loading.value = true
  try {
    // Fetch ALL for client-side filtering (common pattern for admin tables < 1000 items)
    const res = await adminService.getProducts({ page: 0, size: 500, search: '' })
    products.value = res.data.content || res.data || []
  } catch (err) {
    console.error("Failed to load inventory", err)
  } finally {
    loading.value = false
  }
}

const handleSort = (field: string) => {
  // Simple toggle sort for client-side data
  products.value.sort((a, b) => {
    if (a[field] < b[field]) return -1
    if (a[field] > b[field]) return 1
    return 0
  })
}

const resetFilters = () => {
  searchQuery.value = ''
  activeBrand.value = ''
  activeCategory.value = ''
  activeStatus.value = 'all'
}

// Restock Logic
const openRestockModal = (product: any) => {
  selectedProduct.value = product
  restockAmount.value = null
  showRestockModal.value = true
}

const closeRestockModal = () => {
  showRestockModal.value = false
  selectedProduct.value = null
}

const confirmRestock = async () => {
  if (!selectedProduct.value || !restockAmount.value) return
  isUpdating.value = true
  
  try {
    // Optimistic Update
    const oldStock = selectedProduct.value.stock
    const newStock = oldStock + restockAmount.value
    
    // Call API
    await productService.updateProduct(selectedProduct.value.id, {
      ...selectedProduct.value,
      stock: newStock
    })
    
    // Update Local Data
    const p = products.value.find(p => p.id === selectedProduct.value.id)
    if (p) p.stock = newStock
    
    closeRestockModal()
    alert(`Restock Successful! New stock: ${newStock}`)
  } catch (e) {
    alert("Failed to restock. Please try again.")
  } finally {
    isUpdating.value = false
  }
}

// Add Brand Logic
const saveNewBrand = () => {
  if (newBrandName.value.trim()) {
    localBrands.value.push(newBrandName.value.trim())
    activeBrand.value = newBrandName.value.trim() // Auto-select it
    showAddBrandModal.value = false
    newBrandName.value = ''
    alert("Brand added to list! You can now assign it to products.")
  }
}

// PDF Export
const generatePDF = () => {
  const doc = new jsPDF()
  doc.text("Inventory Report", 14, 20)
  
  const tableData = filteredProducts.value.map(p => [
    p.name, p.brand, p.category, p.stock, p.stock === 0 ? 'Out' : 'In'
  ])

  autoTable(doc, {
    startY: 30,
    head: [['Name', 'Brand', 'Category', 'Stock', 'Status']],
    body: tableData,
  })
  
  doc.save('inventory.pdf')
}

onMounted(fetchProducts)
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>