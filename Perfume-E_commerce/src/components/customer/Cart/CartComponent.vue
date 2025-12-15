<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'

// Assuming your cart store has the following methods/properties:
// cartStore.cart.items: Array<CartItem>
// cartStore.cart.totalPrice: number
// cartStore.isLoading: boolean
// cartStore.fetchCart()
// cartStore.removeFromCart(productId)
// cartStore.addToCart(productId, quantity)

const cartStore = useCartStore()

onMounted(() => {
  cartStore.fetchCart()
})

const formatPrice = (value: number) => {
  // Ensure we handle potential null/undefined/non-number values gracefully
  if (typeof value !== 'number' || isNaN(value)) return '$0.00'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Handler for quantity decrease (optional: needs implementation in your store)
const decreaseQuantity = (productId: string, currentQuantity: number) => {
  if (currentQuantity > 1) {
    // Decrease quantity by 1
    cartStore.updateQuantity(productId, currentQuantity - 1)
  } else {
    // Remove if quantity hits 0
    cartStore.removeFromCart(productId)
  }
}

const increaseQuantity = (productId: string, currentQuantity: number) => {
  // Increase quantity by 1
  cartStore.updateQuantity(productId, currentQuantity + 1)
}
</script>

<template>
  <div class="container mx-auto px-4 py-16 mt-20">
    <h1 class="text-3xl luxurious-roman-regular text-center mb-12 uppercase tracking-widest">
      Shopping Cart
    </h1>

    <div v-if="cartStore.isLoading" class="text-center py-20">
      <p class="text-gray-500">Loading your cart...</p>
    </div>

    <div
      v-else-if="cartStore.cart.items.length === 0"
      class="text-center py-20 bg-gray-50 rounded-lg max-w-2xl mx-auto"
    >
      <p class="text-xl text-gray-600 mb-6 luxurious-roman-regular">
        Your cart is currently empty.
      </p>
      <RouterLink
        to="/productlist"
        class="inline-block luxurious-roman-regular bg-[#2E0249] text-white px-8 py-3 rounded hover:bg-purple-900 transition font-medium"
      >
        Continue Shopping
      </RouterLink>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
      <div class="w-full lg:w-2/3 space-y-5">
        <div
          v-for="item in cartStore.cart.items"
          :key="item.productId"
          class="flex items-center border border-gray-100 rounded-lg p-6 bg-white shadow-sm relative"
        >
          <button
            @click="cartStore.removeFromCart(item.productId)"
            class="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            class="w-24 h-24 bg-gray-100 rounded-md shrink-0 overflow-hidden border border-gray-200"
          >
            <div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              <img
                :src="item.imageUrl"
                :alt="item.productName"
                class="object-cover w-full h-full"
              />
            </div>
          </div>

          <div class="flex-1 ml-6">
            <h3 class="text-lg font-serif font-medium text-gray-900 mb-1">
              {{ item.productName }}
            </h3>
            <p class="text-sm text-gray-500">Category: {{ item.category }}</p>
            <p class="text-sm text-gray-500 mb-4">Size: {{ item.size }}</p>

            <div class="flex items-center space-x-6">
              <div class="flex items-center border border-gray-300 rounded">
                <button
                  @click="decreaseQuantity(item.productId, item.quantity)"
                  class="px-3 py-1 hover:bg-gray-100 text-gray-600 font-medium"
                >
                  -
                </button>
                <span class="px-2 py-1 text-gray-900 font-medium border-x border-gray-300 text-sm">
                  {{ item.quantity }}
                </span>
                <button
                  @click="increaseQuantity(item.productId, item.quantity)"
                  class="px-3 py-1 hover:bg-gray-100 text-gray-600 font-medium"
                >
                  +
                </button>
              </div>

              <span class="text-base font-medium text-gray-900">
                {{ formatPrice(item.price * item.quantity) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-1/3">
        <div class="border border-gray-100 rounded-lg p-6 bg-white shadow-md sticky top-4">
          <h2 class="text-xl font-serif mb-6">Order Summary</h2>

          <div class="flex justify-between mb-3 text-gray-700">
            <span>Subtotal</span>
            <span class="font-medium">{{ formatPrice(cartStore.cart.totalPrice) }}</span>
          </div>

          <div class="flex justify-between mb-6 text-gray-700">
            <span>Shipping</span>
            <span class="font-medium">Free</span>
          </div>

          <div class="border-t border-gray-200 my-4"></div>

          <div class="flex justify-between mb-8 text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{{ formatPrice(cartStore.cart.totalPrice) }}</span>
          </div>

          <RouterLink
            to="/checkout"
            class="block w-full bg-[#2E0249] text-white text-center py-3 rounded-lg hover:bg-purple-900 transition font-medium"
          >
            Proceed to Checkout
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
