<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm whitespace-nowrap">
        <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs">
          <tr>
            <th class="px-6 py-4">Order #</th>
            <th class="px-6 py-4">Customer</th>
            <th class="px-6 py-4">Date</th>
            <th class="px-6 py-4">Items</th>
            <th class="px-6 py-4 text-right">Subtotal</th>
            <th class="px-6 py-4 text-right">Discount</th>
            <th class="px-6 py-4 text-right">Tax</th>
            <th class="px-6 py-4 text-right font-bold text-gray-900">Total</th>
            <th class="px-6 py-4">Payment</th>
            <th class="px-6 py-4 text-center">Status</th>
            <th class="px-6 py-4 text-right sticky right-0 bg-gray-50 shadow-sm">Actions</th>
          </tr>
        </thead>
        
        <tbody class="divide-y divide-gray-100">
          <tr v-if="isLoading">
            <td colspan="11" class="px-6 py-12 text-center text-gray-500">
              <span class="inline-block animate-pulse">Loading financial records...</span>
            </td>
          </tr>
          <tr v-else-if="transactions.length === 0">
            <td colspan="11" class="px-6 py-12 text-center text-gray-500">
              No transactions found matching your filters.
            </td>
          </tr>

          <tr v-for="t in transactions" :key="t.id" class="hover:bg-gray-50 transition group">
            <td class="px-6 py-4 font-mono text-xs text-indigo-600 font-bold">
              #{{ t.id.slice(-6).toUpperCase() }}
            </td>

            <td class="px-6 py-4">
              <div class="flex flex-col">
                <span class="font-medium text-gray-900">{{ t.customerName || 'Guest' }}</span>
                <span class="text-xs text-gray-500">{{ t.email || t.userEmail }}</span>
              </div>
            </td>

            <td class="px-6 py-4 text-gray-500">
              {{ formatDate(t.createdAt) }}
            </td>

            <td class="px-6 py-4 text-gray-600 max-w-xs truncate" :title="getItemSummary(t.orderItems)">
              {{ getItemSummary(t.orderItems) }}
            </td>

            <td class="px-6 py-4 text-right text-gray-600">{{ formatCurrency(t.subtotal || t.totalAmount) }}</td>
            <td class="px-6 py-4 text-right text-red-500">{{ t.discountAmount ? '-' + formatCurrency(t.discountAmount) : '-' }}</td>
            <td class="px-6 py-4 text-right text-gray-600">{{ formatCurrency(t.tax || 0) }}</td>
            <td class="px-6 py-4 text-right font-bold text-emerald-700 bg-emerald-50/30">
              {{ formatCurrency(t.totalAmount) }}
            </td>

            <td class="px-6 py-4">
              <span class="flex items-center gap-2 text-gray-700">
                <svg v-if="t.paymentMethod === 'Credit Card'" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                <svg v-else class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                {{ t.paymentMethod || 'Credit Card' }}
              </span>
            </td>

            <td class="px-6 py-4 text-center">
              <span :class="getStatusClasses(t.status)">
                {{ t.status }}
              </span>
            </td>

            <td class="px-6 py-4 text-right sticky right-0 bg-white shadow-sm border-l border-gray-100 group-hover:bg-gray-50">
              <div class="flex items-center justify-end gap-2">
                <button 
                  @click="$emit('view', t)"
                  class="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                  title="View Details"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
                <button 
                  @click="$emit('download-pdf', t)"
                  class="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Download Invoice"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  transactions: any[];
  isLoading: boolean;
}>();

defineEmits(['view', 'download-pdf']);

// --- Helpers ---

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getItemSummary = (items: any[]) => {
  if (!items || items.length === 0) return 'No items';
  // Example: "Midnight Oud (1x), Velvet Rose (2x)"
  return items.map(i => `${i.productName} (${i.quantity}x)`).join(', ');
};

const getStatusClasses = (status: string) => {
  const base = "px-2.5 py-1 rounded-full text-xs font-bold border ";
  switch (status) {
    case 'CONFIRMED': return base + "bg-blue-50 text-blue-700 border-blue-200";
    case 'SHIPPED': return base + "bg-amber-50 text-amber-700 border-amber-200";
    case 'DELIVERED': return base + "bg-emerald-50 text-emerald-700 border-emerald-200";
    case 'CANCELLED': return base + "bg-red-50 text-red-700 border-red-200";
    default: return base + "bg-gray-50 text-gray-700 border-gray-200";
  }
};
</script>