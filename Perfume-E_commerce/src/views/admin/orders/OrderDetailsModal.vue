<template>
  <div v-if="isOpen && order" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
      <div class="p-6 border-b border-gray-100 flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-gray-900">Order #{{ order.id.slice(-6).toUpperCase() }}</h3>
          <p class="text-xs text-gray-500 mt-1">Placed on {{ formatDate(order.createdAt) }}</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="block text-gray-500 text-xs uppercase tracking-wider mb-1">Customer</span>
            <span class="font-medium text-gray-900">{{ order.email || order.userEmail }}</span>
          </div>
          <div>
            <span class="block text-gray-500 text-xs uppercase tracking-wider mb-1">Total</span>
            <span class="font-bold text-indigo-600">{{ formatCurrency(order.totalAmount) }}</span>
          </div>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Shipping Details</h4>
          <p class="text-sm text-gray-800 leading-relaxed">
            {{ order.shippingAddress?.fullName }}<br>
            {{ order.shippingAddress?.addressLine1 }}<br>
            <span v-if="order.shippingAddress?.addressLine2">{{ order.shippingAddress?.addressLine2 }}<br></span>
            {{ order.shippingAddress?.city }}, {{ order.shippingAddress?.postalCode }}<br>
            {{ order.shippingAddress?.country }}
          </p>
        </div>

        <div>
          <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Items Purchased</h4>
          <div class="space-y-3">
            <div v-for="item in order.orderItems" :key="item.id" class="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
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
              <span v-if="order.status === 'CONFIRMED'">Order confirmed. Processing for shipment.</span>
              <span v-if="order.status === 'SHIPPED'">Shipped on {{ formatDate(order.updatedAt || new Date().toISOString()) }} - Out for delivery.</span>
              <span v-if="order.status === 'DELIVERED'">Delivered. Package left at front door.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  order: any,
  isOpen: boolean
}>()

defineEmits(['close'])

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
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