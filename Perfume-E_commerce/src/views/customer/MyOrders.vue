<template>
  <div>
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#280559]"></div>
    </div>

    <div
    
      v-else-if="orders.length === 0"
      class="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100"
    >
      <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No active orders</h3>
      <p class="text-gray-500 mb-8">You don't have any orders in progress right now.</p>

      <router-link 
  to="/productlist" 
  class="px-8 py-3 bg-[#280559] text-white rounded-full font-medium hover:bg-opacity-90 transition"
> 
  Start Shopping 
</router-link>
    </div>

    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-900">Active Orders ({{ orders.length }})</h2>
        <button
          @click="fetchOrders"
          class="text-sm text-indigo-900 hover:text-indigo-700 font-medium flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      <div class="space-y-6">
        <OrderCard
          v-for="order in orders"
          :key="order.id"
          :order="order"
          @cancel-order="handleCancelOrder"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import OrderCard from '../../components/customer/order/OrderCard.vue'
import orderService, { type Order } from '../../services/orderService'

const orders = ref<Order[]>([])
const loading = ref(true)

const fetchOrders = async () => {
  loading.value = true
  try {
    const allOrders = await orderService.getMyOrders()

    orders.value = allOrders
      .filter((order) => !['DELIVERED', 'CANCELLED', 'RETURNED', 'FAILED'].includes(order.status))
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
}

const handleCancelOrder = async (orderId: string) => {
  if (!confirm('Are you sure you want to cancel this order?')) return

  try {
    await orderService.cancelOrder(orderId)
    // Optimistic update or refetch
    alert('Order cancelled successfully')
    await fetchOrders()
  } catch (error) {
    console.error('Failed to cancel order:', error)
    alert('Failed to cancel order. Please try again.')
  }
}

onMounted(() => {
  fetchOrders()
})
</script>
