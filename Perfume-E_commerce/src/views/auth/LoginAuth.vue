<template>
  <div class="min-h-screen bg-white flex items-start justify-center relative">

    <!-- Logo top-left -->
    <img
      src=""
      alt="Logo"
      class="absolute top-6 left-6 w-40"
    />

    <!-- Card -->
    <div class="mt-24 w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-100">
      <h2 class="text-gray-700 font-semibold text-lg mb-1">Welcome !</h2>
      <h1 class="text-2xl font-bold text-gray-900 mb-1">Sign in to</h1>
      <p class="text-gray-400 text-sm mb-6">Lorem Ipsum is simply</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        
        <!-- Username -->
        <div>
          <label class="text-gray-600 text-sm">User name</label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter your user name"
            class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="text-gray-600 text-sm">Password</label>

          <div class="relative mt-1">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter your Password"
              class="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />

            <!-- Toggle -->
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-2.5 text-gray-500"
            >
              <span v-if="showPassword">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
        </div>

        <!-- Remember + Forgot -->
        <div class="flex justify-between items-center text-sm">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" class="rounded border-gray-300" />
            <span class="text-gray-600">Remember me</span>
          </label>

          <a href="#" class="text-purple-700 hover:underline">Forgot Password?</a>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-purple-800 hover:bg-purple-900 text-white py-2 rounded-md font-medium transition"
        >
          Login
        </button>

      </form>

      <!-- Link -->
      <p class="text-center text-gray-600 text-sm mt-4">
        Don’t have an Account?
        <router-link to="/auth/register" class="text-purple-700 font-medium hover:underline">
          Register
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const password = ref("");
const showPassword = ref(false);

function handleLogin() {
  console.log("Login submitted:", username.value, password.value);
}
</script>
