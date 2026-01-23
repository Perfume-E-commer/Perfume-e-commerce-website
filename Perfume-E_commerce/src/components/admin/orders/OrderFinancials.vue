<template>
  <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
      Financials
    </h3>
    <div class="space-y-3 text-sm">
      <div class="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>{{ formatCurrency(order.subtotal || order.totalAmount) }}</span>
      </div>
      <div v-if="order.discountAmount > 0" class="flex justify-between text-emerald-600">
        <span>Discount ({{ order.promoCodeUsed || 'CODE' }})</span>
        <span>-{{ formatCurrency(order.discountAmount) }}</span>
      </div>
      <div class="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span>{{ order.shippingCost ? formatCurrency(order.shippingCost) : '$0.00' }}</span>
      </div>
      <div class="pt-3 border-t border-gray-200 flex justify-between items-center">
        <span class="font-bold text-gray-900">Total</span>
        <span class="font-bold text-xl text-indigo-900">
          {{ formatCurrency((order.subtotal || 0) + (order.shippingCost || 0) - (order.discountAmount || 0)) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  order: any
}>()

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0)
</script>