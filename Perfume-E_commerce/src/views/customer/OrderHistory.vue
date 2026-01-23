<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import OrderCard from '@/components/customer/order/OrderCard.vue'
import orderService, { type Order } from '@/services/orderService'

const loading = ref(true)
const orders = ref<Order[]>([])

onMounted(async () => {
  try {
    orders.value = await orderService.getMyOrders()
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
})

const historyOrders = computed(() => {
  return orders.value.filter((o) =>
    ['DELIVERED', 'CANCELLED', 'RETURNED', 'FAILED'].includes(o.status),
  )
})
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <main class="flex-grow w-full">
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#280559]"></div>
      </div>

      <div v-else class="space-y-6">
        <div v-if="historyOrders.length === 0" class="text-center py-12 text-gray-500">
          <p>No order history found.</p>
        </div>

        <OrderCard v-for="order in historyOrders" :key="order.id" :order="order" />
      </div>
    </main>
  </div>
</template>
