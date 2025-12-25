<script setup lang="ts">
import { Handbag, UserRound, Search, Menu, X, Heart, CircleUserRound } from 'lucide-vue-next'
import { ref, watch, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import NotificationBell from '@/components/ui/NotificationBell.vue'

const authStore = useAuthStore()
const menuOpen = ref(false)
const searchOpen = ref(false)

const isAuthenticated = computed(() => authStore.isAuthenticated)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) searchOpen.value = false // close search if opening menu
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) menuOpen.value = false // close menu if opening search
}

// Prevent body scroll when any overlay is open
watch([menuOpen, searchOpen], ([menu, search]) => {
  if (menu || search) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div class="w-full">
    <!-- Main Navbar -->
    <div
      class="fixed top-0 left-0 right-0 flex justify-between items-center px-5 py-5 bg-white z-50"
    >
      <div class="flex items-center gap-10 xl:gap-15">
        <router-link to="/" @click="menuOpen = false">
          <img
            src="/Logo.png"
            alt="ScentHaven Logo"
            class="w-32 md:w-48 xl:w-60 h-12 xl:h-16 object-contain"
          />
        </router-link>

        <div class="hidden lg:flex gap-10 text-black text-base xl:text-xl luxurious-roman-regular">
          <router-link to="/productlist" class="hover:underline">Shop</router-link>
          <router-link to="/aboutus" class="hover:underline">About Us</router-link>
          <router-link to="/contact" class="hover:underline">Contact</router-link>
        </div>
      </div>

      <div class="flex gap-3 xl:gap-5 items-center lg:px-5 z-10">
        <!-- Desktop Search -->
        <div class="relative rounded-[30px] hidden lg:block">
          <input
            type="text"
            placeholder="Search your perfume here...."
            class="md:w-72 xl:w-96 luxurious-roman-regular text-base font-light px-5 py-3 rounded-full bg-gray-50 focus:outline-none focus:border-[#280559]"
          />
          <div class="absolute top-2 right-5">
            <Search stroke-width="1" class="w-6 h-6 xl:w-8 xl:h-8" />
          </div>
        </div>

        <div class="flex gap-3">
          <!-- Mobile Search Toggle -->
          <Search
            stroke-width="1.5"
            class="hover:bg-gray-200 w-6 h-6 lg:hidden cursor-pointer"
            @click="toggleSearch"
          />

          <NotificationBell v-if="isAuthenticated" />

          <router-link to="/account" @click="menuOpen = false">
            <UserRound
              stroke-width="1.5"
              class="hover:bg-gray-200 w-6 h-6 xl:w-8 xl:h-8 cursor-pointer"
            />
          </router-link>

          <router-link to="/cart" @click="menuOpen = false">
            <Handbag
              stroke-width="1.5"
              class="hover:bg-gray-200 w-6 h-6 xl:w-8 xl:h-8 cursor-pointer"
            />
          </router-link>

          <!-- Mobile Menu Button -->
          <button @click="toggleMenu" class="lg:hidden">
            <Menu v-if="!menuOpen" stroke-width="1.5" class="hover:bg-gray-200 w-6 h-6" />
            <X v-else stroke-width="1.5" class="hover:bg-gray-200 w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <Transition>
        <div v-if="menuOpen" class="lg:hidden fixed inset-0 z-50">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black bg-opacity-40" @click="menuOpen = false"></div>
          <!-- Menu Panel -->
          <div class="absolute top-0 left-0 w-3/5 md:w-1/2 h-full bg-white shadow-lg">
            <img src="/Logo.png" alt="ScentHaven" class="p-5 w-fit max-w-[180px] h-auto" />

            <div class="flex flex-col gap-5 px-6 pt-10">
              <router-link
                to="/productlist"
                class="text-lg luxurious-roman-regular"
                @click="menuOpen = false"
                >Shop</router-link
              >
              <router-link
                to="/aboutus"
                class="text-lg luxurious-roman-regular"
                @click="menuOpen = false"
                >About Us</router-link
              >
              <router-link
                to="/contact"
                class="text-lg luxurious-roman-regular"
                @click="menuOpen = false"
                >Contact</router-link
              >

              <div class="flex flex-col mt-5 gap-5">
                <p class="text-xl luxurious-roman-regular font-medium">
                  Become a ScentHaven Member for the best products, inspiration and stories in
                  sport.
                  <span>
                    <a href="#" class="text-black luxurious-roman-regular font-semibold"
                      >Learn More</a
                    >
                  </span>
                </p>
                <div class="flex flex-row gap-3">
                  <router-link
                    to="/signup"
                    class="px-5 py-1 bg-[#280559] text-white font-medium luxurious-roman-regular rounded-lg"
                    @click="menuOpen = false"
                    >Sign Up</router-link
                  >
                  <router-link
                    to="/login"
                    class="px-5 py-1 border border-black rounded-lg luxurious-roman-regular font-medium"
                    @click="menuOpen = false"
                    >Log In</router-link
                  >
                </div>
              </div>

              <div class="flex flex-col mt-10 gap-5 pt-5 border-t border-gray-200">
                <router-link
                  to="/account"
                  class="flex gap-3 text-lg items-center"
                  @click="menuOpen = false"
                >
                  <CircleUserRound class="w-6 h-6" stroke-width="1.5" /> Account
                </router-link>
                <router-link
                  to="/cart"
                  class="flex gap-3 text-lg items-center"
                  @click="menuOpen = false"
                >
                  <Handbag class="w-6 h-6" stroke-width="1.5" /> Bag
                </router-link>
                <router-link
                  to="/wishlist"
                  class="flex gap-3 text-lg items-center"
                  @click="menuOpen = false"
                >
                  <Heart class="w-6 h-6" stroke-width="1.5" /> Wishlist
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Mobile Search Overlay -->
      <Transition>
        <div v-if="searchOpen" class="lg:hidden fixed inset-0 z-50">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black bg-opacity-40" @click="searchOpen = false"></div>
          <!-- Search Panel -->
          <div class="absolute top-0 left-0 w-full h-full bg-white">
            <div class="flex flex-row items-center gap-3 px-5 pt-5">
              <div class="w-full relative rounded-[30px]">
                <input
                  type="text"
                  placeholder="Search your perfume here...."
                  class="w-full luxurious-roman-regular text-base font-light px-5 py-2 rounded-full bg-gray-50 focus:outline-none focus:border-[#280559]"
                  autofocus
                />
                <div class="absolute top-1.5 right-5">
                  <Search stroke-width="1" class="w-6 h-6" />
                </div>
              </div>
              <button @click="searchOpen = false" class="text-base luxurious-roman-regular px-2">
                Cancel
              </button>
            </div>
            <p class="mt-16 px-6 text-sm text-gray-500 luxurious-roman-regular">
              Popular Search item:
            </p>
            <!-- You can add popular search terms here later -->
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
