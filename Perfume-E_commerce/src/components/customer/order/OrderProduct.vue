<template>
  <div class="flex gap-6 items-start">
    <div
      class="w-24 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
    >
      <img
        :src="item.imageUrl || 'https://via.placeholder.com/150'"
        :alt="item.name || 'Product'"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="flex-grow">
      <h3 class="text-lg font-serif font-bold text-gray-900 leading-tight mb-1">
        {{ item.name }}
      </h3>

      <p class="text-sm text-gray-500 mb-2">
        <span v-if="item.category">{{ item.category }}</span>
        <span v-if="item.category && item.occasion"> • </span>
        <span v-if="item.occasion">{{ item.occasion }}</span>
      </p>

      <div class="flex items-center gap-2 mt-2">
        <span class="font-bold text-gray-900">${{ item.price }}</span>
        <span class="text-xs text-gray-400">x {{ item.quantity }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface OrderItem {
  productId: string
  name: string
  brand?: string
  variant?: string
  imageUrl?: string
  category?: string
  occasion?: string
  price: number
  quantity: number
}

defineProps<{
  item: OrderItem
}>()
</script>
