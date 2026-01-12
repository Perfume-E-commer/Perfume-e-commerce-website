<template>
  <div class="p-6 space-y-6 min-h-screen bg-gray-50/50">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Order Command Center</h1>
        <p class="text-sm text-gray-500 mt-1">
          Manage shipments, track revenue, and process payments.
        </p>
      </div>
      <button
        @click="loadData"
        class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center shadow-sm text-sm font-medium"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        Refresh Data
      </button>
    </div>

    <UnifiedOrderStats :stats="computedStats" />

    <UnifiedOrderFilters v-model:filters="filters" @reset="resetFilters" />

    <div class="space-y-4">
      <UnifiedOrderTable
        :orders="paginatedOrders"
        :is-loading="isLoading"
        @open-modal="openModal"
      />

      <div
        v-if="filteredOrders.length > pageSize"
        class="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-xl shadow-sm"
      >
        <span class="text-sm text-gray-700">
          Showing <span class="font-medium">{{ currentPage * pageSize + 1 }}</span> to
          <span class="font-medium">{{
            Math.min((currentPage + 1) * pageSize, filteredOrders.length)
          }}</span>
          of <span class="font-medium">{{ filteredOrders.length }}</span> results
        </span>
        <div class="flex gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 0"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            @click="currentPage++"
            :disabled="(currentPage + 1) * pageSize >= filteredOrders.length"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <OrderManagementModal
      :show="isModalOpen"
      :order="selectedOrder"
      @close="closeModal"
      @update-status="handleStatusUpdate"
      @toggle-payment="handlePaymentToggle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import adminService from '../../services/adminService'

// Component Imports
import UnifiedOrderStats from '../../components/admin/orders/UnifiedOrderStats.vue'
import UnifiedOrderFilters from '../../components/admin/orders/UnifiedOrderFilters.vue'
import UnifiedOrderTable from '../../components/admin/orders/UnifiedOrderTable.vue'
import OrderManagementModal from '../../components/admin/orders/OrderManagementModal.vue'

// --- State ---
const rawOrders = ref<any[]>([]) // All loaded data
const isLoading = ref(false)
const currentPage = ref(0)
const pageSize = 10

// Modal State
const isModalOpen = ref(false)
const selectedOrder = ref<any>(null)

// Filters State
const filters = ref({
  search: '',
  startDate: '',
  endDate: '',
  paymentMethod: '',
  status: '',
})

const handleStatusUpdate = async (orderId: string, newStatus: string) => {
  try {
    await adminService.updateOrderStatus(orderId, newStatus);
    loadData(); // Refresh data
  } catch (error) {
    console.error("Failed to update order status", error);
    alert("Failed to update order status");
  }
};

const handlePaymentToggle = async (orderId: string, newStatus: string) => {
  try {
    await adminService.updatePaymentStatus(orderId, newStatus);
    loadData(); // Refresh data
  } catch (error) {
    console.error("Failed to update payment status", error);
    alert("Failed to update payment status");
  }
};

// --- Logic ---

// 1. Fetch Data (Load a large batch for local analysis)
const loadData = async () => {
  isLoading.value = true
  try {
    // Fetch 200 items to allow decent local filtering without constant API calls
    const response = await adminService.getAllOrders({
      page: 0,
      size: 200,
      search: '',
    })
    const content = response.data.content || response.data
    rawOrders.value = content
  } catch (error) {
    console.error('Failed to load orders', error)
  } finally {
    isLoading.value = false
  }
}

// 2. Filter Logic (The Brains)
const filteredOrders = computed(() => {
  return (
    rawOrders.value
      .filter((order) => {
        // Search (ID, Name, Email)
        const q = filters.value.search.toLowerCase()
        const idMatches = order.id && order.id.toLowerCase().includes(q)
        const nameMatches = (order.user?.firstName + ' ' + order.user?.lastName)
          .toLowerCase()
          .includes(q)
        const emailMatches = (order.email || order.user?.email || '').toLowerCase().includes(q)
        const searchMatch = !q || idMatches || nameMatches || emailMatches

        // Status Match
        const statusMatch = !filters.value.status || order.status === filters.value.status

        // Payment Method Match
        const methodMatch =
          !filters.value.paymentMethod ||
          (order.paymentMethod || 'Credit Card') === filters.value.paymentMethod

        // Date Range Match
        let dateMatch = true
        if (filters.value.startDate || filters.value.endDate) {
          const orderDate = new Date(order.createdAt).getTime()
          if (filters.value.startDate) {
            dateMatch = dateMatch && orderDate >= new Date(filters.value.startDate).getTime()
          }
          if (filters.value.endDate) {
            const end = new Date(filters.value.endDate)
            end.setHours(23, 59, 59, 999)
            dateMatch = dateMatch && orderDate <= end.getTime()
          }
        }

        return searchMatch && statusMatch && methodMatch && dateMatch
      })
      // Sort by Newest First
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  )
})

// 3. Stats Calculation (Reactive to filters)
const computedStats = computed(() => {
  const data = filteredOrders.value

  const totalRevenue = data.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
  const totalOrders = data.length
  const pendingShipment = data.filter((o) => o.status === 'CONFIRMED').length
  const pendingPayment = data.filter((o) => (o.paymentStatus || 'PAID') === 'PENDING').length // Default PAID
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0

  return {
    totalRevenue,
    totalOrders,
    pendingShipment,
    pendingPayment,
    avgOrderValue: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      avgOrderValue,
    ),
  }
})

// 4. Local Pagination
const paginatedOrders = computed(() => {
  const start = currentPage.value * pageSize
  const end = start + pageSize
  return filteredOrders.value.slice(start, end)
})

// Reset page on filter change
watch(
  filters,
  () => {
    currentPage.value = 0
  },
  { deep: true },
)

// --- Actions ---

const resetFilters = () => {
  filters.value = {
    search: '',
    startDate: '',
    endDate: '',
    paymentMethod: '',
    status: '',
  }
}

const openModal = (order: any) => {
  selectedOrder.value = order
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedOrder.value = null
}

onMounted(() => {
  loadData()
})
</script>
