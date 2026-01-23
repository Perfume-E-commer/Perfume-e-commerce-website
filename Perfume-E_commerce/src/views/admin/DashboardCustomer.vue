<template>
  <div class="p-6 space-y-8 min-h-screen bg-gray-50/50">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Customer Management</h1>
        <p class="text-sm text-gray-500 mt-1">View, search, and analyze customer behavior.</p>
      </div>

      <div class="text-xs text-gray-400">Last updated: {{ lastUpdated }}</div>
    </div>

    <div v-if="isLoading && !customers.length" class="flex justify-center items-center py-24">
      <div
        class="animate-spin h-10 w-10 border-2 border-indigo-600 border-t-transparent rounded-full"
      ></div>
    </div>

    <div v-else class="space-y-8 animate-fade-in">
      <CustomerSummaryCards :stats="stats" />

      <CustomerTable
        :customers="customers"
        v-model:searchQuery="searchQuery"
        :filters="filters"
        @update-filter="handleFilterChange"
        @view-details="openCustomerDetails"
        @export="handleExport"
      />

      <div v-if="totalPages > 1" class="flex justify-center mt-6">
        <nav class="flex items-center gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 0"
            class="px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <span class="text-sm text-gray-600 font-medium">
            Page {{ currentPage + 1 }} of {{ totalPages }}
          </span>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= totalPages - 1"
            class="px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </nav>
      </div>
    </div>

    <CustomerDetailModal
      :is-open="isModalOpen"
      :is-loading="isModalLoading"
      :customer="selectedCustomer"
      :orders="selectedCustomerOrders"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import customerService, {
  type Customer,
  type CustomerStats,
  type CustomerOrderHistory,
} from '../../services/customerService'
import CustomerSummaryCards from '../../components/admin/customers/CustomerSummaryCards.vue'
import CustomerTable from '../../components/admin/customers/CustomerTable.vue'
import CustomerDetailModal from '../../components/admin/customers/CustomerDetailModal.vue'

// --- State ---
const isLoading = ref(true)
const lastUpdated = ref(new Date().toLocaleTimeString())

// Data
const customers = ref<Customer[]>([])
const stats = ref<CustomerStats>({
  totalCustomers: 0,
  avgSpend: 0,
  returningCustomers: 0,
  newThisMonth: 0,
})

// Filters & Pagination
const searchQuery = ref('')
const currentPage = ref(0)
const pageSize = ref(10)
const totalPages = ref(0)
const filters = ref({
  orderCount: '',
  spendingTier: '',
})

// Modal State
const isModalOpen = ref(false)
const isModalLoading = ref(false)
const selectedCustomer = ref<Customer | null>(null)
const selectedCustomerOrders = ref<CustomerOrderHistory[]>([])

// --- Actions ---

const loadData = async () => {
  isLoading.value = true
  try {
    // Parallel Fetch: Get List AND Stats
    const [customersRes, statsRes] = await Promise.allSettled([
      customerService.getCustomers({
        page: currentPage.value,
        size: pageSize.value,
        search: searchQuery.value,
        filters: filters.value,
      }),
      customerService.getCustomerStats(),
    ])

    // Handle Customers List
    if (customersRes.status === 'fulfilled') {
      const data = customersRes.value.data
      // Handle Spring Page vs Direct Array logic
      if (Array.isArray(data)) {
        customers.value = data
      } else {
        customers.value = data.content || []
        totalPages.value = data.totalPages || data.page?.totalPages || 0
      }
    }

    // Handle Stats
    if (statsRes.status === 'fulfilled') {
      stats.value = statsRes.value.data
    }

    lastUpdated.value = new Date().toLocaleTimeString()
  } catch (error) {
    console.error('Failed to load dashboard data', error)
  } finally {
    isLoading.value = false
  }
}

// Filter Handling
let searchTimeout: ReturnType<typeof setTimeout>
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 0
    loadData()
  }, 400) // Debounce search
})

const handleFilterChange = (key: 'orderCount' | 'spendingTier', value: string) => {
  filters.value[key] = value
  currentPage.value = 0 // Reset to page 1 on filter change
  loadData()
}

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage
    loadData()
  }
}

const handleExport = async () => {
  try {
    const response = await customerService.exportCustomers()
    // Create download link for Blob
    const url = window.URL.createObjectURL(new Blob([response.data as any]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `customers_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Export failed', error)
    alert('Export failed. Please try again.')
  }
}

const openCustomerDetails = async (customer: Customer) => {
  selectedCustomer.value = customer
  isModalOpen.value = true
  isModalLoading.value = true
  selectedCustomerOrders.value = []

  try {
    const response = await customerService.getCustomerDetails(customer.id)
    if (response.data.orders) {
      selectedCustomerOrders.value = response.data.orders
    } else if (Array.isArray(response.data)) {
      selectedCustomerOrders.value = response.data as unknown as CustomerOrderHistory[]
    }
  } catch (error) {
    console.error('Failed to load details', error)
    // Fallback: If detail fetch fails, we still show the basic info from the table row
  } finally {
    isModalLoading.value = false
  }
}

const closeModal = () => {
  isModalOpen.value = false
  selectedCustomer.value = null
}

// Init
onMounted(() => {
  loadData()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>
