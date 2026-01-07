<template>
  <div class="p-2 space-y-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <Total_inOrder 
          total_name="Total Revenue" 
          :total_value="formatCurrency(stats.totalRevenue)" 
          rate_fluctuation="From all orders" 
        />
        
        <Total_inOrder
          total_name="Completed Transactions"
          :total_value="stats.completedCount.toString()"
          rate_fluctuation="Paid Orders"
        />
        
        <Total_inOrder
          total_name="Pending Transactions"
          :total_value="stats.pendingCount.toString()"
          rate_fluctuation="Unpaid/Pending"
        />
        
        <Total_inOrder
          total_name="Cancelled Transactions"
          :total_value="stats.cancelledCount.toString()"
          rate_fluctuation="Refunded/Void"
        />
      </div>

      <div class="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <h3 class="text-gray-900 text-xl font-medium mb-2">Payment Method</h3>
        <div class="flex flex-col items-center justify-center h-full">
           <ApexCharts />
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Transaction History</h1>
        
        <button 
          @click="loadBillingData" 
          class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Refresh Data
        </button>
      </div>

      <NavFilter />

      <div class="bg-white rounded-lg shadow-md overflow-hidden mt-6">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">Transaction ID (Order)</th>
                <th scope="col" class="px-6 py-3">User</th>
                <th scope="col" class="px-6 py-3">Date</th>
                <th scope="col" class="px-6 py-3">Amount</th>
                <th scope="col" class="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="5" class="px-6 py-4 text-center">Loading transactions...</td>
              </tr>
              
              <tr v-else-if="records.length === 0">
                <td colspan="5" class="px-6 py-4 text-center">No transaction records found.</td>
              </tr>

              <tr v-for="record in records" :key="record.orderId" class="bg-white border-b hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                   #{{ record.orderId.substring(record.orderId.length - 8).toUpperCase() }}
                </td>

                <td class="px-6 py-4">
                  {{ record.userEmail || 'Guest User' }}
                </td>

                <td class="px-6 py-4">
                  {{ formatDate(record.transactionDate) }}
                </td>

                <td class="px-6 py-4 font-bold text-gray-900">
                  {{ formatCurrency(record.totalAmount) }}
                </td>

                <td class="px-6 py-4">
                  <span :class="getStatusColor(record.paymentStatus)" class="px-2 py-1 rounded-full text-xs font-semibold">
                    {{ record.paymentStatus || 'PAID' }} 
                    </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import adminService, { type BillingRecord } from '@/services/adminService';
import Total_inOrder from '@/views/components/Total_inOrder.vue';
import ApexCharts from '@/views/components/ApexCharts.vue';
import NavFilter from '@/views/components/NavFilter.vue';

// State
const records = ref<BillingRecord[]>([]);
const isLoading = ref(false);

// Stats Calculation (Computed from the records list)
const stats = computed(() => {
  const totalRevenue = records.value.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
  const completedCount = records.value.filter(r => r.paymentStatus === 'PAID').length;
  const pendingCount = records.value.filter(r => r.paymentStatus === 'PENDING').length;
  // Since we mock payments, let's assume all non-cancelled orders count as revenue or pending
  const cancelledCount = records.value.length - (completedCount + pendingCount);

  return { totalRevenue, completedCount, pendingCount, cancelledCount };
});

// Formatters
const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString();
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PAID': return 'bg-green-100 text-green-800';
    case 'PENDING': return 'bg-yellow-100 text-yellow-800';
    case 'FAILED': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Action
const loadBillingData = async () => {
  isLoading.value = true;
  try {
    const response = await adminService.getBillingRecords();
    records.value = response.data.reverse(); // Newest first
  } catch (error) {
    console.error("Failed to load billing records", error);
  } finally {
    isLoading.value = false;
  }
};

// Init
onMounted(() => {
  loadBillingData();
});
</script>