<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative">
    
    <div class="absolute inset-0 opacity-5 pointer-events-none bg-[url('/Image/HomePage/Main.png')] bg-cover bg-center"></div>

    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 relative z-10 border border-gray-100">
      
      <div class="text-center mb-8">
        <img src="/Logo.png" alt="ScentHaven" class="h-16 mx-auto mb-4 object-contain" />
        <h1 class="luxurious-roman-regular text-3xl text-[#280559] mb-2">Welcome Back</h1>
        <p class="text-gray-500 text-sm font-light">Please sign in to access your account</p>
      </div>

      <div v-if="authStore.error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
        {{ authStore.error }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        
        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="name@example.com"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-[#280559] mb-1 pl-1">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
              placeholder="Enter your password"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#280559] focus:border-transparent transition-all"
            />
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="absolute right-4 top-3.5 text-gray-400 hover:text-[#280559] transition"
            >
              <span v-if="showPassword">Hide</span>
              <span v-else>Show</span>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 text-[#280559] border-gray-300 rounded focus:ring-[#280559]">
            <span class="text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-[#280559] font-medium hover:underline">Forgot Password?</a>
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-[#280559] hover:bg-[#1a033a] text-white font-medium py-3.5 rounded-xl transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20"
        >
          <span v-if="authStore.loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing In...
          </span>
          <span v-else>Sign In</span>
        </button>

      </form>

      <p class="mt-8 text-center text-sm text-gray-500">
        Don't have an account? 
        <router-link to="/register" class="text-[#280559] font-bold hover:underline">
          Create Account
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value);
  if (success) {
    if (authStore.user?.role === 'ADMIN') {
      router.push('/admin/dashboard');
    } else {
      router.push('/');
    }
  }
};
</script>