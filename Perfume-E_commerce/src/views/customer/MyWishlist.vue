<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore, type AddToCartPayload } from '@/stores/cartStore'
import { useToastStore } from '@/stores/toastStore'
import { X, Loader2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const toastStore = useToastStore()
const router = useRouter()

const isEmpty = computed(() => wishlistStore.wishlistItems.length === 0)
const isLoading = computed(() => wishlistStore.isLoading)

onMounted(async () => {
  await wishlistStore.fetchWishlist()
})

const removeFromWishlist = async (productId: string, productName: string) => {
  const success = await wishlistStore.removeFromWishlist(productId)
  if (success) {
    toastStore.showToast(`${productName} removed from wishlist`, 'info', 2000)
  } else {
    toastStore.showToast('Failed to remove item from wishlist', 'error', 2000)
  }
}

const addToCart = async (item: (typeof wishlistStore.wishlistItems)[0]) => {
  const selectedSize = item.variants?.[0]?.size || ''

  const payload: AddToCartPayload = {
    productId: item.id,
    size: selectedSize,
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

const getProductImage = (item: (typeof wishlistStore.wishlistItems)[0]) => {
  if (item.variants && item.variants.length > 0 && item.variants[0].imageUrl) {
    return item.variants[0].imageUrl
  }
  return item.image || '/placeholder-product.png'
}
</script>
<template>
  <div class="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
    <div v-if="isLoading && isEmpty" class="text-center py-12">
      <Loader2 class="w-10 h-10 text-[#280559] animate-spin mx-auto mb-4" />
      <p class="text-gray-500">Loading your wishlist...</p>
    </div>

    <div v-else-if="isEmpty" class="text-center">
      <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
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
          <button
            @click="removeFromWishlist(item.id, item.name)"
            :disabled="isLoading"
            class="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            title="Remove from wishlist"
          >
            <X class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div
            @click="viewProduct(item.id)"
            class="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 shrink-0 bg-gray-50 rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              :src="getProductImage(item)"
              :alt="item.name"
              class="w-full h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div class="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="flex-1 min-w-0 pr-8 sm:pr-0">
              <h3
                @click="viewProduct(item.id)"
                class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 hover:text-[#280559] cursor-pointer transition mb-1 line-clamp-1"
              >
                {{ item.name }}
              </h3>

              <p v-if="item.brand" class="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                {{ item.brand }}
              </p>

              <p
                v-if="item.category"
                class="text-xs sm:text-sm font-medium text-purple-600 uppercase mb-1"
              >
                {{ item.category }}
              </p>

              <div class="flex items-center gap-2 mb-2">
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  $ {{ item.price.toFixed(2) }}
                </p>
                <span
                  v-if="(item as any).discountedPrice && (item as any).discountedPrice < item.price"
                  class="text-sm text-gray-400 line-through"
                >
                  $ {{ item.price.toFixed(2) }}
                </span>
              </div>

              <!-- Rating -->
              <div v-if="item.averageRating" class="flex items-center gap-1 mb-2">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-4 h-4"
                  :class="i <= Math.round(item.averageRating) ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="text-xs text-gray-500">({{ item.averageRating.toFixed(1) }})</span>
              </div>

              <p v-if="item.stock <= 0" class="text-xs text-red-500 font-medium mt-1">
                Out of Stock
              </p>
              <p v-else-if="item.stock <= 5" class="text-xs text-orange-500 font-medium mt-1">
                Only {{ item.stock }} left in stock
              </p>
            </div>

            <div class="shrink-0 sm:ml-auto">
              <button
                @click="addToCart(item)"
                :disabled="item.stock <= 0 || isLoading"
                class="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#280559] text-white rounded-full font-medium text-sm hover:bg-opacity-90 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ item.stock <= 0 ? 'Out of Stock' : 'Add to Cart' }}
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
