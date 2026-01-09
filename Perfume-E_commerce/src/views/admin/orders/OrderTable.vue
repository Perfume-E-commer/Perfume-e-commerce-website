<template>
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
              <button 
                @click="$emit('view-details', order)" 
                class="font-mono text-indigo-600 font-medium hover:underline"
              >
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
                @click="$emit('update-status', order)"
                class="text-indigo-600 hover:text-indigo-900 font-medium text-xs border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-lg transition hover:bg-indigo-100"
              >
                Update
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  orders: any[],
  isLoading: boolean
}>()

defineEmits(['view-details', 'update-status'])

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
</script>