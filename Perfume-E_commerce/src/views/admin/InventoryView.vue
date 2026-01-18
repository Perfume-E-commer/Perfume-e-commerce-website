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
      @viewHistory="openHistoryModal"
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

    <div v-if="showHistoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Stock History</h3>
            <p class="text-sm text-gray-500">Recent movements for <span class="font-medium text-gray-900">{{ selectedProduct?.name }}</span></p>
          </div>
          <button @click="showHistoryModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div class="overflow-y-auto p-0">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0">
              <tr>
                <th class="px-6 py-3">Date</th>
                <th class="px-6 py-3">Action</th>
                <th class="px-6 py-3 text-right">Change</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="(log, i) in historyLogs" :key="i" class="hover:bg-gray-50">
                <td class="px-6 py-3 text-gray-600">{{ log.date }}</td>
                <td class="px-6 py-3 font-medium text-gray-900">{{ log.reason }}</td>
                <td class="px-6 py-3 text-right font-mono font-bold" :class="log.change > 0 ? 'text-green-600' : 'text-red-600'">
                  {{ log.change > 0 ? '+' : '' }}{{ log.change }}
                </td>
              </tr>
              <tr v-if="historyLogs.length === 0">
                <td colspan="3" class="px-6 py-8 text-center text-gray-400">No recent history found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 border-t border-gray-100 bg-gray-50 text-right">
          <button @click="showHistoryModal = false" class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700">Close</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import productService from '../../services/productService' 
import adminService from '../../services/adminService'
import InventoryFilterBar from '../../components/admin/inventory/InventoryFilterBar.vue'
import InventoryTable from '../../components/admin/inventory/InventoryTable.vue'
import { generateInventoryReport } from '../../utils/inventoryReportGenerator'

const products = ref<any[]>([])
const loading = ref(true)
const searchQuery = ref('')
const activeBrand = ref('All')
const activeCategory = ref('All')
const activeStatus = ref('All')

const showRestockModal = ref(false)
const selectedProduct = ref<any>(null)
const selectedVariant = ref<any>(null) 
const restockAmount = ref(10)
const isUpdating = ref(false)

const showAddBrandModal = ref(false)
const newBrandName = ref('')
const localBrands = ref<string[]>([])

const showHistoryModal = ref(false)
const historyLogs = ref<any[]>([])

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await adminService.getAllProducts(0, 1000) 
    if (res.data && res.data.content) {
      products.value = res.data.content
    }
  } catch (error) {
    console.error("Failed to fetch inventory", error)
  } finally {
    loading.value = false
  }
}
const uniqueBrands = computed(() => {
  const apiBrands = Array.from(new Set(products.value.map(p => p.brand))).sort()
  return [...new Set([...localBrands.value, ...apiBrands])]
})

const uniqueCategories = computed(() => {
  return Array.from(new Set(products.value.map(p => p.category))).sort()
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch = !query || 
                          p.name.toLowerCase().includes(query) || 
                          p.brand.toLowerCase().includes(query);

    const matchesBrand = activeBrand.value === 'All' || p.brand === activeBrand.value;

    const matchesCategory = activeCategory.value === 'All' || p.category === activeCategory.value;
    
    let matchesStatus = true;
    
    const effectiveStock = (p.variants && p.variants.length > 0) 
        ? p.variants.reduce((acc: number, v: any) => acc + v.stock, 0)
        : p.stock;

    const threshold = p.minStockLevel || 5;

    if (activeStatus.value !== 'All') {
       const isOut = effectiveStock === 0;
       const isLow = effectiveStock <= threshold && !isOut;
       
       if (activeStatus.value === 'Low Stock') matchesStatus = isLow;
       else if (activeStatus.value === 'Out of Stock') matchesStatus = isOut;
       else if (activeStatus.value === 'In Stock') matchesStatus = !isLow && !isOut;
    }

    return matchesSearch && matchesBrand && matchesCategory && matchesStatus;
  })
})

const handleSort = (field: string) => {
  products.value.sort((a, b) => {
    if (field === 'stock') return b.stock - a.stock
    return a[field].localeCompare(b[field])
  })
}

const openRestockModal = (product: any, variant: any = null) => {
  selectedProduct.value = JSON.parse(JSON.stringify(product))
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
  const originalStatus = product.active
  const newStatus = !originalStatus

  try {
    const p = products.value.find(item => item.id === product.id)
    if (p) p.active = newStatus
    await adminService.updateProductStatus(product.id, newStatus)
  } catch (error) {
    const p = products.value.find(item => item.id === product.id)
    if (p) p.active = originalStatus
    alert("Failed to update status. Please try again.")
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

const openHistoryModal = async (product: any) => {
  selectedProduct.value = product
  showHistoryModal.value = true
  historyLogs.value = [] 

  try {
    const res = await adminService.getProductHistory(product.id)
    if (res.data) {
      historyLogs.value = res.data.map((log: any) => ({
         date: new Date(log.createdAt).toLocaleDateString() + ' ' + new Date(log.createdAt).toLocaleTimeString(),
         reason: log.reason,
         change: log.quantityChange
      }))
    }
  } catch (e) {
    console.error("Failed to load history", e)
    historyLogs.value = []
  }
}

onMounted(fetchProducts)
</script>