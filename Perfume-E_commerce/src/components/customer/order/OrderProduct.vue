<template>
  <div class="flex gap-6 items-start">
    <div class="w-24 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
      <img 
        :src="item.product?.imageUrl || 'https://via.placeholder.com/150'" 
        :alt="item.product?.name || 'Product'" 
        class="w-full h-full object-cover"
      >
    </div>

    <div class="flex-grow">
      <h3 class="text-lg font-serif font-bold text-gray-900">
        {{ item.product?.name }} 
        <span v-if="item.product?.variance">({{ item.product.variance }} ml)</span>
      </h3>
      
      <p class="text-sm text-gray-500 mt-1 mb-2">
        <span v-if="item.product?.category">{{ item.product.category }}</span>
        <span v-if="item.product?.category && item.product?.occasion"> • </span>
        <span v-if="item.product?.occasion">{{ item.product.occasion }}</span>
      </p>

      <div class="flex items-center gap-2">
        <span class="font-bold text-gray-900">${{ item.price }}</span>
        <span class="text-xs text-gray-400">x {{ item.quantity }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  name: string;
  brand?: string;
  variance?: string;
  imageUrl: string;
  category?: string;
  occasion?: string;
}

interface OrderItem {
  price: number;
  quantity: number;
  product: Product;
}

defineProps<{
  item: OrderItem
}>();
</script>