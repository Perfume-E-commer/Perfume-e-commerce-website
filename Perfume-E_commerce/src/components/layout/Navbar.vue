<script setup lang="ts">
import { Handbag, UserRound, Search, Menu, X, Heart, CircleUserRound } from 'lucide-vue-next'
import { ref, watch, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import NotificationBell from '@/components/ui/NotificationBell.vue'

const authStore = useAuthStore()
const menuOpen = ref(false)
const searchOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) searchOpen.value = false
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) menuOpen.value = false
}

// Prevent body scroll when any overlay is open
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
        <div class="relative text-black hidden lg:block group">
          <input
            type="text"
            placeholder="Search your perfume here...."
            class="md:w-72 xl:w-96 text-black luxurious-roman-regular text-base font-light px-5 py-3 rounded-full bg-gray-50 border border-transparent focus:outline-none focus:border-[#280559] focus:bg-white transition-all duration-300"
          />
          <div
            class="absolute top-2 right-5 text-gray-400 group-focus-within:text-[#280559] transition-colors duration-300"
          >
            <Search stroke-width="1" class="w-6 h-6 xl:w-8 xl:h-8" />
          </div>
        </div>

        <NotificationBell />

        <div class="flex gap-4 items-center">
          <button @click="toggleSearch" />

          <router-link
            to="/account"
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
                  <Handbag class="w-6 h-6" stroke-width="1.5" /> Bag
                </router-link>
                <router-link
                  to="/wishlist"
                  class="flex gap-3 text-lg items-center hover:text-[#280559] transition-colors"
                  @click="menuOpen = false"
                >
                  <Heart class="w-6 h-6" stroke-width="1.5" /> Wishlist
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
        <div v-if="searchOpen" class="lg:hidden fixed inset-0 z-60">
          <div class="absolute inset-0 bg-white" @click="searchOpen = false">
            <div class="flex flex-row items-center gap-3 px-5 py-5 border-b border-gray-100">
              <div class="w-full relative rounded-[30px]">
                <input
                  type="text"
                  placeholder="Search..."
                  class="w-full luxurious-roman-regular text-lg font-light px-5 py-3 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#280559]"
                  autofocus
                />
                <div class="absolute top-2.5 right-5 text-gray-400">
                  <Search stroke-width="1" class="w-6 h-6" />
                </div>
              </div>
              <button
                @click="searchOpen = false"
                class="text-base luxurious-roman-regular px-2 text-black hover:text-[#280559]"
              >
                Cancel
              </button>
            </div>
            <div class="px-6 py-8">
              <p
                class="text-sm text-gray-500 luxurious-roman-regular uppercase tracking-wider mb-4"
              >
                Popular Scents
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700">Dior</span>
                <span class="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700">Chanel</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
