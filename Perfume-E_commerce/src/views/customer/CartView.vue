<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { RouterLink } from 'vue-router'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.fetchCart()
})

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}
</script>

<template>
  <div class="container mx-auto px-4 py-10 min-h-screen">
    
    <h1 class="text-3xl font-serif text-center mb-10 uppercase tracking-widest">Shopping Cart</h1>

    <div v-if="cartStore.isLoading" class="text-center py-20">
      <p class="text-gray-500">Loading your cart...</p>
    </div>

    <div v-else-if="cartStore.cart.items.length === 0" class="text-center py-20 bg-gray-50 rounded-lg">
      <p class="text-xl text-gray-600 mb-4">Your cart is currently empty.</p>
      <RouterLink 
        to="/productlist" 
        class="inline-block bg-[#2E0249] text-white px-8 py-3 rounded hover:bg-purple-900 transition"
      >
        Continue Shopping
      </RouterLink>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8">
      
      <div class="w-full lg:w-2/3 space-y-4">
        <div 
          v-for="item in cartStore.cart.items" 
          :key="item.productId" 
          class="flex flex-col sm:flex-row items-center border border-gray-200 rounded-lg p-4 bg-white shadow-sm relative"
        >
          <button 
            @click="cartStore.removeFromCart(item.productId)"
            class="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="w-24 h-32 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
            <div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">
               No Image
             </div>
          </div>

          <div class="flex-1 sm:ml-6 text-center sm:text-left mt-4 sm:mt-0">
            <h3 class="text-lg font-serif font-medium text-gray-900">{{ item.productName }}</h3>
            <p class="text-sm text-gray-500">Category: Perfume</p> 
            <p class="text-sm text-gray-500">Size: 100ml</p>

            <div class="flex items-center justify-center sm:justify-start mt-4">
              <div class="flex items-center border border-gray-300 rounded">
                <button class="px-3 py-1 hover:bg-gray-100 text-gray-600">-</button>
                <span class="px-3 py-1 text-gray-900 font-medium">{{ item.quantity }}</span>
                <button 
                  @click="cartStore.addToCart(item.productId, 1)"
                  class="px-3 py-1 hover:bg-gray-100 text-gray-600"
                >+</button>
              </div>
              <span class="ml-6 text-lg font-medium text-gray-900">
                {{ formatPrice(item.price * item.quantity) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-1/3">
        <div class="border border-gray-200 rounded-lg p-6 bg-white shadow-sm sticky top-4">
          <h2 class="text-xl font-serif mb-6">Order Summary</h2>
          
          <div class="flex justify-between mb-4 text-gray-600">
            <span>Subtotal</span>
            <span>{{ formatPrice(cartStore.cart.totalPrice) }}</span>
          </div>
          
          <div class="flex justify-between mb-4 text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
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