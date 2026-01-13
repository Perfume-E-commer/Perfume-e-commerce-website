<template>
  <div> <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#280559]"></div>
    </div>

    <div v-else-if="orders.length === 0" class="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
      <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
      <p class="text-gray-500 mb-8">Looks like you haven't bought any perfumes yet.</p>
      <router-link to="/products" class="px-8 py-3 bg-[#280559] text-white rounded-full font-medium hover:bg-opacity-90 transition">
        Start Shopping
      </router-link>
    </div>

    <div v-else>
      <h2 class="text-xl font-bold text-gray-900 mb-6">Active Orders ({{ orders.length }})</h2>
      
      <OrderCard 
        v-for="order in orders" 
        :key="order.id" 
        :order="order" 
        @cancel-order="handleCancelOrder"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import OrderCard from '../../components/customer/order/OrderCard.vue';
import orderService, { type Order } from '../../services/orderService';

const orders = ref<Order[]>([]);
const loading = ref(true);

const fetchOrders = async () => {
  loading.value = true;
  try {
    orders.value = await orderService.getMyOrders();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  } finally {
    loading.value = false;
  }
};

const handleCancelOrder = async (orderId: string) => {
  if (confirm("Are you sure you want to cancel this order?")) {
    alert("Cancel request sent for order: " + orderId);
  }
};

onMounted(() => {
  fetchOrders();
});
</script>