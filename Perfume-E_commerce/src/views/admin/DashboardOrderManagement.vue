<template>
  <div class="p-6 space-y-6 min-h-screen bg-gray-50/50">
    
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Order Management</h1>
        <p class="text-sm text-gray-500 mt-1">
          Total Orders: <span class="font-bold text-indigo-600">{{ totalElements }}</span>
        </p>
      </div>
      
      <div class="flex gap-3">
        <select 
          v-model="statusFilter" 
          @change="currentPage = 0; loadOrders()"
          class="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none"
        >
          <option value="">All Statuses</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <button 
          @click="loadOrders" 
          class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center shadow-sm text-sm font-medium"
        >
          Refresh
        </button>
      </div>
    </div>

    <OrderTable 
      :orders="orders" 
      :is-loading="isLoading"
      @view-details="openDetailsModal"
      @update-status="openStatusModal"
    />

    <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-xl shadow-sm border-x border-b border-gray-100 -mt-2">
      <span class="text-xs text-gray-500">Page {{ currentPage + 1 }} of {{ totalPages || 1 }}</span>
      <div class="flex gap-2">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 0"
          class="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 text-xs hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage >= totalPages - 1"
          class="px-3 py-1 rounded border border-gray-300 bg-white text-gray-600 text-xs hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <OrderDetailsModal 
      :isOpen="showDetailsModal" 
      :order="selectedOrder" 
      @close="closeModals"
    />

    <OrderStatusModal 
      :isOpen="showStatusModal" 
      :order="selectedOrder" 
      :is-updating="isUpdating"
      @close="closeModals"
      @confirm="confirmStatusUpdate"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import adminService from '../../services/adminService'
import OrderTable from './orders/OrderTable.vue'
import OrderDetailsModal from './orders/OrderDetailsModal.vue'
import OrderStatusModal from './orders/OrderStatusModal.vue'

// State
const orders = ref<any[]>([])
const isLoading = ref(false)
const isUpdating = ref(false)
const currentPage = ref(0)
const totalPages = ref(0)
const totalElements = ref(0)
const statusFilter = ref('')

// Modals State
const showDetailsModal = ref(false)
const showStatusModal = ref(false)
const selectedOrder = ref<any>(null)

// Actions
const loadOrders = async () => {
  isLoading.value = true
  try {
    const response = await adminService.getAllOrders({
      page: currentPage.value,
      size: 10,
      search: ''
    })
    
    const content = response.data.content || response.data
    if (statusFilter.value) {
      orders.value = content.filter((o: any) => o.status === statusFilter.value)
    } else {
      orders.value = content
    }
    
    totalElements.value = response.data.totalElements || orders.value.length
    totalPages.value = response.data.totalPages || 1
  } catch (error) {
    console.error("Failed to fetch orders", error)
  } finally {
    isLoading.value = false
  }
}

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage
    loadOrders()
  }
}

// Modal Handlers
const openDetailsModal = (order: any) => {
  selectedOrder.value = order
  showDetailsModal.value = true
}

const openStatusModal = (order: any) => {
  selectedOrder.value = order
  showStatusModal.value = true
}

const closeModals = () => {
  showDetailsModal.value = false
  showStatusModal.value = false
  selectedOrder.value = null
}

const confirmStatusUpdate = async (newStatus: string) => {
  if (!selectedOrder.value) return
  
  isUpdating.value = true
  try {
    await adminService.updateOrderStatus(selectedOrder.value.id, newStatus)
    
    // Optimistic Update
    const index = orders.value.findIndex(o => o.id === selectedOrder.value?.id)
    if (index !== -1) {
      orders.value[index].status = newStatus
      orders.value[index].updatedAt = new Date().toISOString()
    }
    
    alert(`Order updated to ${newStatus}`)
    closeModals()
  } catch (error) {
    console.error("Update failed", error)
    alert("Failed to update status")
  } finally {
    isUpdating.value = false
  }
}

onMounted(() => {
  loadOrders()
})
</script>