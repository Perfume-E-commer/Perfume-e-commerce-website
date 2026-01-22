<script setup lang="ts">
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore, type AddToCartPayload } from '@/stores/cartStore'
import { useToastStore } from '@/stores/toastStore'
import { X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const toastStore = useToastStore()
const router = useRouter()

const isEmpty = computed(() => wishlistStore.wishlistItems.length === 0)

const removeFromWishlist = (productId: string, productName: string) => {
  wishlistStore.removeFromWishlist(productId)
  toastStore.showToast(`${productName} removed from wishlist`, 'info', 2000)
}

const addToCart = async (item: (typeof wishlistStore.wishlistItems)[0]) => {
  const payload: AddToCartPayload = {
    productId: item.id,
    size: item.size,
    quantity: 1,
  }

  try {
    await cartStore.addToCart(payload)
    toastStore.showToast(`${item.name} has been added to your bag!`, 'success')
  } catch (error) {
    console.error('Failed to add to cart:', error)
    toastStore.showToast('Failed to add item to bag. Please try again.', 'error')
  }
}

const viewProduct = (productId: string) => {
  router.push(`/productdetail/${productId}`)
}
</script>
<template>
  <div class="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
    <!-- Empty State -->
    <div v-if="isEmpty" class="text-center">
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
      <h3 class="text-xl font-bold text-gray-900 mb-2">No wishlist here</h3>
      <p class="text-gray-500 mb-8">
        Add your favorite perfumes to your wishlist to find them easily later.
      </p>
      <router-link
        to="/productlist"
        class="inline-block px-8 py-3 bg-[#280559] text-white rounded-full font-medium hover:bg-opacity-90 transition"
      >
        Start Shopping
      </router-link>
    </div>

    <div v-else>
      <div
        class="flex flex-col gap-4 sm:gap-6 max-h-150 sm:max-h-175 lg:max-h-200 overflow-y-auto pr-2 scrollbar-thin"
      >
        <div
          v-for="item in wishlistStore.wishlistItems"
          :key="item.id"
          class="relative flex items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          <!-- Remove Button (absolute positioned) -->
          <button
            @click="removeFromWishlist(item.id, item.name)"
            class="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            title="Remove from wishlist"
          >
            <X class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <!-- Product Image -->
          <div
            @click="viewProduct(item.id)"
            class="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 shrink-0 bg-gray-50 rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300"
            />
          </div>

          <!-- Product Info & Actions Container -->
          <div class="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-4">
            <!-- Product Info -->
            <div class="flex-1 min-w-0 pr-8 sm:pr-0">
              <h3
                @click="viewProduct(item.id)"
                class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 hover:text-[#280559] cursor-pointer transition mb-1 line-clamp-1"
              >
                {{ item.name }}
              </h3>

              <p
                v-if="item.category"
                class="text-xs sm:text-sm font-medium text-purple-600 uppercase mb-1"
              >
                {{ item.category }}
              </p>

              <p v-if="item.size" class="text-xs sm:text-sm text-gray-500 mb-2">
                Size: {{ item.size }}
              </p>

              <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                $ {{ item.price.toFixed(2) }}
              </p>

              <p v-if="item.description" class="hidden sm:block text-sm text-gray-500 line-clamp-2">
                {{ item.description }}
              </p>
            </div>

            <!-- Add to Cart Button -->
            <div class="shrink-0 sm:ml-auto">
              <button
                @click="addToCart(item)"
                class="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#280559] text-white rounded-full font-medium text-sm hover:bg-opacity-90 transition whitespace-nowrap"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}
</style>
