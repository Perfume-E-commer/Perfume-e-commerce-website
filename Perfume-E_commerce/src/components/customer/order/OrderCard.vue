<template>
  <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6 transition-all hover:shadow-md">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-4 flex gap-6">
        <div class="w-24 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
          <img 
            :src="getImageUrl(order.items[0]?.imageUrl)" 
            alt="Product" 
            class="w-full h-full object-cover"
          >
        </div>
        <div class="space-y-1">
          <h3 class="text-lg font-serif font-bold text-gray-900">{{ order.items[0]?.name }}</h3>
          <p class="text-sm text-gray-500">{{ order.items[0]?.brand }}</p>
          <p class="text-xs text-gray-400 mt-2">{{ order.items[0]?.variant }}</p>
          <p v-if="order.items.length > 1" class="text-xs text-indigo-600 font-medium mt-1">
            + {{ order.items.length - 1 }} other items
          </p>
        </div>
      </div>

      <div class="lg:col-span-4 flex flex-col justify-between">
        <div>
          <h4 class="text-2xl font-serif font-medium text-gray-900 mb-2">Order Detail</h4>
          <p class="text-sm text-gray-500 mb-1">{{ formatDate(order.orderDate) }}</p>
          <p class="text-sm text-gray-900 font-medium mb-1">Order {{ order.orderId }}</p>
          <p class="text-sm font-medium flex items-center gap-2">
            Order Status: 
            <span :class="getStatusColor(order.status)">{{ order.status }}</span>
          </p>
        </div>

        <div class="mt-8 relative">
          <div class="absolute top-1.5 left-0 w-full h-1 bg-gray-200 rounded-full z-0"></div>
          <div 
            class="absolute top-1.5 left-0 h-1 bg-indigo-900 rounded-full z-0 transition-all duration-1000"
            :style="{ width: getProgressWidth(order.status) }"
          ></div>

          <div class="relative z-10 flex justify-between w-full">
            <div class="flex flex-col items-center">
              <div class="w-4 h-4 rounded-full bg-indigo-900 border-2 border-white shadow-sm"></div>
              <div class="mt-2 text-xs text-center">
                <p class="font-medium text-gray-900">Order Placed</p>
                <p class="text-gray-400 text-[10px]">{{ formatDateShort(order.placedDate) }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center">
              <div 
                class="w-4 h-4 rounded-full border-2 border-white shadow-sm transition-colors duration-500"
                :class="isStepActive(order.status, 'SHIPPED') ? 'bg-indigo-900' : 'bg-gray-200'"
              ></div>
              <div class="mt-2 text-xs text-center">
                <p class="font-medium text-gray-900">Order Shipped</p>
                <p class="text-gray-400 text-[10px]">{{ formatDateShort(order.shippedDate) }}</p>
              </div>
            </div>

            <div class="flex flex-col items-center">
              <div 
                class="w-4 h-4 rounded-full border-2 border-white shadow-sm transition-colors duration-500"
                :class="isStepActive(order.status, 'DELIVERED') ? 'bg-indigo-900' : 'bg-gray-200'"
              ></div>
              <div class="mt-2 text-xs text-center">
                <p class="font-medium text-gray-900">Est Arrived</p>
                <p class="text-gray-400 text-[10px]">{{ formatDateShort(order.estimatedArrivalDate) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 bg-gray-50/50 rounded-2xl p-6 border border-gray-100/50">
        <h4 class="font-serif font-medium text-gray-900 mb-4">Order Summary</h4>
        
        <div class="space-y-3 text-sm">
          <div class="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span class="font-medium text-gray-900">$ {{ formatPrice(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Total Items</span>
            <span class="font-medium text-gray-900">{{ order.totalItems }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span class="font-medium text-gray-900">{{ order.shippingCost === 0 ? 'Free' : '$ ' + order.shippingCost }}</span>
          </div>
          <div class="pt-3 border-t border-gray-200 flex justify-between items-center">
            <span class="font-bold text-gray-900">Total</span>
            <span class="font-bold text-lg text-gray-900">$ {{ formatPrice(order.total) }}</span>
          </div>
        </div>

        <div class="mt-6 mb-6">
          <p class="text-xs font-semibold text-gray-900 mb-2">Payment Information</p>
          <div class="flex items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded-lg border border-gray-200">
            <svg class="w-6 h-6 text-indigo-900" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4v10h16V8H4z"/></svg>
            <span>{{ order.paymentMethod || 'Credit Card' }}</span>
          </div>
        </div>

        <button 
          v-if="order.status === 'PENDING' || order.status === 'PLACED'"
          @click="$emit('cancel-order', order.id)"
          class="w-full bg-[#280559] hover:bg-[#1e0342] text-white py-3 rounded-full text-sm font-medium transition-colors shadow-lg shadow-indigo-100"
        >
          Proceed to Cancel
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getImageUrl } from '../../../utils/imageHelper';

interface OrderItem {
  name: string;
  brand: string;
  variant: string;
  imageUrl: string;
}

interface Order {
  id: string;
  orderId: string; 
  orderDate: string;
  status: string; 
  subtotal: number;
  totalItems: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  placedDate: string;
  shippedDate?: string;
  estimatedArrivalDate?: string;
  items: OrderItem[];
}

const props = defineProps<{
  order: Order
}>();

defineEmits(['cancel-order']);

// Helpers
const formatPrice = (price: number) => price.toFixed(2);

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatDateShort = (dateString?: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });
};

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'SHIPPED': return 'text-green-600';
    case 'DELIVERED': return 'text-green-600';
    case 'CANCELLED': return 'text-red-600';
    default: return 'text-indigo-600';
  }
};

const isStepActive = (currentStatus: string, step: string) => {
  const status = currentStatus.toUpperCase();
  if (step === 'SHIPPED') return ['SHIPPED', 'DELIVERED'].includes(status);
  if (step === 'DELIVERED') return status === 'DELIVERED';
  return false;
};

const getProgressWidth = (status: string) => {
  switch (status.toUpperCase()) {
    case 'PLACED': return '0%';
    case 'SHIPPED': return '50%';
    case 'DELIVERED': return '100%';
    default: return '0%';
  }
};
</script>