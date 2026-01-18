<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs">
          <tr>
            <th class="px-6 py-4">Order #</th>
            <th class="px-6 py-4">Customer</th>
            <th class="px-6 py-4">Date</th>
            <th class="px-6 py-4 text-right">Total</th>
            <th class="px-6 py-4 text-center">Payment</th>
            <th class="px-6 py-4 text-center">Fulfillment</th>
            <th class="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100">
          <tr v-if="isLoading">
            <td colspan="7" class="px-6 py-12 text-center text-gray-500">
              <div class="flex flex-col items-center justify-center">
                <svg class="animate-spin h-6 w-6 text-indigo-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading orders...</span>
              </div>
            </td>
          </tr>

          <tr v-else-if="orders.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-gray-500">
              No orders found matching your filters.
            </td>
          </tr>

          <tr 
            v-for="order in orders" 
            :key="order.id" 
            class="hover:bg-gray-50 transition group cursor-pointer"
            @click="$emit('open-modal', order)"
          >
            <td class="px-6 py-4 font-mono text-indigo-600 font-bold text-xs">
              {{ order.orderNumber || '#' + (order.id ? order.id.slice(-6).toUpperCase() : '---') }}
            </td>

            <td class="px-6 py-4">
              <div class="flex flex-col">
                <span class="font-medium text-gray-900">{{ getCustomerName(order) }}</span>
                <span class="text-xs text-gray-400">{{ getCustomerEmail(order) }}</span>
              </div>
            </td>

            <td class="px-6 py-4 text-gray-500 whitespace-nowrap">
              {{ formatDate(order.createdAt) }}
            </td>

            <td class="px-6 py-4 text-right font-bold text-gray-900">
              {{ formatCurrency(order.totalAmount) }}
            </td>

            <td class="px-6 py-4">
              <div class="flex flex-col items-center gap-1">
                <span :class="['px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide', getPaymentStatusClasses(order.paymentStatus)]">
                  {{ order.paymentStatus || 'PAID' }}DTO to match the rich data structure your Frontend expects (Recent Orders, Charts, etc.).
                </span>
                <span class="text-[10px] text-gray-400 uppercase">{{ order.paymentMethod || 'Credit Card' }}</span>
              </div>
            </td>

            <td class="px-6 py-4 text-center">
              <span :class="['px-2.5 py-1 rounded-full text-xs font-bold border', getOrderStatusClasses(order.status)]">
                {{ order.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-right">
              <button 
                class="text-indigo-600 hover:text-indigo-900 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
              >
                Manage
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  orders: any[],
  isLoading: boolean
}>();

defineEmits(['open-modal']);

const getCustomerName = (order: any) => {
  if (order.shippingAddress && order.shippingAddress.fullName) {
    return order.shippingAddress.fullName;
  }
  if (order.user && order.user.firstName) {
    return `${order.user.firstName} ${order.user.lastName || ''}`.trim();
  }
  return 'Guest Customer';
};

const getCustomerEmail = (order: any) => {
  if (order.userEmail) return order.userEmail;
  if (order.email) return order.email;
  if (order.user && order.user.email) return order.user.email;
  return 'No Email';
};

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Styles for Order Status
const getOrderStatusClasses = (status: string) => {
  switch (status) {
    case 'CONFIRMED': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'SHIPPED': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'DELIVERED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'CANCELLED': return 'bg-red-50 text-red-700 border-red-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

// Styles for Payment Status
const getPaymentStatusClasses = (status: string) => {
  const s = status || 'PAID'; 
  switch (s) {
    case 'PAID': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'FAILED': return 'bg-red-50 text-red-700 border-red-100';
    default: return 'bg-gray-50 text-gray-700 border-gray-100';
  }
};
</script>