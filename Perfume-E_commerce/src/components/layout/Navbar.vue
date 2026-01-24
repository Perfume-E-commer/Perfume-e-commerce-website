<script setup lang="ts">
import { Handbag, UserRound, Search, Menu, X, Heart, CircleUserRound } from 'lucide-vue-next'
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import NotificationBell from '@/components/ui/NotificationBell.vue'

const authStore = useAuthStore()
const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const router = useRouter()
const menuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')

const cartItemCount = computed(() => cartStore.itemCount)

const wishlistCount = computed(() => wishlistStore.wishlistCount)

onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      await cartStore.fetchCart()
    } catch (error) {
      console.warn('Initial cart fetch failed (likely session expired).')
    }
  }
})

const searchSuggestions = computed(() => {
  if (!searchQuery.value.trim()) return []

  const lowerQuery = searchQuery.value.toLowerCase()
  const source =
    productStore.allProducts.length > 0 ? productStore.allProducts : productStore.products

  return source
    .filter((product) => {
      const matchesName = product.name.toLowerCase().includes(lowerQuery)
      const matchesBrand = product.brand && product.brand.toLowerCase().includes(lowerQuery)
      return matchesName || matchesBrand
    })
    .slice(0, 5)
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) searchOpen.value = false
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) menuOpen.value = false
}

async function handleSearch() {
  if (searchQuery.value.trim()) {
    if (productStore.allProducts.length === 0) {
      await productStore.fetchAllProducts()
    }
    productStore.searchProductsByNameOrBrand(searchQuery.value)
    router.push('/productlist')
    searchQuery.value = ''
    searchOpen.value = false
  }
}

function handleSearchKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSearch()
  }
}

function selectSearchResult(product: any) {
  searchQuery.value = product.name
  handleSearch()
}

function searchByQuery(query: string) {
  searchQuery.value = query
  handleSearch()
}

const popularBrands = computed(() => {
  const source =
    productStore.allProducts.length > 0 ? productStore.allProducts : productStore.products
  const brands = [...new Set(source.map((p) => p.brand).filter(Boolean))] as string[]
  return brands.slice(0, 5)
})

watch([menuOpen, searchOpen], ([menu, search]) => {
  if (menu || search) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
const isLoggedIn = computed(() => !!authStore.token)
</script>

<template>
  <div class="w-full">
    <div
      class="fixed top-0 left-0 right-0 flex justify-between items-center px-5 py-5 bg-white z-50 transition-shadow duration-300"
      :class="{ 'shadow-sm': !menuOpen && !searchOpen }"
    >
      <div class="flex items-center gap-10 xl:gap-15">
        <router-link to="/" @click="menuOpen = false">
          <img
            src="/Logo.png"
            alt="ScentHaven Logo"
            class="w-32 md:w-48 xl:w-60 h-12 xl:h-16 object-contain"
          />
        </router-link>

        <div
          class="hidden lg:flex gap-10 text-black text-base xl:text-xl luxurious-roman-regular mt-2"
        >
          <router-link to="/productlist" class="group relative py-1">
            Shop
            <span
              class="absolute bottom-0 left-0 w-0 h-1 bg-[#280559] transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>

          <router-link to="/aboutus" class="group relative py-1">
            About Us
            <span
              class="absolute bottom-0 left-0 w-0 h-1 bg-[#280559] transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>

          <router-link to="/contact" class="group relative py-1">
            Contact
            <span
              class="absolute bottom-0 left-0 w-0 h-1 bg-[#280559] transition-all duration-300 group-hover:w-full"
            ></span>
          </router-link>
        </div>
      </div>

      <div class="flex gap-3 xl:gap-5 items-center lg:px-5 z-10">
        <div class="relative text-black hidden lg:block group w-64 lg:w-md">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search your perfume here...."
            class="w-full text-black luxurious-roman-regular text-base font-light px-5 py-3 rounded-full bg-gray-50 border border-transparent focus:outline-none focus:border-[#280559] focus:bg-white transition-all duration-300"
            @keydown="handleSearchKeydown"
          />
          <button
            @click="handleSearch"
            class="absolute top-2 right-5 text-gray-400 group-focus-within:text-[#280559] hover:text-[#280559] transition-colors duration-300"
          >
            <Search stroke-width="1" class="w-6 h-6 xl:w-8 xl:h-8" />
          </button>

          <div
            v-if="searchQuery.trim() && searchSuggestions.length > 0"
            class="absolute top-full left-1/2 transform -translate-x-[42%] mt-2 w-[40vw] bg-white border border-gray-200 rounded shadow-lg z-50 max-h-85 overflow-y-auto"
          >
            <ul class="py-2 px-5">
              <p class="luxurious-roman-regular text-2xl text-gray-900 mb-5 mt-5">Popular Scents</p>
              <div class="flex flex-wrap gap-5 mb-4">
                <button
                  v-for="product in searchSuggestions"
                  :key="product.id"
                  @click="selectSearchResult(product)"
                  class="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-700 hover:bg-[#280559] hover:text-white transition-all duration-300"
                >
                  {{ product.brand }}
                </button>
              </div>

              <li
                v-for="product in searchSuggestions"
                :key="product.id"
                class="luxurious-roman-regular"
              >
                <button
                  @click="selectSearchResult(product)"
                  class="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                >
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-16 h-16 object-cover rounded"
                  />
                  <div class="flex-1">
                    <p class="text-base font-medium text-gray-900">
                      {{ product.name }}
                    </p>
                    <p class="text-sm text-gray-500">{{ product.brand }}</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          <div
            v-else-if="searchQuery.trim() && searchSuggestions.length === 0"
            class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 p-4 text-center"
          >
            <p class="text-sm text-gray-500">No products found for "{{ searchQuery }}"</p>
          </div>
        </div>

        <NotificationBell v-if="authStore.isAuthenticated"/>

        <div class="flex gap-4 items-center">
          <button
            @click="toggleSearch"
            class="lg:hidden text-black hover:text-[#280559] transition-colors"
          >
            <Search stroke-width="1.5" class="w-6 h-6" />
          </button>

          <router-link
            to="/account/profile"
            @click="menuOpen = false"
            class="text-black hover:text-[#280559] hover:scale-110 transition-all duration-300"
          >
            <UserRound stroke-width="1.5" class="w-6 h-6 xl:w-8 xl:h-8" />
          </router-link>

          <router-link
            to="/cart"
            @click="menuOpen = false"
            class="text-black hover:text-[#280559] hover:scale-110 transition-all duration-300 relative"
          >
            <Handbag stroke-width="1.5" class="w-6 h-6 xl:w-8 xl:h-8" />
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-2 -right-2 bg-[#280559] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartItemCount > 99 ? '99+' : cartItemCount }}
            </span>
          </router-link>

          <button
            @click="toggleMenu"
            class="lg:hidden text-black hover:text-[#280559] transition-colors duration-300"
          >
            <Menu v-if="!menuOpen" stroke-width="1.5" class="w-6 h-6" />
            <X v-else stroke-width="1.5" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-x-0 opacity-100"
        leave-to-class="transform -translate-x-full opacity-0"
      >
        <div v-if="menuOpen" class="lg:hidden fixed inset-0 z-60">
          <div
            class="absolute inset-0 bg-black/40 backdrop-blur-sm"
            @click="menuOpen = false"
          ></div>

          <div
            class="absolute top-0 left-0 w-3/4 md:w-1/2 h-full bg-white shadow-2xl overflow-y-auto"
          >
            <div class="p-6">
              <img src="/Logo.png" alt="ScentHaven" class="w-40 h-auto mb-8" />

              <nav class="flex flex-col gap-6 text-black">
                <router-link
                  to="/productlist"
                  class="text-xl luxurious-roman-regular hover:text-[#280559] hover:translate-x-2 transition-all duration-300"
                  @click="menuOpen = false"
                >
                  Shop
                </router-link>
                <router-link
                  to="/aboutus"
                  class="text-xl luxurious-roman-regular hover:text-[#280559] hover:translate-x-2 transition-all duration-300"
                  @click="menuOpen = false"
                >
                  About Us
                </router-link>
                <router-link
                  to="/contact"
                  class="text-xl luxurious-roman-regular hover:text-[#280559] hover:translate-x-2 transition-all duration-300"
                  @click="menuOpen = false"
                >
                  Contact
                </router-link>
              </nav>

              <div class="flex flex-col mt-8 gap-5 pt-8 border-t border-gray-100">
                <p class="text-lg luxurious-roman-regular font-medium leading-snug">
                  Become a ScentHaven Member.
                  <a href="#" class="block mt-1 text-[#280559] font-semibold hover:underline"
                    >Learn More</a
                  >
                </p>
                <div class="flex flex-row gap-3">
                  <router-link
                    to="/signup"
                    class="px-6 py-2 bg-[#280559] text-white font-medium luxurious-roman-regular rounded-lg hover:bg-opacity-90 transition"
                    @click="menuOpen = false"
                    >Sign Up</router-link
                  >
                  <router-link
                    to="/login"
                    class="px-6 py-2 border border-black rounded-lg luxurious-roman-regular font-medium hover:bg-gray-50 transition"
                    @click="menuOpen = false"
                    >Log In</router-link
                  >
                </div>
              </div>

              <div class="flex flex-col mt-8 text-black gap-6 pt-8 border-t border-gray-100">
                <router-link
                  to="/account"
                  class="flex gap-3 text-lg items-center hover:text-[#280559] transition-colors"
                  @click="menuOpen = false"
                >
                  <CircleUserRound class="w-6 h-6" stroke-width="1.5" /> Account
                </router-link>
                <router-link
                  to="/cart"
                  class="flex gap-3 text-lg items-center hover:text-[#280559] transition-colors"
                  @click="menuOpen = false"
                >
                  <div class="relative">
                    <Handbag class="w-6 h-6" stroke-width="1.5" />
                    <span
                      v-if="cartItemCount > 0"
                      class="absolute -top-2 -right-2 bg-[#280559] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {{ cartItemCount > 99 ? '99+' : cartItemCount }}
                    </span>
                  </div>
                  Bag
                </router-link>
                <router-link
                  to="/wishlist"
                  class="flex gap-3 text-lg items-center hover:text-[#280559] transition-colors"
                  @click="menuOpen = false"
                >
                  <div class="relative">
                    <Heart class="w-6 h-6" stroke-width="1.5" />
                    <span
                      v-if="wishlistCount > 0"
                      class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {{ wishlistCount > 99 ? '99+' : wishlistCount }}
                    </span>
                  </div>
                  Wishlist
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="searchOpen" class="lg:hidden fixed inset-0 z-100 bg-white pt-16">
          <div
            class="fixed top-0 left-0 right-0 flex flex-row items-center gap-3 px-5 py-5 border-b border-gray-100 bg-white z-100 transition-shadow duration-300"
            :class="{ 'shadow-sm': !menuOpen && !searchOpen }"
          >
            <div class="w-full relative rounded-[30px]">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-full luxurious-roman-regular text-lg font-light px-5 py-3 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#280559]"
                autofocus
                @keydown="handleSearchKeydown"
                @click.stop
              />
              <button
                @click.stop="handleSearch"
                class="absolute top-3.5 right-5 text-[#280559] hover:text-[#1a0438] transition-colors"
              >
                <Search stroke-width="1.5" class="w-6 h-6" />
              </button>

              <div
                v-if="searchQuery.trim() && searchSuggestions.length > 0"
                class="absolute top-full transform mt-2 w-[93vw] bg-white border border-gray-200 rounded shadow-lg z-50 max-h-80 overflow-y-auto"
              >
                <ul class="py-2">
                  <li v-for="product in searchSuggestions" :key="product.id">
                    <button
                      @click="selectSearchResult(product)"
                      class="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                    >
                      <img
                        :src="product.image"
                        :alt="product.name"
                        class="w-10 h-10 object-cover rounded"
                      />
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">
                          {{ product.name }}
                        </p>
                        <p class="text-xs text-gray-500">{{ product.brand }}</p>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>

              <div
                v-else-if="searchQuery.trim() && searchSuggestions.length === 0"
                class="absolute top-full w-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 p-4 text-center"
              >
                <p class="text-sm text-gray-500">No products found for "{{ searchQuery }}"</p>
              </div>
            </div>
            <button
              @click="searchOpen = false"
              class="text-base luxurious-roman-regular px-2 text-black hover:text-[#280559]"
            >
              Cancel
            </button>
          </div>

          <div class="px-6 py-8 mt-5">
            <p class="luxurious-roman-regular text-xl text-gray-900 mb-4">Popular Scents</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <button
                v-for="brand in popularBrands"
                :key="brand"
                @click="searchByQuery(brand)"
                class="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-700 hover:bg-[#280559] hover:text-white transition-all duration-300"
              >
                {{ brand }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
