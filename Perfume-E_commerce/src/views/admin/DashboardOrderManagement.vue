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
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Refresh
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs">
            <tr>
              <th class="px-6 py-4">Order #</th>
              <th class="px-6 py-4">Customer Email</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Total</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">Loading orders...</td>
            </tr>
            <tr v-else-if="orders.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">No orders found.</td>
            </tr>

            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition group">
              <td class="px-6 py-4">
                <button @click="openDetailsModal(order)" class="font-mono text-indigo-600 font-medium hover:underline">
                  #{{ order.id.slice(-6).toUpperCase() }}
                </button>
              </td>
              <td class="px-6 py-4 text-gray-900">{{ order.email || order.userEmail || 'Guest' }}</td>
              <td class="px-6 py-4 text-gray-500">{{ formatDate(order.createdAt) }}</td>
              <td class="px-6 py-4 font-medium text-gray-900">{{ formatCurrency(order.totalAmount) }}</td>
              <td class="px-6 py-4 text-center">
                <span :class="['px-2.5 py-1 rounded-full text-xs font-bold border', getStatusClasses(order.status)]">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button 
                  @click="openStatusModal(order)"
                  class="text-indigo-600 hover:text-indigo-900 font-medium text-xs border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg transition hover:bg-indigo-100"
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
        <span class="text-xs text-gray-500">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
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
    </div>

    <div v-if="showDetailsModal && selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
        <div class="p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Order #{{ selectedOrder.id.slice(-6).toUpperCase() }}</h3>
            <p class="text-xs text-gray-500 mt-1">Placed on {{ formatDate(selectedOrder.createdAt) }}</p>
          </div>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="block text-gray-500 text-xs uppercase tracking-wider mb-1">Customer</span>
              <span class="font-medium text-gray-900">{{ selectedOrder.email || selectedOrder.userEmail }}</span>
            </div>
            <div>
              <span class="block text-gray-500 text-xs uppercase tracking-wider mb-1">Total</span>
              <span class="font-bold text-indigo-600">{{ formatCurrency(selectedOrder.totalAmount) }}</span>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Shipping Details</h4>
            <p class="text-sm text-gray-800 leading-relaxed">
              {{ selectedOrder.shippingAddress?.fullName }}<br>
              {{ selectedOrder.shippingAddress?.addressLine1 }}<br>
              <span v-if="selectedOrder.shippingAddress?.addressLine2">{{ selectedOrder.shippingAddress?.addressLine2 }}<br></span>
              {{ selectedOrder.shippingAddress?.city }}, {{ selectedOrder.shippingAddress?.postalCode }}<br>
              {{ selectedOrder.shippingAddress?.country }}
            </p>
          </div>

          <div>
            <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Items Purchased</h4>
            <div class="space-y-3">
              <div v-for="item in selectedOrder.orderItems" :key="item.id" class="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 overflow-hidden">
                    <img v-if="item.productImage" :src="item.productImage" class="w-full h-full object-cover">
                    <span v-else>Img</span>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ item.productName }}</div>
                    <div class="text-xs text-gray-500">{{ item.size || 'Standard' }} x {{ item.quantity }}</div>
                  </div>
                </div>
                <div class="font-medium text-gray-900">{{ formatCurrency(item.price * item.quantity) }}</div>
              </div>
            </div>
          </div>

          <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex items-start gap-3">
            <svg class="w-5 h-5 text-indigo-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <h4 class="text-sm font-bold text-indigo-900">Delivery Status</h4>
              <p class="text-xs text-indigo-700 mt-1">
                <span v-if="selectedOrder.status === 'CONFIRMED'">Order confirmed. Processing for shipment.</span>
                <span v-if="selectedOrder.status === 'SHIPPED'">Shipped on {{ formatDate(selectedOrder.updatedAt || new Date()) }} - Out for delivery.</span>
                <span v-if="selectedOrder.status === 'DELIVERED'">Delivered. Package left at front door.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showStatusModal && selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in">
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Update Order Status</h3>
          <p class="text-sm text-gray-600 mb-4">
            Order #{{ selectedOrder.id.slice(-6).toUpperCase() }} is currently 
            <span class="font-bold">{{ selectedOrder.status }}</span>.
          </p>
          
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">New Status</label>
          <select 
            v-model="newStatus" 
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none mb-6"
          >
            <option disabled value="">Select Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="SHIPPED">Shipped (Notify User)</option>
            <option value="DELIVERED">Delivered (Notify User)</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <div class="flex gap-3 justify-end">
             <button @click="closeModals" class="px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Cancel</button>
             <button 
               @click="confirmStatusUpdate" 
               :disabled="!newStatus || newStatus === selectedOrder.status || isUpdating"
               class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
             >
               <span v-if="isUpdating" class="animate-spin h-3 w-3 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
               Update Status
             </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import adminService from '@/services/adminService'

// Types (simplified)
interface Order {
  id: string;
  email?: string;
  userEmail?: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
  shippingAddress?: any;
  orderItems?: any[];
}

// State
const orders = ref<Order[]>([])
const isLoading = ref(false)
const isUpdating = ref(false)
const currentPage = ref(0)
const totalPages = ref(0)
const totalElements = ref(0)
const pageSize = 10
const statusFilter = ref('')

// Modals
const showDetailsModal = ref(false)
const showStatusModal = ref(false)
const selectedOrder = ref<Order | null>(null)
const newStatus = ref('')

// Actions
const loadOrders = async () => {
  isLoading.value = true
  try {
    // If your backend supports status filtering in params, add it here.
    // For MVP, we might fetch all and filter client side OR use a dedicated endpoint
    // Assuming adminService.getAllOrders accepts basic pagination
    const response = await adminService.getAllOrders({
      page: currentPage.value,
      size: pageSize,
      search: '' // Optional search
    })
    
    // Handle Page<Order> structure
    const content = response.data.content || response.data
    
    // Client-side filtering if backend doesn't support status param yet
    if (statusFilter.value) {
      orders.value = content.filter((o: Order) => o.status === statusFilter.value)
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

// Modal Logic
const openDetailsModal = (order: Order) => {
  selectedOrder.value = order
  showDetailsModal.value = true
}

const openStatusModal = (order: Order) => {
  selectedOrder.value = order
  newStatus.value = order.status // Default to current
  showStatusModal.value = true
}

const closeModals = () => {
  showDetailsModal.value = false
  showStatusModal.value = false
  selectedOrder.value = null
  newStatus.value = ''
}

const confirmStatusUpdate = async () => {
  if (!selectedOrder.value || !newStatus.value) return
  
  isUpdating.value = true
  try {
    await adminService.updateOrderStatus(selectedOrder.value.id, newStatus.value)
    
    // Update local state
    const index = orders.value.findIndex(o => o.id === selectedOrder.value?.id)
    if (index !== -1) {
      orders.value[index].status = newStatus.value
      // Optional: Update updatedDate
      orders.value[index].updatedAt = new Date().toISOString()
    }
    
    // Backend triggers notification automatically
    alert(`Order #${selectedOrder.value.id.slice(-6).toUpperCase()} updated to ${newStatus.value}`)
    closeModals()
  } catch (error) {
    console.error("Update failed", error)
    alert("Failed to update status")
  } finally {
    isUpdating.value = false
  }
}

// Helpers
const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
const getStatusClasses = (status: string) => {
  switch (status) {
    case 'CONFIRMED': return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'SHIPPED': return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'DELIVERED': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'CANCELLED': return 'bg-red-50 text-red-700 border-red-200'
    default: return 'bg-gray-50 text-gray-700 border-gray-200'
  }
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>