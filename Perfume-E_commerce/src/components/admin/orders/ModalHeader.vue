<template>
  <div class="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
    <div>
      <div class="flex items-center gap-3">
        <h2 class="text-xl font-bold text-gray-900">
          {{ order.orderNumber || 'Order #' + order.id.slice(-6).toUpperCase() }}
        </h2>
        <span class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</span>
      </div>
      <p class="text-sm text-gray-500 mt-1">
        Customer: <span class="font-medium text-gray-900">{{ getCustomerName(order) }}</span>
      </p>
    </div>
    <button
      @click="$emit('close')"
      class="text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full shadow-sm hover:shadow transition"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  order: any
}>()

defineEmits(['close'])

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('en-GB')
}

const getCustomerName = (order: any) => {
  if (order.user && order.user.firstName)
    return `${order.user.firstName} ${order.user.lastName || ''}`.trim()
  if (order.shippingAddress && order.shippingAddress.fullName) return order.shippingAddress.fullName
  return 'Guest Customer'
}
</script>