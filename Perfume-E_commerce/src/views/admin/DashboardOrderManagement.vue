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

    <NavFilter />

    <div class="bg-white rounded-lg shadow-md overflow-hidden mt-6">
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
              <td colspan="7" class="px-6 py-4 text-center">Loading orders...</td>
            </tr>

            <tr v-else-if="orders.length === 0">
              <td colspan="7" class="px-6 py-4 text-center">No orders found.</td>
            </tr>

            <tr v-for="order in orders" :key="order.id" class="bg-white border-b hover:bg-gray-50">
              
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ order.orderNumber || order.id.substring(0, 8) }}
              </td>

              <td class="px-6 py-4">
                {{ order.shippingAddress?.fullName || 'Unknown User' }}
              </td>

              <td class="px-6 py-4">
                <div v-for="item in order.items" :key="item.productName" class="text-xs">
                  {{ item.quantity }}x {{ item.productName }}
                </div>
              </td>

              <td class="px-6 py-4">
                {{ formatCurrency(order.totalAmount) }}
              </td>

              <td class="px-6 py-4">
                {{ formatDate(order.createdAt) }}
              </td>

              <td class="px-6 py-4">
                <span :class="getStatusColor(order.status)" class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ order.status }}
                </span>
              </td>

              <td class="px-6 py-4">
                <select
                  @change="handleStatusChange(order.id, ($event.target as HTMLSelectElement).value)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                  :value="order.status"
                >
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import adminService, { type AdminOrder } from '@/services/adminService';
import NavFilter from '../components/NavFilter.vue';
import ButtonRectangle from '@/views/components/ButtonRectangle.vue';

// State
const orders = ref<AdminOrder[]>([]);
const isLoading = ref(false);

// Formatters
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString() + ' ' + new Date(dateStr).toLocaleTimeString();
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
const loadOrders = async () => {
  isLoading.value = true;
  try {
    const response = await adminService.getAllOrders();
    // Sort by newest first
    orders.value = response.data.reverse(); 
  } catch (error) {
    console.error("Failed to load orders", error);
    alert("Failed to load orders");
  } finally {
    isLoading.value = false;
  }
};

const handleStatusChange = async (orderId: string, newStatus: string) => {
  if (!confirm(`Change order status to ${newStatus}?`)) {
    // Revert visual change if cancelled (optional complexity, skipping for now)
    await loadOrders(); 
    return;
  }

  try {
    await adminService.updateOrderStatus(orderId, newStatus);
    alert('Status updated successfully!');
    await loadOrders(); // Refresh to ensure sync
  } catch (error) {
    console.error("Failed to update status", error);
    alert("Failed to update status");
  }
};

// Init
onMounted(() => {
  loadOrders();
});
</script>