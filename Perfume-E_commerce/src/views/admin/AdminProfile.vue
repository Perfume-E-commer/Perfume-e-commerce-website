<template>
  <div class="min-h-screen bg-gray-50/50 p-6">
    <div class="max-w-6xl mx-auto mb-8">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
      <p class="text-gray-500 mt-1">Manage your personal details and business banking information.</p>
    </div>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-4 space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="h-32 bg-gradient-to-r from-emerald-600 to-teal-500"></div>
          <div class="px-6 pb-6 text-center relative">
            <div class="relative -mt-16 inline-block">
              <img 
                :src="user.imageUrl || 'https://ui-avatars.com/api/?name=Admin+User&background=0D9488&color=fff'" 
                class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                alt="Profile"
              />
              <button class="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              </button>
            </div>
            <h2 class="mt-4 text-xl font-bold text-gray-900">{{ user.firstName }} {{ user.lastName }}</h2>
            <p class="text-emerald-600 font-medium text-sm bg-emerald-50 inline-block px-3 py-1 rounded-full mt-2">
              {{ user.role || 'ADMINISTRATOR' }}
            </p>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Account Status</h3>
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-600">Verification</span>
            <span class="flex items-center text-emerald-600 text-sm font-medium">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Verified
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Member Since</span>
            <span class="text-gray-900 font-medium">{{ formatDate(user.createdAt) }}</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-8 space-y-6">
        
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-gray-900">Personal Information</h3>
            <button @click="saveProfile" :disabled="loading" class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition disabled:opacity-50">
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input v-model="form.firstName" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input v-model="form.lastName" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input v-model="user.email" disabled type="email" class="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input v-model="form.phoneNumber" type="tel" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h3 class="text-lg font-bold text-gray-900">Business Banking</h3>
              <p class="text-sm text-gray-500">For payouts and business transactions.</p>
            </div>
             <div class="p-3 bg-blue-50 rounded-full text-blue-600">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
             </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input 
                v-model="form.bankName" 
                placeholder="e.g. ABA Bank, ACLEDA"
                type="text" 
                class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Account Number / IBAN</label>
              <div class="relative">
                <input 
                  v-model="form.bankAccountNumber" 
                  type="text" 
                  placeholder="000 000 000"
                  class="w-full pl-10 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition font-mono" 
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </div>
            </div>
          </div>

          <div class="mt-6 flex justify-end relative z-10">
             <button @click="saveProfile" class="text-blue-600 text-sm font-medium hover:text-blue-800 transition">Update Banking Info</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userService from '@/services/userService'

// State
const loading = ref(false)
const user = ref<any>({})
const form = ref({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  bankName: '',
  bankAccountNumber: ''
})

// Helper to format date
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// Fetch Profile
const fetchProfile = async () => {
  try {
    const response = await userService.getProfile()
    user.value = response.data
    // Sync form with user data
    form.value = {
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      phoneNumber: response.data.phoneNumber,
      bankName: response.data.bankName || '',
      bankAccountNumber: response.data.bankAccountNumber || ''
    }
  } catch (error) {
    console.error('Failed to load profile', error)
  }
}

// Update Profile
const saveProfile = async () => {
  loading.value = true
  try {
    const response = await userService.updateProfile(form.value)
    user.value = response.data
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Failed to update', error)
    alert('Failed to update profile.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>