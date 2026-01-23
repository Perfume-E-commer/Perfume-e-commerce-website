<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative">
    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 relative z-10 border border-gray-100">
      
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#280559] mb-2">Forgot Password?</h1>
        <p class="text-gray-500 text-sm">Enter your email and we'll send you a recovery code.</p>
      </div>

      <div v-if="message" :class="`mb-4 p-3 border text-sm rounded-lg text-center ${isError ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`">
        {{ message }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="name@example.com"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] transition"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-[#280559] hover:bg-[#1a033a] text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-purple-900/20 disabled:opacity-70"
        >
          <span v-if="loading">Sending...</span>
          <span v-else>Send Reset Code</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link to="/login" class="text-sm text-gray-500 hover:text-[#280559] font-medium">
          ← Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'

const router = useRouter()
const email = ref('')
const loading = ref(false)
const message = ref('')
const isError = ref(false)

const handleSubmit = async () => {
  loading.value = true
  message.value = ''
  isError.value = false

  try {
    await authService.forgotPassword(email.value)
    message.value = 'Reset code sent! Redirecting...'
    
    setTimeout(() => {
      router.push({ name: 'reset-password', query: { email: email.value } })
    }, 1500)
  } catch (error: any) {
    isError.value = true
    message.value = error.response?.data || 'Failed to send reset code.'
  } finally {
    loading.value = false
  }
}
</script>