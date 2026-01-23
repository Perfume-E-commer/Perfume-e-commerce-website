<template>
  <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-6">
    <div>
      <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
        >Fulfillment Status</label
      >
      <div class="relative">
        <select
          :value="order.status"
          @change="$emit('update-status', $event)"
          :disabled="isUpdating"
          class="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
        >
          <option value="PENDING">🕒 Pending</option>
          <option value="CONFIRMED">✅ Confirmed</option>
          <option value="SHIPPED">🚚 Shipped</option>
          <option value="DELIVERED">📦 Delivered</option>
          <option value="CANCELLED">❌ Cancelled</option>
        </select>
        <div
          class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>

    <div>
      <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
        >Payment Status</label
      >
      <div
        class="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200"
      >
        <span
          :class="[
            'text-xs font-bold px-2 py-1 rounded',
            getPaymentClass(order.paymentStatus),
          ]"
        >
          {{ order.paymentStatus === 'PENDING' ? 'UNPAID' : order.paymentStatus }}
        </span>

        <button
          v-if="canTogglePayment(order)"
          @click="$emit('toggle-payment')"
          :disabled="isUpdating"
          class="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline px-2"
        >
          Toggle to {{ order.paymentStatus === 'PAID' ? 'Unpaid' : 'Paid' }}
        </button>

        <span v-else class="text-xs text-gray-400 px-2 flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Verified
        </span>
      </div>
    </div>

    <button
      @click="$emit('download-invoice')"
      class="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Invoice
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  order: any
  isUpdating: boolean
}>()

defineEmits(['update-status', 'toggle-payment', 'download-invoice'])

const canTogglePayment = (order: any) => {
  const method = order.paymentMethod || 'Credit Card'
  return method.toLowerCase().includes('cash')
}

const getPaymentClass = (status: string) => {
  const s = status || 'PAID'
  if (s === 'PAID') return 'text-emerald-700 bg-emerald-100'
  if (s === 'PENDING') return 'text-amber-700 bg-amber-100'
  return 'text-red-700 bg-red-100'
}
</script>