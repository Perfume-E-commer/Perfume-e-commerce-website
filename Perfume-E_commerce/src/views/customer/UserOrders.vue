<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6">My Orders</h2>

    <div v-if="orders.length === 0" class="text-gray-500">You have no orders yet.</div>

    <div v-for="order in orders" :key="order.id" class="bg-white shadow rounded-lg p-4 mb-4">
      <div class="flex justify-between items-center mb-2">
        <span class="font-medium">Order #{{ order.id }}</span>
        <span
          :class="statusClass(order.status)"
          class="px-3 py-1 rounded-full text-white font-semibold"
        >
          {{ order.status }}
        </span>
      </div>
      <div class="text-gray-600">
        Estimated Delivery: <span class="font-medium">{{ order.estimatedDelivery }}</span>
      </div>
      <div class="mt-2">
        <ul>
          <li v-for="item in order.items" :key="item.id" class="text-gray-700">
            {{ item.productName }} x {{ item.quantity }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import orderService from '@/services/orderService'

const orders = ref<Array<any>>([])

const statusClass = (status: string) => {
  if (status === 'Pending') return 'bg-yellow-500'
  if (status === 'Shipped') return 'bg-blue-500'
  if (status === 'Delivered') return 'bg-green-500'
  if (status === 'Cancelled') return 'bg-red-500'
  return 'bg-gray-500'
}

onMounted(async () => {
  try {
    const res = await orderService.getUserOrders()
    orders.value = res.data
  } catch (error) {
    console.error('Failed to fetch orders', error)
  }
})
</script>
