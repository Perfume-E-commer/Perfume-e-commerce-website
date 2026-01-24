<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative py-10">
    <div
      class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 relative z-10 border border-gray-100"
    >
      <div class="text-center mb-8">
        <img src="/Logo.png" alt="ScentHaven" class="h-14 mx-auto mb-4 object-contain" />
        <h1 class="luxurious-roman-regular text-3xl text-[#280559] mb-2">Create Account</h1>
        <p class="text-gray-500 text-sm font-light">Join ScentHaven for exclusive offers</p>
      </div>

      <div
        v-if="authStore.error"
        class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center"
      >
        {{ authStore.error }}
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">First Name</label>
            <input
              v-model="firstName"
              type="text"
              required
              placeholder="Jane"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Last Name</label>
            <input
              v-model="lastName"
              type="text"
              required
              placeholder="Doe"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] transition"
            />
          </div>
        </div>

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

        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Password</label>
          <div class="relative">
            <input
              :type="showPass1 ? 'text' : 'password'"
              v-model="password"
              required
              placeholder="At least 8 characters"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] transition"
            />
            <button
              type="button"
              @click="showPass1 = !showPass1"
              class="absolute right-4 top-3.5 text-gray-400 hover:text-[#280559] transition"
            >
              <span v-if="showPass1">Hide</span>
              <span v-else>Show</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Confirm Password</label>
          <div class="relative">
            <input
              :type="showPass2 ? 'text' : 'password'"
              v-model="confirmPassword"
              required
              placeholder="Repeat password"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] transition"
            />
            <button
              type="button"
              @click="showPass2 = !showPass2"
              class="absolute right-4 top-3.5 text-gray-400 hover:text-[#280559] transition"
            >
              <span v-if="showPass2">Hide</span>
              <span v-else>Show</span>
            </button>
          </div>
          <p v-if="passwordMismatch" class="text-red-500 text-xs mt-1 pl-1">
            Passwords do not match
          </p>
        </div>

        <button
          type="submit"
          :disabled="Boolean(authStore.loading || passwordMismatch.valueOf())"
          class="w-full bg-[#280559] hover:bg-[#1a033a] text-white font-medium py-3.5 rounded-xl transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20 mt-2"
        >
          <span v-if="authStore.loading">Creating Account...</span>
          <span v-else>Register</span>
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        Already have an account?
        <router-link to="/login" class="text-[#280559] font-bold hover:underline">
          Sign In
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import router from '../../router'

const authStore = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPass1 = ref(false)
const showPass2 = ref(false)

const passwordMismatch = computed(() => {
  return password.value && confirmPassword.value && password.value !== confirmPassword.value
})

async function handleRegister() {
  if (passwordMismatch.value) return

  const success = await authStore.register(
    firstName.value,
    lastName.value,
    email.value,
    password.value,
  )

  if (success) {
    router.push({ name: 'verify', query: { email: email.value } })
  }
}
</script>

<style scoped>
.luxurious-roman-regular {
  font-family: 'Luxurious Roman', serif;
}
</style>
