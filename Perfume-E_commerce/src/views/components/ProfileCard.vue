<template>
  <div class="space-y-6">
    <div
      class="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center border border-gray-100"
    >
      <div class="w-24 h-24 rounded-full overflow-hidden mb-4">
        <img :src="profileData.avatar" alt="Profile Avatar" class="w-full h-full object-cover" />
      </div>
      <h3 class="text-xl font-semibold text-gray-900">
        {{ profileData.firstName }} {{ profileData.lastName }}
      </h3>
      <p class="text-sm text-gray-500 flex items-center">
        {{ profileData.email }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-1 text-[#280559]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </p>
      <button
        class="mt-6 w-full py-3 px-4 bg-[#280559] hover:bg-purple-800 text-white font-medium rounded-lg transition duration-150"
      >
        Change Password
      </button>
    </div>

    <form
      @submit.prevent="changePassword"
      class="p-6 bg-white shadow-lg rounded-xl border border-gray-100"
    >
      <h2 class="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>

      <div class="mb-4">
        <label for="current-password" class="block text-sm font-medium text-gray-700 mb-1"
          >Current Password</label
        >
        <div class="relative">
          <input
            :type="passwordFields.current.type"
            id="current-password"
            v-model="passwords.current"
            class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-[#280559] focus:border-[#280559] pr-10"
            placeholder="Enter password"
          />
          <button
            type="button"
            @click="toggleVisibility('current')"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg
              class="h-5 w-5"
              :fill="passwordFields.current.type === 'password' ? 'none' : 'currentColor'"
              :stroke="passwordFields.current.type === 'password' ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                v-if="passwordFields.current.type === 'password'"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.874-.75h2.25c.621 0 1.125.504 1.125 1.125v2.25M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM12 15a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </button>
        </div>
        <p class="mt-1 text-right text-xs">
          <a href="#" class="text-blue-300 hover:text-[#280559] font-medium"
            >Forgot Current Password? Click here</a
          >
        </p>
      </div>

      <div class="mb-4">
        <label for="new-password" class="block text-sm font-medium text-gray-700 mb-1"
          >New Password</label
        >
        <div class="relative">
          <input
            :type="passwordFields.new.type"
            id="new-password"
            v-model="passwords.new"
            class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 pr-10"
            placeholder="Enter password"
          />
          <button
            type="button"
            @click="toggleVisibility('new')"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg
              class="h-5 w-5"
              :fill="passwordFields.new.type === 'password' ? 'none' : 'currentColor'"
              :stroke="passwordFields.new.type === 'password' ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                v-if="passwordFields.new.type === 'password'"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.874-.75h2.25c.621 0 1.125.504 1.125 1.125v2.25M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM12 15a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="mb-6">
        <label for="re-enter-password" class="block text-sm font-medium text-gray-700 mb-1"
          >Re-enter Password</label
        >
        <div class="relative">
          <input
            :type="passwordFields.reEnter.type"
            id="re-enter-password"
            v-model="passwords.reEnter"
            class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 pr-10"
            placeholder="Enter password"
          />
          <button
            type="button"
            @click="toggleVisibility('reEnter')"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg
              class="h-5 w-5"
              :fill="passwordFields.reEnter.type === 'password' ? 'none' : 'currentColor'"
              :stroke="passwordFields.reEnter.type === 'password' ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                v-if="passwordFields.reEnter.type === 'password'"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.874-.75h2.25c.621 0 1.125.504 1.125 1.125v2.25M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM12 15a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="w-full py-3 px-4 bg-[#280559] hover:bg-[#1f044a] text-white font-medium rounded-lg transition duration-150"
      >
        Save Change
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const profileData = reactive({
  avatar: '/me.jpg',
  firstName: 'Heng',
  lastName: 'Nguonhour',
  email: 'students@gmail.com',
})

const passwords = reactive({
  current: '',
  new: '',
  reEnter: '',
})

// State to manage input type (password/text) for visibility toggle
const passwordFields = reactive({
  current: { type: 'password' },
  new: { type: 'password' },
  reEnter: { type: 'password' },
})

const toggleVisibility = (field) => {
  const fieldState = passwordFields[field]
  fieldState.type = fieldState.type === 'password' ? 'text' : 'password'
}

const changePassword = () => {
  // Logic for changing password (API call, validation, etc.)
  console.log('Changing Password:', passwords)
  // You would typically reset the form here on success
  passwords.current = ''
  passwords.new = ''
  passwords.reEnter = ''
}
</script>
