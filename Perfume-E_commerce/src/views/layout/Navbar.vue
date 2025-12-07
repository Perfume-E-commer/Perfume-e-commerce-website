<template>
  <nav
    class="bg-white border-b border-gray-200 fixed z-30 top-0 shadow-md transition-all duration-300 ease-in-out"
    :class="isSidebarOpen ? 'mr-64 w-[calc(100%-16rem)]' : 'ml-0 w-full'"
  >
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-3">
          <button
            class="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 p-2 rounded-lg transition-all duration-200"
            @click="$emit('toggle-sidebar')"
            aria-label="Toggle sidebar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div class="flex items-center gap-2">
            <!-- <div
              class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white text-sm font-bold">P</span>
            </div> -->
            <img src="/perfumeLogos.png" alt="" class="w-12 h-16" />
            <h1
              class="text-xl font-bold bg-gradient-to-r from-[#280559] to-[#280559] bg-clip-text text-transparent"
            >
              Admin Panel
            </h1>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center space-x-1">
            <SearchProduct placeholderdata="Search for products" class="rounded-3xl" />
            <button
              class="text-gray-600 hover:bg-gray-100 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 21H14C14 22.1 13.1 23 12 23C10.9 23 10 22.1 10 21ZM21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2C13.1 2 14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19ZM17 11C17 8.2 14.8 6 12 6C9.2 6 7 8.2 7 11V18H17V11Z"
                  fill="#4B5563"
                />
                <circle cx="18" cy="7" r="3" fill="#EF4343" />
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <!-- <div
              class="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-sm font-semibold">A</span>
            </div> -->
            <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                type="button"
                class="relative flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
                @click="isDropdownOpen = !isDropdownOpen"
              >
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="/me.jpg" alt="user photo" />
              </button>
              <!-- Dropdown menu -->
              <div
                class="absolute top-full right-2 mt-2 z-50 bg-gray-50 shadow-xl rounded-2xl w-44"
                v-if="isDropdownOpen"
              >
                <div class="px-4 py-3 text-sm border-b border-gray-100">
                  <span class="block text-heading font-medium">Kakashi Uchiha</span>
                  <span class="block text-body truncate">Oggy@GIC.com</span>
                </div>
                <ul class="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >Dashboard</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >Settings</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >Earnings</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >Sign out</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<!-- <script setup lang="ts">
import SearchProduct from '../components/SearchProduct.vue'
const props = defineProps<{
  isSidebarOpen: boolean
}>()
defineEmits(['toggle-sidebar'])
</script> -->
<script>
import SearchProduct from '../components/SearchProduct.vue'
export default {
  name: 'Navbar',
  components: { SearchProduct },
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggle-sidebar'],
  // when I click profile picture, the dropdown shows up
  data() {
    return {
      isDropdownOpen: false,
    }
  },
}
</script>
