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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <div class="flex items-center gap-2">
            <img src="/perfumeLogos.png" alt="" class="w-12 h-16" />
            <h1 class="text-xl font-bold bg-gradient-to-r from-[#280559] to-[#280559] bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden md:flex items-center space-x-1">
            <SearchProduct placeholderdata="Search for products" class="rounded-3xl" />
          </div>

          <div class="flex items-center gap-2">
            <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
              <button
                type="button"
                class="relative flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
                @click="isDropdownOpen = !isDropdownOpen"
              >
                <span class="sr-only">Open user menu</span>
                <img 
                  class="w-8 h-8 rounded-full object-cover" 
                  :src="adminProfile.avatar || '/me.jpg'" 
                  alt="user photo" 
                />
              </button>

              <div
                v-if="isDropdownOpen"
                class="absolute top-full right-0 mt-2 z-50 bg-gray-50 shadow-xl rounded-2xl w-48 border border-gray-100"
              >
                <div class="px-4 py-3 text-sm border-b border-gray-100">
                  <span class="block text-heading font-medium truncate">{{ adminProfile.name }}</span>
                  <span class="block text-body truncate text-gray-500">{{ adminProfile.email }}</span>
                </div>
                <ul class="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
                  <li>
                    <router-link 
                      to="/mainDashboard/adminprofile" 
                      class="block w-full text-left p-2 hover:bg-indigo-50 hover:text-indigo-600 rounded"
                      @click="isDropdownOpen = false"
                    >
                      Profile Settings
                    </router-link>
                  </li>
                  <li>
                    <button 
                      @click="logout" 
                      class="block w-full text-left p-2 hover:bg-red-50 hover:text-red-600 rounded"
                    >
                      Sign out
                    </button>
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SearchProduct from '../components/SearchProduct.vue'
import adminService from '@/services/adminService'
import authService from '@/services/authService' // Ensure you have this

defineProps<{ isSidebarOpen: boolean }>()
defineEmits(['toggle-sidebar'])

const router = useRouter()
const isDropdownOpen = ref(false)

const adminProfile = ref({
  name: 'Admin',
  email: '',
  avatar: ''
})

const logout = () => {
  // Clear token/storage
  authService.logout() // Assuming logout clears localStorage
  // Redirect
  router.push('/login')
}

// Fetch Data on Mount
onMounted(async () => {
  try {
    const response = await adminService.getProfile()
    if (response.data) {
      adminProfile.value = {
        name: `${response.data.firstName} ${response.data.lastName}`,
        email: response.data.email,
        avatar: response.data.avatarUrl || ''
      }
    }
  } catch (error) {
    console.error("Navbar: Failed to load profile", error)
  }
})
</script>