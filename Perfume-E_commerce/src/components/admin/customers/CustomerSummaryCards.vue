<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition hover:shadow-md">
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Customers</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.totalCustomers }}</p>
      </div>
      <div class="p-3 bg-indigo-50 rounded-lg text-indigo-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition hover:shadow-md">
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg. Spend</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">${{ formatCurrency(stats.avgSpend) }}</p>
      </div>
      <div class="p-3 bg-emerald-50 rounded-lg text-emerald-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition hover:shadow-md">
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Loyal Customers</p>
        <div class="flex items-end gap-2">
          <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.returningCustomers }}</p>
          <span class="text-xs text-green-600 font-medium mb-1 bg-green-50 px-1.5 py-0.5 rounded">
            {{ calculatePercentage(stats.returningCustomers, stats.totalCustomers) }}%
          </span>
        </div>
      </div>
      <div class="p-3 bg-blue-50 rounded-lg text-blue-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between transition hover:shadow-md">
      <div>
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">New This Month</p>
        <p class="text-2xl font-bold text-gray-900 mt-1">{{ stats.newThisMonth }}</p>
      </div>
      <div class="p-3 bg-amber-50 rounded-lg text-amber-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { CustomerStats } from '@/services/customerService';

const props = defineProps<{
  stats: CustomerStats
}>();

const formatCurrency = (value: number) => {
  return (value || 0).toFixed(2);
};

const calculatePercentage = (part: number, total: number) => {
  if (!total || total === 0) return 0;
  return Math.round((part / total) * 100);
};
</script>