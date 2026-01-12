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
          
          <h1 class="text-xl font-bold bg-gradient-to-r from-[#280559] to-[#280559] bg-clip-text text-transparent hidden sm:block">
            Dashboard
          </h1>
        </div>

        <div class="flex items-center gap-4">
          
          <div class="relative">
            <button 
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors border border-transparent hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div class="text-right hidden md:block">
                <p class="text-sm font-medium text-gray-700">{{ adminProfile.name }}</p>
                <p class="text-xs text-gray-500">Admin</p>
              </div>
              
              <img 
                :src="getImageUrl(adminProfile.avatar)" 
                alt="Profile" 
                class="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
              >
              
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div 
              v-if="isDropdownOpen" 
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 transform origin-top-right transition-all duration-200 z-50"
            >
              <div class="px-4 py-3 border-b border-gray-100 md:hidden">
                <p class="text-sm font-medium text-gray-900">{{ adminProfile.name }}</p>
                <p class="text-xs text-gray-500 truncate">{{ adminProfile.email }}</p>
              </div>

              <ul class="py-1">
                <li>
                  <router-link 
                    to="/admin/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    @click="isDropdownOpen = false"
                  >
                    Profile Settings
                  </router-link>
                </li>
                <li>
                  <button 
                    @click="logout" 
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>

            <div 
              v-if="isDropdownOpen" 
              @click="isDropdownOpen = false"
              class="fixed inset-0 z-40" 
            ></div>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import adminService from '../../services/adminService'
import authService from '../../services/authService'
import { getImageUrl } from '../../utils/imageHelper'

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
  authService.logout() 
  router.push('/login')
}

onMounted(async () => {
  try {
    const response = await adminService.getProfile()
    if (response.data) {
      adminProfile.value = {
        name: `${response.data.firstName} ${response.data.lastName}`,
        email: response.data.email,
        avatar: response.data.imageUrl || response.data.avatarUrl || '' 
      }
    }
  } catch (error) {
    console.error("Navbar: Failed to load profile", error)
  }
})
</script>