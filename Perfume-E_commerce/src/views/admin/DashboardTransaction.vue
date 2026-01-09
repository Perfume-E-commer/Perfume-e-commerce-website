<template>
  <div class="p-6 space-y-8 min-h-screen bg-gray-50/50">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <p class="text-sm text-gray-500">Track revenue and transaction statuses.</p>
      </div>
      <button 
        @click="loadBillingData" 
        class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh Data
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Total_inOrder 
          total_name="Total Revenue" 
          :total_value="formatCurrency(stats.totalRevenue)" 
          rate_fluctuation="Lifetime" 
          sub_text="Calculated from all time orders"
        />
        
        <Total_inOrder
          total_name="Successful Orders"
          :total_value="stats.completedCount.toString()"
          rate_fluctuation="Paid status"
        />
        
        <Total_inOrder
          total_name="Pending Payments"
          :total_value="stats.pendingCount.toString()"
          rate_fluctuation="Action needed"
          sub_text="Requires admin verification"
        />
        
        <Total_inOrder
          total_name="Cancelled / Void"
          :total_value="stats.cancelledCount.toString()"
          rate_fluctuation="Lost revenue"
        />
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-gray-900 font-medium mb-4">Transaction Status</h3>
        <TransactionChart :stats="stats" />
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-900">Recent Transactions</h3>
        
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search Order ID..."
            class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-64"
          />
          <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
            <tr>
              <th class="px-6 py-4">Transaction ID</th>
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Date</th>
              <th class="px-6 py-4">Method</th>
              <th class="px-6 py-4">Amount</th>
              <th class="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">Loading transactions...</td>
            </tr>
            <tr v-else-if="records.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">No transactions found.</td>
            </tr>

            <tr v-for="record in records" :key="record.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 font-mono text-indigo-600 font-medium">
                #{{ (record.orderNumber || record.id).slice(-8).toUpperCase() }}
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="text-gray-900">{{ record.customerEmail || 'Guest' }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-500">
                {{ formatDate(record.createdAt || record.date) }}
              </td>
              <td class="px-6 py-4 text-gray-500">
                 Credit Card
              </td>
              <td class="px-6 py-4 font-bold text-gray-900">
                {{ formatCurrency(record.totalAmount) }}
              </td>
              <td class="px-6 py-4">
                <span :class="getStatusClasses(record.paymentStatus)">
                  {{ record.paymentStatus || 'PENDING' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
        <span class="text-xs text-gray-500 self-center mr-4">Showing recent 10 transactions</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import adminService from '@/services/adminService';
import Total_inOrder from '@/views/components/Total_inOrder.vue';
import TransactionChart from '@/views/components/TransactionChart.vue';

// State
const records = ref<any[]>([]); 
const isLoading = ref(false);
const searchQuery = ref('');

// Computed Stats
const stats = computed(() => {
  const totalRevenue = records.value.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
  const completedCount = records.value.filter(r => r.paymentStatus === 'PAID').length;
  // If paymentStatus is null/undefined, treat as PENDING for now
  const pendingCount = records.value.filter(r => !r.paymentStatus || r.paymentStatus === 'PENDING').length; 
  const cancelledCount = records.value.filter(r => r.status === 'CANCELLED').length; // Check Order Status too

  return { totalRevenue, completedCount, pendingCount, cancelledCount };
});

// Formatters
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getStatusClasses = (status: string) => {
  const base = "px-2.5 py-1 rounded-full text-xs font-semibold border ";
  switch (status) {
    case 'PAID': return base + "bg-emerald-50 text-emerald-700 border-emerald-100";
    case 'PENDING': return base + "bg-amber-50 text-amber-700 border-amber-100";
    case 'FAILED': 
    case 'CANCELLED': return base + "bg-red-50 text-red-700 border-red-100";
    default: return base + "bg-gray-100 text-gray-600 border-gray-200";
  }
};

// API Call
const loadBillingData = async () => {
  isLoading.value = true;
  try {
    // We reuse getAllOrders because "Billing" is just a view of Orders
    const response = await adminService.getAllOrders({
        page: 0,
        size: 50, // Fetch more to calculate stats client-side for MVP
        search: searchQuery.value
    });

    if (response.data && response.data.content) {
      records.value = response.data.content;
    } else {
      records.value = response.data || [];
    }
  } catch (error) {
    console.error("Failed to load transactions", error);
  } finally {
    isLoading.value = false;
  }
};

let searchTimeout: any;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadBillingData();
  }, 500);
};

onMounted(() => {
  loadBillingData();
});
</script>