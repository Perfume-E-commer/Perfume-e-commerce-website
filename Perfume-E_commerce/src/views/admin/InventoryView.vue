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
      @toggleStatus="handleToggleStatus"
    />

    <div v-if="showRestockModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all animate-fade-in-up">
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-1">Restock Product</h3>
          <p class="text-sm text-gray-500 mb-6">
            Updating stock for <span class="font-medium text-gray-900">{{ selectedProduct?.name }}</span>
            <span v-if="selectedVariant" class="text-indigo-600 font-bold"> ({{ selectedVariant.size }})</span>
          </p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Quantity to Add</label>
              <div class="flex items-center gap-3">
                <button @click="restockAmount = Math.max(1, restockAmount - 1)" class="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition">-</button>
                <input v-model.number="restockAmount" type="number" class="flex-1 text-center font-mono font-bold text-lg border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50" min="1">
                <button @click="restockAmount++" class="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition">+</button>
              </div>
            </div>

            <div class="bg-indigo-50 rounded-lg p-3 flex justify-between items-center text-sm text-indigo-900">
               <span>Current Stock:</span>
               <span class="font-bold">{{ getCurrentStock() }}</span>
            </div>
            
             <div class="bg-green-50 rounded-lg p-3 flex justify-between items-center text-sm text-green-900">
               <span>New Total:</span>
               <span class="font-bold">{{ getCurrentStock() + restockAmount }}</span>
            </div>
          </div>

          <div class="mt-8 flex gap-3">
            <button @click="closeRestockModal" class="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">Cancel</button>
            <button 
              @click="confirmRestock" 
              :disabled="isUpdating"
              class="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              <svg v-if="isUpdating" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span v-else>Confirm Restock</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="showAddBrandModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 class="text-lg font-bold mb-4">Add New Brand</h3>
            <input v-model="newBrandName" type="text" placeholder="Brand Name" class="w-full border p-2 rounded mb-4">
            <div class="flex justify-end gap-2">
                <button @click="showAddBrandModal = false" class="px-4 py-2 text-gray-500">Cancel</button>
                <button @click="saveNewBrand" class="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import productService from '../../services/productService' 
import InventoryFilterBar from '../../components/admin/inventory/InventoryFilterBar.vue'
import InventoryTable from '../../components/admin/inventory/InventoryTable.vue'
import { generateInventoryReport } from '../../utils/inventoryReportGenerator'

// State
const products = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const activeBrand = ref('All')
const activeCategory = ref('All')
const activeStatus = ref('All')

// Restock State
const showRestockModal = ref(false)
const selectedProduct = ref<any>(null)
const selectedVariant = ref<any>(null) 
const restockAmount = ref(10)
const isUpdating = ref(false)

// Brand Modal State
const showAddBrandModal = ref(false)
const newBrandName = ref('')
const localBrands = ref<string[]>([])

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await productService.getAllProducts(0, 1000) 
    if (res.data && res.data.content) {
      products.value = res.data.content
    }
  } catch (error) {
    console.error("Failed to fetch inventory", error)
  } finally {
    loading.value = false
  }
}

// Derived State for Filters
const uniqueBrands = computed(() => {
  const apiBrands = Array.from(new Set(products.value.map(p => p.brand))).sort()
  return [...new Set([...localBrands.value, ...apiBrands])]
})

const uniqueCategories = computed(() => {
  return Array.from(new Set(products.value.map(p => p.category))).sort()
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesBrand = activeBrand.value === 'All' || p.brand === activeBrand.value
    const matchesCategory = activeCategory.value === 'All' || p.category === activeCategory.value
    
    // Status Filter Logic (Simplified for global status)
    let matchesStatus = true
    if (activeStatus.value !== 'All') {
       const isLow = p.stock <= (p.minStockLevel || 5)
       const isOut = p.stock === 0
       if (activeStatus.value === 'Low Stock') matchesStatus = isLow && !isOut
       if (activeStatus.value === 'Out of Stock') matchesStatus = isOut
       if (activeStatus.value === 'In Stock') matchesStatus = !isLow && !isOut
    }

    return matchesSearch && matchesBrand && matchesCategory && matchesStatus
  })
})

const handleSort = (field: string) => {
  products.value.sort((a, b) => {
    if (field === 'stock') return b.stock - a.stock
    return a[field].localeCompare(b[field])
  })
}

const openRestockModal = (product: any, variant: any = null) => {
  selectedProduct.value = JSON.parse(JSON.stringify(product)) // Deep copy to avoid direct mutation
  selectedVariant.value = variant ? JSON.parse(JSON.stringify(variant)) : null
  restockAmount.value = 10
  showRestockModal.value = true
}

const getCurrentStock = () => {
  if (selectedVariant.value) {
    return selectedVariant.value.stock
  }
  return selectedProduct.value?.stock || 0
}

const closeRestockModal = () => {
  showRestockModal.value = false
  selectedProduct.value = null
  selectedVariant.value = null
}

const confirmRestock = async () => {
  if (!selectedProduct.value || !restockAmount.value) return
  isUpdating.value = true
  
  try {
    const pId = selectedProduct.value.id
    
    if (selectedVariant.value) {
      const vIndex = selectedProduct.value.variants.findIndex((v: any) => v.size === selectedVariant.value.size)
      if (vIndex !== -1) {
        selectedProduct.value.variants[vIndex].stock += restockAmount.value
      }
      selectedProduct.value.stock = selectedProduct.value.variants.reduce((acc: number, v: any) => acc + v.stock, 0)
    } else {
      selectedProduct.value.stock += restockAmount.value
    }

    await productService.updateProduct(pId, selectedProduct.value)
    
    await fetchProducts()
    
    closeRestockModal()
  } catch (e) {
    console.error(e)
    alert("Failed to restock. Please try again.")
  } finally {
    isUpdating.value = false
  }
}

const handleToggleStatus = async (product: any) => {
  try {
    const newStatus = !product.active
    const p = products.value.find(item => item.id === product.id)
    if (p) p.active = newStatus
    
    await productService.updateProduct(product.id, { ...product, active: newStatus })
  } catch (e) {
    alert("Failed to update status")
    fetchProducts()
  }
}

const saveNewBrand = () => {
  if (newBrandName.value.trim()) {
    localBrands.value.push(newBrandName.value.trim())
    activeBrand.value = newBrandName.value.trim() 
    showAddBrandModal.value = false
    newBrandName.value = ''
    alert("Brand added to list! You can now assign it to products.")
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  activeBrand.value = 'All'
  activeCategory.value = 'All'
  activeStatus.value = 'All'
}

const generatePDF = () => {
  generateInventoryReport(filteredProducts.value)
}

onMounted(fetchProducts)
</script>