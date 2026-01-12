<template>
  <div class="p-6 min-h-screen bg-gray-50/50 space-y-8 animate-fade-in">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Welcome back, Admin!</h1>
        <p class="text-sm text-gray-500 mt-1">{{ currentDate }}</p>
      </div>
      
      <div class="flex gap-3">
        <router-link 
          to="/admin/products" 
          class="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm flex items-center"
        >
          <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          Manage Products
        </router-link>

        <router-link 
          to="/admin/promotions" 
          class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          Create Promotion
        </router-link>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="animate-spin h-10 w-10 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>

    <div v-else class="space-y-8">

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link to="/admin/orders" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders (30d)</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ dashboardData.totalOrders30d }}</p>
          </div>
          <div class="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
        </router-link>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Revenue (30d)</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ formatCurrency(dashboardData.revenue30d) }}</p>
          </div>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>

        <router-link to="/admin/inventory" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition group">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-red-500 transition-colors">Low Stock Alerts</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ dashboardData.lowStockCount }}</p>
          </div>
          <div class="p-3 bg-red-50 text-red-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
        </router-link>

        <router-link to="/admin/customers" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Customers</p>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ dashboardData.activeCustomers }}</p>
          </div>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          </div>
        </router-link>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-bold text-gray-900">Sales Overview (Last 30 Days)</h2>
        </div>
        
        <div v-if="!dashboardData.salesChart || dashboardData.salesChart.length === 0" class="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-lg bg-gray-50/50">
           <p>No sales data available yet.</p>
        </div>

        <div v-else class="w-full">
            <ApexCharts 
              height="300" 
              :data="chartComputed.revenue" 
              :labels="chartComputed.dates" 
            />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 class="font-bold text-gray-800">Recent Orders</h3>
            <router-link to="/admin/orders" class="text-indigo-600 text-xs font-bold hover:underline">View All</router-link>
          </div>
          
          <div v-if="dashboardData.recentOrders.length === 0" class="p-8 text-center text-gray-400 text-sm italic">
            No recent orders found.
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th class="px-5 py-3">Order #</th>
                  <th class="px-5 py-3">Customer</th>
                  <th class="px-5 py-3">Total</th>
                  <th class="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="order in dashboardData.recentOrders" :key="order.id" class="hover:bg-gray-50">
                  <td class="px-5 py-3 font-mono text-xs text-gray-600">{{ order.orderNumber || order.id.substring(0,8) }}</td>
                  <td class="px-5 py-3 text-gray-900 font-medium">{{ order.customerName }}</td>
                  <td class="px-5 py-3 text-gray-600">{{ formatCurrency(order.total) }}</td>
                  <td class="px-5 py-3 text-right">
                    <span class="px-2 py-1 rounded text-[10px] font-bold uppercase"
                      :class="{
                        'bg-green-100 text-green-700': order.status === 'CONFIRMED' || order.status === 'DELIVERED',
                        'bg-blue-100 text-blue-700': order.status === 'SHIPPED',
                        'bg-yellow-100 text-yellow-700': order.status === 'PENDING',
                        'bg-red-100 text-red-700': order.status === 'CANCELLED',
                        'bg-gray-100 text-gray-600': !['CONFIRMED','DELIVERED','SHIPPED','PENDING','CANCELLED'].includes(order.status)
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div class="p-4 border-b border-gray-100 bg-red-50 flex justify-between items-center">
                <h3 class="font-bold text-red-800 flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  Low Stock
                </h3>
             </div>
             <div class="p-4 space-y-3">
               <div v-if="dashboardData.lowStockItems.length === 0" class="text-center text-gray-400 text-xs py-4">
                 All items well stocked.
               </div>
               <div v-for="item in dashboardData.lowStockItems" :key="item.id" class="flex items-center justify-between">
                 <div class="flex items-center gap-3">
                   <div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs overflow-hidden">
                     <img v-if="item.imageUrl" :src="item.imageUrl" class="w-full h-full object-cover">
                     <span v-else>📦</span>
                   </div>
                   <div>
                     <p class="text-sm font-medium text-gray-900 truncate max-w-[120px]" :title="item.name">{{ item.name }}</p>
                   </div>
                 </div>
                 <span class="text-red-600 font-bold text-sm bg-red-50 px-2 py-0.5 rounded">{{ item.stock }} left</span>
               </div>
               <router-link v-if="dashboardData.lowStockItems.length > 0" to="/admin/inventory" class="block text-center text-xs text-indigo-600 font-medium mt-2 hover:underline">
                 Restock Now
               </router-link>
             </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div class="p-4 border-b border-gray-100 bg-indigo-50">
                <h3 class="font-bold text-indigo-800">Active Promotions</h3>
             </div>
             <div class="p-4 space-y-3">
               <div v-if="dashboardData.activePromotions.length === 0" class="text-center text-gray-400 text-xs py-4">
                 No active campaigns.
               </div>
               <div v-for="promo in dashboardData.activePromotions" :key="promo.id" class="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                 <div>
                   <p class="font-mono font-bold text-indigo-700 text-sm">{{ promo.code }}</p>
                   <p class="text-[10px] text-gray-400">Expires: {{ formatDate(promo.validUntil) }}</p>
                 </div>
                 <span class="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
                   {{ promo.discountPercentage }}% OFF
                 </span>
               </div>
             </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import adminService, { type AdminDashboardResponse } from '../../services/adminService';
// ✅ FIXED: Import the chart component
import ApexCharts from '../components/ApexCharts.vue';

// --- State ---
const isLoading = ref(true);
const dashboardData = ref<AdminDashboardResponse>({
  totalOrders30d: 0,
  revenue30d: 0,
  lowStockCount: 0,
  activeCustomers: 0,
  salesChart: [],
  recentOrders: [],
  lowStockItems: [],
  activePromotions: []
});

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

// ✅ FIXED: Transformed data for the chart
const chartComputed = computed(() => {
  const rawData = dashboardData.value.salesChart || [];
  return {
    // Extract dates (e.g., "Jan 01")
    dates: rawData.map((item: any) => item.date),
    // Extract revenue (e.g., 150.0)
    revenue: rawData.map((item: any) => item.revenue)
  }
});

// --- Actions ---
const loadDashboard = async () => {
  isLoading.value = true;
  try {
    const response = await adminService.getDashboardStats();
    if(response && response.data) {
       dashboardData.value = response.data;
    }
  } catch (error) {
    console.error("Failed to load dashboard data", error);
  } finally {
    isLoading.value = false;
  }
};

// --- Helpers ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const formatDate = (dateString: string) => {
  if (!dateString || dateString === 'N/A') return 'No Expiry';
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// --- Init ---
onMounted(() => {
  loadDashboard();
});
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>