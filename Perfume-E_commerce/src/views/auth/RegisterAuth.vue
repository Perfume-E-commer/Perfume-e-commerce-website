<template>
  <div class="min-h-screen bg-white flex items-start justify-center relative">

    <!-- Logo -->
    <img
      src=""
      alt="Logo"
      class="absolute top-6 left-6 w-40"
    />

    <!-- Card -->
    <div class="mt-24 w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-100">
      <h2 class="text-gray-700 font-semibold text-lg mb-1">Welcome !</h2>
      <h1 class="text-2xl font-bold text-gray-900 mb-1">Sign up to</h1>
      <p class="text-gray-400 text-sm mb-6">Lorem Ipsum is simply</p>

      <form @submit.prevent="handleRegister" class="space-y-4">
        
        <!-- Email -->
        <div>
          <label class="text-gray-600 text-sm">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

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
              :type="showPass1 ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter your Password"
              class="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />

            <button
              type="button"
              @click="showPass1 = !showPass1"
              class="absolute right-3 top-2.5 text-gray-500"
            >
              <span v-if="showPass1">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="text-gray-600 text-sm">Confirm Password</label>
          <div class="relative mt-1">
            <input
              :type="showPass2 ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Confirm your Password"
              class="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />

            <button
              type="button"
              @click="showPass2 = !showPass2"
              class="absolute right-3 top-2.5 text-gray-500"
            >
              <span v-if="showPass2">🙈</span>
              <span v-else>👁️</span>
            </button>
          </div>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full bg-purple-800 hover:bg-purple-900 text-white py-2 rounded-md font-medium transition"
        >
          Register
        </button>

      </form>

      <!-- Link -->
      <p class="text-center text-gray-600 text-sm mt-4">
        Already have an Account?
        <router-link to="/auth/login" class="text-purple-700 font-medium hover:underline">
          Login
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const showPass1 = ref(false);
const showPass2 = ref(false);

function handleRegister() {
  console.log("Register submitted:", email.value, username.value, password.value);
}
</script>
