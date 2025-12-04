<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Admin Account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">For development purposes only</p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
      >
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ errorMessage }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleCreateAdmin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700"
              >First Name</label
            >
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="First Name"
            />
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Last Name"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="admin@perfume.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Minimum 8 characters"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating Admin...
            </span>
            <span v-else>Create Admin Account</span>
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            Back to Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleCreateAdmin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    const response = await axios.post('http://localhost:8080/api/auth/create-admin', null, {
      params: {
        email: formData.value.email,
        password: formData.value.password,
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
      },
    })

    successMessage.value = response.data

    // Reset form
    formData.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error: any) {
    errorMessage.value = error.response?.data || 'Failed to create admin account'
    console.error('Error creating admin:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
