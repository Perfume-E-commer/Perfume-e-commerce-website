<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Order Management</h1>
      <button 
        @click="loadOrders" 
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Refresh Orders
      </button>
    </div>

    <!-- START UPDATE: Replace existing search bar with provided structure -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="relative max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
          placeholder="Search by Order ID (e.g., 545F5B8)..."
        />
      </div>
    </div>
    <!-- END UPDATE -->

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Order ID</th>
              <th scope="col" class="px-6 py-3">Customer</th>
              <th scope="col" class="px-6 py-3">Items</th>
              <th scope="col" class="px-6 py-3">Total</th>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="7" class="px-6 py-8 text-center">
                <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                <div class="mt-2 text-gray-500">Loading orders...</div>
              </td>
            </tr>

            <tr v-else-if="orders.length === 0">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                No orders found matching "{{ searchQuery }}".
              </td>
            </tr>

            <tr v-for="order in orders" :key="order.id" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                #{{ order.orderNumber || order.id.substring(0, 8).toUpperCase() }}
              </td>

              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="font-medium text-gray-900">{{ order.shippingAddress?.fullName || 'Guest' }}</span>
                  <span class="text-xs text-gray-400">{{ order.userEmail || 'No Email' }}</span>
                </div>
              </td>

              <td class="px-6 py-4">
                <div class="max-h-16 overflow-y-auto">
                  <div v-for="item in order.items" :key="item.productName" class="text-xs mb-1">
                    <span class="font-bold">{{ item.quantity }}x</span> {{ item.productName }}
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 font-semibold text-gray-900">
                {{ formatCurrency(order.totalAmount) }}
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                {{ formatDate(order.createdAt) }}
              </td>

              <td class="px-6 py-4">
                <span :class="getStatusColor(order.status)" class="px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ order.status }}
                </span>
              </td>

              <td class="px-6 py-4">
                <select
                  @change="handleStatusChange(order.id, ($event.target as HTMLSelectElement).value)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-1.5"
                  :value="order.status"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <span class="text-sm text-gray-700">
          Page <span class="font-medium">{{ currentPage + 1 }}</span>
        </span>
        <div class="flex gap-2">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 0"
            class="px-3 py-1 border rounded bg-white text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Prev
          </button>
          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="orders.length < pageSize"
            class="px-3 py-1 border rounded bg-white text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import adminService, { type AdminOrder } from '@/services/adminService';

// State
const orders = ref<AdminOrder[]>([]);
const isLoading = ref(false);
// START UPDATE: Ensure search query state is properly defined (already present)
const searchQuery = ref('');
const currentPage = ref(0);
const pageSize = ref(10);
// END UPDATE

// Formatters
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString(undefined, { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
    case 'SHIPPED': return 'bg-purple-100 text-purple-800';
    case 'DELIVERED': return 'bg-green-100 text-green-800';
    case 'CANCELLED': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Actions
// START UPDATE: The loadOrders function already has search param support
const loadOrders = async () => {
  isLoading.value = true;
  try {
    const response = await adminService.getAllOrders({
      page: currentPage.value,
      size: pageSize.value,
      search: searchQuery.value
    });
    
    // Handle Page<Order> structure
    if (response.data && response.data.content) {
      orders.value = response.data.content;
    } else {
      // Fallback if backend returns list directly
      orders.value = response.data; 
    }
  } catch (error) {
    console.error("Failed to load orders", error);
  } finally {
    isLoading.value = false;
  }
};
// END UPDATE

// Debounced Search
// START UPDATE: handleSearch function is already implemented and working
let searchTimeout: ReturnType<typeof setTimeout>;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 0;
    loadOrders();
  }, 300);
};
// END UPDATE

const changePage = (newPage: number) => {
  if (newPage >= 0) {
    currentPage.value = newPage;
    loadOrders();
  }
};

const handleStatusChange = async (orderId: string, newStatus: string) => {
  if (!confirm(`Change order status to ${newStatus}?`)) {
    await loadOrders(); // Revert UI
    return;
  }

  try {
    await adminService.updateOrderStatus(orderId, newStatus);
    const order = orders.value.find(o => o.id === orderId);
    if (order) order.status = newStatus;
  } catch (error) {
    console.error("Failed to update status", error);
    alert("Failed to update status");
    await loadOrders(); 
  }
};

onMounted(() => {
  loadOrders();
});
</script>