<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
      
      <div class="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
            {{ getInitials(customer?.firstName, customer?.lastName) }}
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">{{ customer?.firstName }} {{ customer?.lastName }}</h2>
            <p class="text-sm text-gray-500">{{ customer?.email }}</p>
          </div>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="space-y-6">
            
            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact & Info</h3>
              <div class="space-y-3 text-sm">
                <div>
                  <span class="block text-gray-500 text-xs">Phone</span>
                  <span class="font-medium text-gray-900">{{ customer?.phoneNumber || 'Not provided' }}</span>
                </div>
                <div>
                  <span class="block text-gray-500 text-xs">Primary Address</span>
                  <span class="font-medium text-gray-900">{{ customer?.address || 'No address on file' }}</span>
                </div>
                <div>
                  <span class="block text-gray-500 text-xs">Joined</span>
                  <span class="font-medium text-gray-900">{{ formatDate(customer?.joinedAt) }}</span>
                </div>
                <div>
                  <span class="block text-gray-500 text-xs">Account Status</span>
                  <span 
                    :class="customer?.active ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-100'"
                    class="inline-block px-2 py-0.5 rounded text-xs font-bold mt-1"
                  >
                    {{ customer?.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
            </div>

            <div class="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
              <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4">Lifetime Value</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <span class="block text-indigo-500 text-xs">Total Spent</span>
                  <span class="font-bold text-indigo-900 text-lg">{{ formatCurrency(customer?.totalSpent) }}</span>
                </div>
                <div>
                  <span class="block text-indigo-500 text-xs">Total Orders</span>
                  <span class="font-bold text-indigo-900 text-lg">{{ customer?.ordersCount || 0 }}</span>
                </div>
              </div>
            </div>

          </div>

          <div class="lg:col-span-2">
            <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
              Order History
              <span class="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{{ orders.length }} orders</span>
            </h3>

            <div v-if="isLoading" class="flex justify-center py-12">
              <div class="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
            </div>

            <div v-else-if="orders.length === 0" class="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p class="text-gray-500 text-sm">No orders placed yet.</p>
            </div>

            <div v-else class="space-y-3">
              <div 
                v-for="order in orders" 
                :key="order.id"
                class="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 hover:shadow-sm transition group"
              >
                <div class="flex items-center gap-4">
                  <div class="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-indigo-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-900 text-sm">Order #{{ order.orderNumber }}</p>
                    <p class="text-xs text-gray-500">{{ formatDate(order.date) }} • {{ order.itemCount }} items</p>
                  </div>
                </div>

                <div class="text-right">
                  <p class="font-bold text-gray-900 text-sm">{{ formatCurrency(order.total) }}</p>
                  <span 
                    :class="getStatusColor(order.status)"
                    class="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase inline-block mt-1"
                  >
                    {{ order.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
        <button 
          @click="$emit('close')"
          class="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition shadow-sm"
        >
          Close
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Customer, CustomerOrderHistory } from '@/services/customerService';

defineProps<{
  isOpen: boolean;
  isLoading: boolean;
  customer: Customer | null;
  orders: CustomerOrderHistory[];
}>();

defineEmits(['close']);

// Helpers
const getInitials = (first?: string, last?: string) => {
  return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase();
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null) return '-';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const getStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'DELIVERED': return 'bg-green-100 text-green-700';
    case 'SHIPPED': return 'bg-blue-100 text-blue-700';
    case 'PROCESSING': return 'bg-amber-100 text-amber-700';
    case 'CANCELLED': return 'bg-red-50 text-red-500';
    default: return 'bg-gray-100 text-gray-600';
  }
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>