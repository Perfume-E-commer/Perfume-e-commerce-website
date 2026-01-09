<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Revenue</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-2">{{ formatCurrency(stats.totalRevenue) }}</h3>
      </div>
      <div class="mt-4 flex items-center text-xs text-emerald-600 font-medium bg-emerald-50 w-fit px-2 py-1 rounded-full">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        <span>All time</span>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Orders</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-2">{{ stats.totalOrders }}</h3>
      </div>
      <div class="mt-4 flex items-center text-xs text-blue-600 font-medium bg-blue-50 w-fit px-2 py-1 rounded-full">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        <span>Processed</span>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Unique Customers</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-2">{{ stats.uniqueCustomers }}</h3>
      </div>
      <div class="mt-4 flex items-center text-xs text-purple-600 font-medium bg-purple-50 w-fit px-2 py-1 rounded-full">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        <span>Active Buyers</span>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg. Order Value</p>
        <h3 class="text-2xl font-bold text-gray-900 mt-2">{{ formatCurrency(stats.avgOrderValue) }}</h3>
      </div>
      <div class="mt-4 flex items-center text-xs text-amber-600 font-medium bg-amber-50 w-fit px-2 py-1 rounded-full">
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
        <span>Per Transaction</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// Props definition
defineProps<{
  stats: {
    totalRevenue: number;
    totalOrders: number;
    uniqueCustomers: number;
    avgOrderValue: number;
  }
}>();

// Utility
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};
</script>