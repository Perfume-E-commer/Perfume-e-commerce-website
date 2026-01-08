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

      <div class="mt-4 mb-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search Transaction (Order ID) or Email..."
          class="w-full sm:max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

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
                <!-- START UPDATE: Safe ID display with fallback -->
                <td class="px-6 py-4 font-medium text-indigo-600">
                  #{{ (record.orderId || record.id || '').toString().slice(-8).toUpperCase() }}
                </td>
                <!-- END UPDATE -->

                <td class="px-6 py-4">
                  {{ record.customerEmail || 'Guest User' }}
                </td>

                <td class="px-6 py-4">
                  {{ formatDate(record.date) }}
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

const records = ref<any[]>([]); 
const isLoading = ref(false);
const searchQuery = ref('');
const currentPage = ref(0);
const pageSize = ref(10);

const stats = computed(() => {
  const totalRevenue = records.value.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
  const completedCount = records.value.filter(r => r.paymentStatus === 'PAID').length;
  const pendingCount = records.value.filter(r => r.paymentStatus === 'PENDING').length;
  const cancelledCount = records.value.length - (completedCount + pendingCount);

  return { totalRevenue, completedCount, pendingCount, cancelledCount };
});

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

const loadBillingData = async () => {
  isLoading.value = true;
  try {
    const response = await adminService.getAllOrders({
        page: currentPage.value,
        size: pageSize.value,
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
    currentPage.value = 0;
    loadBillingData();
  }, 500);
};

onMounted(() => {
  loadBillingData();
});
</script>