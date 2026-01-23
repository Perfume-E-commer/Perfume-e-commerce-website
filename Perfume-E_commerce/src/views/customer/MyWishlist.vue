<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useWishlistStore, type WishlistItemWrapper } from '@/stores/wishlistStore'
import { useCartStore, type AddToCartPayload } from '@/stores/cartStore'
import { useToastStore } from '@/stores/toastStore'
import { X, Loader2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/clientProduct'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const toastStore = useToastStore()
const router = useRouter()

const isEmpty = computed(() => wishlistStore.wishlistItems.length === 0)
const isLoading = computed(() => wishlistStore.isLoading)
const selectedVariants = ref<Record<string, any>>({})

// Helper to safely get the product object from the wrapper
const getProduct = (wrapper: WishlistItemWrapper | any): Product => {
  return wrapper.product || wrapper
}

// Initialize selections
watch(
  () => wishlistStore.wishlistItems,
  (items) => {
    if (items && items.length > 0) {
      items.forEach((wrapper: any) => {
        const product = getProduct(wrapper)
        const savedSize = wrapper.selectedSize || null

        if (product.variants && product.variants.length > 0) {
          if (savedSize) {
            const matched = product.variants.find((v: any) => v.size === savedSize)
            if (matched) {
              selectedVariants.value[String(product.id)] = matched
              return
            }
          }
          if (!selectedVariants.value[String(product.id)]) {
            selectedVariants.value[String(product.id)] = product.variants[0]
          }
        }
      })
    }
  },
  { immediate: true, deep: true },
)

onMounted(async () => {
  await wishlistStore.fetchWishlist()
})

const getSelectedVariant = (wrapper: any) => {
  const product = getProduct(wrapper)
  if (selectedVariants.value[String(product.id)]) {
    return selectedVariants.value[String(product.id)]
  }
  if (product.variants && product.variants.length > 0) {
    return product.variants[0]
  }
  return {
    id: product.id,
    size: null,
    price: product.price,
    stock: product.stock,
    imageUrl: product.image,
  }
}

const selectVariant = (wrapper: any, variant: any) => {
  const product = getProduct(wrapper)
  selectedVariants.value[String(product.id)] = variant
}

const removeFromWishlist = async (
  productId: string | number,
  productName: string,
  size?: string | null,
) => {
  const success = await wishlistStore.removeFromWishlist(String(productId), size || undefined)
  if (success) {
    delete selectedVariants.value[String(productId)]
    toastStore.showToast(`${productName} removed from wishlist`, 'info', 2000)
  } else {
    toastStore.showToast('Failed to remove item from wishlist', 'error', 2000)
  }
}

const addToCart = async (wrapper: any) => {
  const product = getProduct(wrapper)
  const variant = getSelectedVariant(wrapper)

  if (variant.stock <= 0) {
    toastStore.showToast('Selected variant is out of stock', 'error')
    return
  }

  const payload: AddToCartPayload = {
    productId: String(product.id),
    size: variant.size,
    quantity: 1,
  }

  try {
    await cartStore.addToCart(payload)
    toastStore.showToast(`${product.name} (${variant.size}) added to bag!`, 'success')
  } catch (error) {
    console.error('Failed to add to cart:', error)
    toastStore.showToast('Failed to add item to bag. Please try again.', 'error')
  }
}

const viewProduct = (productId: string | number) => {
  router.push(`/productdetail/${productId}`)
}

const getProductImage = (wrapper: any) => {
  const product = getProduct(wrapper)
  const variant = getSelectedVariant(wrapper)
  if (variant && variant.imageUrl) {
    return variant.imageUrl
  }
  return product.image || '/placeholder-product.png'
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
          v-for="wrapper in wishlistStore.wishlistItems"
          :key="`${getProduct(wrapper).id}-${wrapper.selectedSize || 'default'}`"
          class="relative flex items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          <button
            @click="
              removeFromWishlist(
                getProduct(wrapper).id!,
                getProduct(wrapper).name,
                wrapper.selectedSize,
              )
            "
            :disabled="isLoading"
            class="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 z-10"
            title="Remove from wishlist"
          >
            <X class="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div
            @click="viewProduct(getProduct(wrapper).id!)"
            class="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 shrink-0 bg-gray-50 rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              :src="getProductImage(wrapper)"
              :alt="getProduct(wrapper).name"
              class="w-full h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div class="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="flex-1 min-w-0 pr-8 sm:pr-0">
              <h3
                @click="viewProduct(getProduct(wrapper).id!)"
                class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 hover:text-[#280559] cursor-pointer transition mb-1 line-clamp-1"
              >
                {{ getProduct(wrapper).name }}
              </h3>

              <p
                v-if="getProduct(wrapper).brand"
                class="text-xs sm:text-sm font-medium text-gray-600 mb-1"
              >
                {{ getProduct(wrapper).brand }}
              </p>

              <p
                v-if="getProduct(wrapper).category"
                class="text-xs sm:text-sm font-medium text-purple-600 uppercase mb-1"
              >
                {{ getProduct(wrapper).category }}
              </p>

              <div
                v-if="getProduct(wrapper).variants && getProduct(wrapper).variants.length > 0"
                class="flex flex-wrap gap-2 my-2"
              >
                <button
                  v-for="variant in getProduct(wrapper).variants"
                  :key="variant.size"
                  @click.stop="selectVariant(wrapper, variant)"
                  :class="[
                    'px-2 py-1 text-xs rounded border transition-colors',
                    getSelectedVariant(wrapper).size === variant.size
                      ? 'border-[#280559] bg-[#280559] text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300',
                  ]"
                >
                  {{ variant.size }}
                </button>
              </div>

              <div class="flex items-center gap-2 mb-2">
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  $
                  {{ (getSelectedVariant(wrapper).price || getProduct(wrapper).price).toFixed(2) }}
                </p>
                <span
                  v-if="
                    (getProduct(wrapper) as any).discountedPrice &&
                    (getProduct(wrapper) as any).discountedPrice < getProduct(wrapper).price
                  "
                  class="text-sm text-gray-400 line-through"
                >
                  $ {{ getProduct(wrapper).price.toFixed(2) }}
                </span>
              </div>

              <!-- Rating -->
              <div v-if="getProduct(wrapper).averageRating" class="flex items-center gap-1 mb-2">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-4 h-4"
                  :class="
                    i <= Math.round(getProduct(wrapper).averageRating || 0)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span class="text-xs text-gray-500"
                  >({{ (getProduct(wrapper).averageRating || 0).toFixed(1) }})</span
                >
              </div>

              <p
                v-if="getSelectedVariant(wrapper).stock <= 0"
                class="text-xs text-red-500 font-medium mt-1"
              >
                Out of Stock
              </p>
              <p
                v-else-if="getSelectedVariant(wrapper).stock <= 5"
                class="text-xs text-orange-500 font-medium mt-1"
              >
                Only {{ getSelectedVariant(wrapper).stock }} left in stock
              </p>
            </div>

            <div class="shrink-0 sm:ml-auto">
              <button
                @click="addToCart(wrapper)"
                :disabled="getSelectedVariant(wrapper).stock <= 0 || isLoading"
                class="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#280559] text-white rounded-full font-medium text-sm hover:bg-opacity-90 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ getSelectedVariant(wrapper).stock <= 0 ? 'Out of Stock' : 'Add to Cart' }}
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
