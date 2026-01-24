<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative">
    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 relative z-10 border border-gray-100">
      
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#280559] mb-2">Reset Password</h1>
        <p class="text-gray-500 text-sm">Enter the code from your email and a new password.</p>
      </div>

      <div v-if="message" :class="`mb-4 p-3 border text-sm rounded-lg text-center ${isError ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`">
        {{ message }}
      </div>

      <form @submit.prevent="handleReset" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" readonly />
        </div>

        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Verification Code</label>
          <input v-model="code" type="text" required placeholder="123456" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] transition" />
        </div>

        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">New Password</label>
          <input v-model="newPassword" type="password" required placeholder="********" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] transition" />
        </div>

        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Confirm Password</label>
          <input v-model="confirmPassword" type="password" required placeholder="********" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] transition" />
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-[#280559] hover:bg-[#1a033a] text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-purple-900/20 disabled:opacity-70">
          <span v-if="loading">Resetting...</span>
          <span v-else>Set New Password</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import authService from '@/services/authService'

const route = useRoute()
const router = useRouter()

const email = ref((route.query.email as string) || '')
const code = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const message = ref('')
const isError = ref(false)

const handleReset = async () => {
  if (newPassword.value !== confirmPassword.value) {
    isError.value = true
    message.value = "Passwords do not match."
    return
  }

  loading.value = true
  message.value = ''
  isError.value = false

  try {
    await authService.resetPassword(email.value, code.value, newPassword.value)
    message.value = 'Password reset successful! Redirecting to login...'
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error: any) {
    isError.value = true
    message.value = error.response?.data || 'Failed to reset password.'
  } finally {
    loading.value = false
  }
}
</script>