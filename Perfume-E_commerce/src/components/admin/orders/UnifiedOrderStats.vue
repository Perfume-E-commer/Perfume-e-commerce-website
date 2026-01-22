<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-indigo-100 transition-colors"
    >
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-1">
          {{ formatCurrency(stats.totalRevenue) }}
        </h3>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span
          class="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
        >
          All Time
        </span>
      </div>
    </div>

    <div
      class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-indigo-100 transition-colors"
    >
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stats.totalOrders }}</h3>
      </div>
      <div class="mt-3 text-xs text-gray-500">
        <span class="font-medium text-gray-900">{{ stats.avgOrderValue }}</span> avg. per order
      </div>
    </div>

    <div
      class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-indigo-100 transition-colors relative overflow-hidden"
    >
      <div class="absolute right-0 top-0 p-4 opacity-5">
        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          />
          <path
            d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"
          />
        </svg>
      </div>

      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">To Ship (Confirmed)</p>
        <h3 class="text-2xl font-bold text-indigo-600 mt-1">{{ stats.pendingShipment }}</h3>
      </div>
      <div class="mt-3 flex items-center gap-2">
        <span v-if="stats.pendingShipment > 0" class="flex h-2 w-2 relative">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"
          ></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span class="text-xs text-indigo-600 font-medium">Requires Action</span>
      </div>
    </div>

    <div
      class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-indigo-100 transition-colors"
    >
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Payment</p>
        <h3 class="text-2xl font-bold text-amber-600 mt-1">{{ stats.pendingPayment }}</h3>
      </div>
      <div class="mt-3 text-xs text-gray-500">Orders marked as Unpaid</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  stats: {
    totalRevenue: number
    totalOrders: number
    pendingShipment: number // Count of 'CONFIRMED' status
    pendingPayment: number // Count of 'PENDING' payment status
  }
}>()

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
</script>
