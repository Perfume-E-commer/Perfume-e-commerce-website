<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const formatPrice = (value: number) => {
  if (typeof value !== 'number' || isNaN(value)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const subtotal = computed(() => cartStore.cart.subtotal || 0)
const shipping = computed(() => cartStore.cart.shippingCost || 0)
const total = computed(() => cartStore.cart.totalPrice || 0)
</script>

<template>
  <div class="checkout-right-panel">
    <div class="order-summary-wrapper sticky top-24">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl luxurious-roman-regular text-gray-800">In Your Bag</h2>
        <a href="/cart" class="text-sm font-bold text-[#280559] hover:underline"> Edit </a>
      </div>

      <div class="text-sm space-y-3 pb-6 border-b border-gray-100">
        <div class="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span class="font-medium text-gray-900">{{ formatPrice(subtotal) }}</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span class="font-medium text-green-600">{{
            shipping === 0 ? 'Free' : formatPrice(shipping)
          }}</span>
        </div>
      </div>

      <div class="flex justify-between py-6">
        <span class="text-lg font-bold text-gray-900">Total</span>
        <span class="text-2xl font-serif font-bold text-[#280559]">{{ formatPrice(total) }}</span>
      </div>

      <div class="space-y-4">
        <div v-if="cartStore.isLoading" class="text-center text-sm text-gray-500 py-4">
          Loading items...
        </div>
        <div
          v-else-if="cartStore.cart.items.length === 0"
          class="text-center text-sm text-gray-500 py-4"
        >
          Your cart is empty.
        </div>

        <div
          v-else
          v-for="item in cartStore.cart.items"
          :key="item.productId"
          class="flex items-start gap-4 py-2"
        >
          <div
            class="w-16 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              :src="item.imageUrl"
              :alt="item.productName"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div class="flex-1 min-w-0">
            <p class="font-bold text-sm text-gray-900 truncate">
              {{ item.productName }}
            </p>
            <p class="text-xs text-gray-500 mt-1">Size: {{ item.size }}</p>
            <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
          </div>
          <div class="text-sm font-medium text-gray-900">
            {{ formatPrice(item.price * item.quantity) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>