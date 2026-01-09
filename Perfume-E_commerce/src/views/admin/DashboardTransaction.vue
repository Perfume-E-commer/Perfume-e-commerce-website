<template>
  <div class="p-6 space-y-6 min-h-screen bg-gray-50/50">
    
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Financial Overview</h1>
        <p class="text-sm text-gray-500 mt-1">Track revenue, transactions, and download invoices.</p>
      </div>
      <button 
        @click="loadData" 
        class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center shadow-sm text-sm font-medium"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        Refresh Data
      </button>
    </div>

    <TransactionStats :stats="computedStats" />

    <TransactionFilters 
      v-model:filters="filters" 
      @reset="resetFilters"
    />

    <TransactionTable 
      :transactions="filteredTransactions" 
      :is-loading="isLoading"
      @view="openDetails"
    />

    <OrderDetailsModal 
      :isOpen="showModal" 
      :order="selectedTransaction" 
      @close="closeModal"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import adminService from '../../services/adminService'

// Import the components we built
import TransactionStats from './financial/TransactionStats.vue'
import TransactionFilters from './financial/TransactionFilters.vue'
import TransactionTable from './financial/TransactionTable.vue'
// Reuse the modal from Order Management
import OrderDetailsModal from './orders/OrderDetailsModal.vue'

// --- State ---
const rawTransactions = ref<any[]>([]) // Holds all data fetched from API
const isLoading = ref(false)
const showModal = ref(false)
const selectedTransaction = ref(null)

// Filters State
const filters = ref({
  search: '',
  startDate: '',
  endDate: '',
  paymentMethod: '',
  status: ''
})

// --- Logic ---

// 1. Fetch Data
const loadData = async () => {
  isLoading.value = true
  try {
    // We fetch a larger page size to perform client-side filtering/stats for the Financial Overview
    // In a real large-scale app, you'd move these filters to the backend API parameters.
    const response = await adminService.getAllOrders({ page: 0, size: 200, search: '' })
    const content = response.data.content || response.data
    rawTransactions.value = content
  } catch (error) {
    console.error("Failed to load transactions", error)
  } finally {
    isLoading.value = false
  }
}

// 2. Filtering Logic (Computed)
const filteredTransactions = computed(() => {
  return rawTransactions.value.filter(tx => {
    // Search (Name or Email)
    const searchLower = filters.value.search.toLowerCase()
    const name = `${tx.user?.firstName || ''} ${tx.user?.lastName || ''}`.toLowerCase()
    const email = (tx.email || tx.user?.email || '').toLowerCase()
    const matchesSearch = !searchLower || name.includes(searchLower) || email.includes(searchLower)

    // Status
    const matchesStatus = !filters.value.status || tx.status === filters.value.status

    // Payment Method (Mocking checks if backend doesn't send it yet)
    // Assuming backend might send 'paymentMethod' field, or we default to 'Credit Card' for now
    const txMethod = tx.paymentMethod || 'Credit Card'
    const matchesPayment = !filters.value.paymentMethod || txMethod === filters.value.paymentMethod

    // Date Range
    let matchesDate = true
    if (filters.value.startDate || filters.value.endDate) {
      const txDate = new Date(tx.createdAt).getTime()
      if (filters.value.startDate) {
        matchesDate = matchesDate && txDate >= new Date(filters.value.startDate).getTime()
      }
      if (filters.value.endDate) {
        // Add one day to include the end date fully
        const end = new Date(filters.value.endDate)
        end.setHours(23, 59, 59, 999)
        matchesDate = matchesDate && txDate <= end.getTime()
      }
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate
  })
})

// 3. Stats Calculation (Computed based on Filters)
const computedStats = computed(() => {
  const data = filteredTransactions.value
  
  const totalRevenue = data.reduce((sum, tx) => sum + (tx.totalAmount || 0), 0)
  const totalOrders = data.length
  
  // Count unique emails
  const uniqueEmails = new Set(data.map(tx => tx.email || tx.user?.email || 'guest')).size
  
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return {
    totalRevenue,
    totalOrders,
    uniqueCustomers: uniqueEmails,
    avgOrderValue
  }
})

// --- Actions ---

const resetFilters = () => {
  filters.value = {
    search: '',
    startDate: '',
    endDate: '',
    paymentMethod: '',
    status: ''
  }
}

const openDetails = (tx: any) => {
  selectedTransaction.value = tx
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedTransaction.value = null
}

// --- Lifecycle ---
onMounted(() => {
  loadData()
})
</script>