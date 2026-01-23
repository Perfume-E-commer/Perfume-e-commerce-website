<template>
  <div class="p-6 min-h-screen bg-gray-50 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-gray-900">Admin Profile</h1>
      <p class="text-gray-500">Manage your personal information and account settings</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Profile Card -->
      <div class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex flex-col items-center">
            <div class="relative w-40 h-40 mb-6 group">
              <img
                :src="imagePreview || getImageUrl(form.avatarUrl)"
                @error="onImgError"
                class="w-full h-full rounded-full object-cover border-4 border-indigo-100 shadow-lg transition-transform duration-300 group-hover:scale-105"
                alt="Profile"
              />

              <input
                type="file"
                ref="fileInput"
                class="hidden"
                accept="image/*"
                @change="handleFileChange"
              />

              <button
                @click="triggerFileInput"
                class="absolute bottom-3 right-3 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-110"
                title="Change Photo"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mb-1">
              {{ form.firstName }} {{ form.lastName }}
            </h2>
            <span
              class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4"
            >
              {{ form.role }}
            </span>

            <div class="w-full pt-4 border-t border-gray-100">
              <div class="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-sm">{{ form.email }}</span>
              </div>
              <p class="text-xs text-gray-400 text-center mt-2">Email cannot be changed</p>
            </div>
          </div>
        </div>

        <!-- Change Password -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div class="relative">
                <input
                  v-model="passwordForm.currentPassword"
                  :type="showCurrent ? 'text' : 'password'"
                  placeholder="Enter password"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
                <button
                  type="button"
                  @click="showCurrent = !showCurrent"
                  class="absolute right-3 top-3 text-gray-400"
                >
                  <svg
                    v-if="!showCurrent"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.157-2.007.45-2.93M3 3l18 18"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div class="relative">
                <input
                  v-model="passwordForm.newPassword"
                  :type="showNew ? 'text' : 'password'"
                  placeholder="Enter password"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
                <button
                  type="button"
                  @click="showNew = !showNew"
                  class="absolute right-3 top-3 text-gray-400"
                >
                  <svg
                    v-if="!showNew"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.157-2.007.45-2.93M3 3l18 18"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Re-enter Password</label>
              <div class="relative">
                <input
                  v-model="passwordForm.confirmPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  placeholder="Enter password"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
                <button
                  type="button"
                  @click="showConfirm = !showConfirm"
                  class="absolute right-3 top-3 text-gray-400"
                >
                  <svg
                    v-if="!showConfirm"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.02.157-2.007.45-2.93M3 3l18 18"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="pt-6 border-t border-gray-100">
              <button
                type="submit"
                :disabled="isChangingPassword"
                class="w-full bg-[#280559] text-white px-6 py-3 rounded-lg font-medium hover:opacity-95 transition-all shadow-sm"
              >
                <span
                  v-if="isChangingPassword"
                  class="inline-block mr-2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                ></span>
                {{ isChangingPassword ? 'Saving...' : 'Save Change' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="border-b border-gray-100 px-6 py-4">
            <h3 class="text-xl font-bold text-gray-900">Edit Profile Information</h3>
            <p class="text-sm text-gray-500 mt-1">Update your personal details and address</p>
          </div>

          <form @submit.prevent="saveProfile" class="p-6 space-y-8">
            <!-- Personal Information -->
            <div>
              <h4 class="text-lg font-bold text-gray-900 mb-4">Personal Information</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </div>
              </div>
            </div>

            <!-- Address Information -->
            <div>
              <h4 class="text-lg font-bold text-gray-900 mb-4">Address Information</h4>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    v-model="form.street"
                    type="text"
                    placeholder="123 Perfume Lane"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      v-model="form.city"
                      type="text"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                    <input
                      v-model="form.zipCode"
                      type="text"
                      class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="pt-6 border-t border-gray-100">
              <button
                type="submit"
                class="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                :disabled="isSaving"
              >
                <svg
                  v-if="isSaving"
                  class="animate-spin h-5 w-5 text-white"
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
                {{ isSaving ? 'Saving Changes...' : 'Save All Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import adminService from '../../services/adminService'
import userService from '../../services/userService'
import { getImageUrl } from '../../utils/imageHelper'

const isLoading = ref(false)
const isSaving = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | undefined>(undefined)
const imagePreview = ref<string | null>(null)

const form = ref({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  avatarUrl: '',
  street: '',
  city: '',
  zipCode: '',
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const loadProfile = async () => {
  isLoading.value = true
  try {
    const response = await adminService.getProfile()
    const data = response.data

    form.value = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      avatarUrl: data.avatarUrl || '',

      street: data.street || '',
      city: data.city || '',
      zipCode: data.zipCode || '',
    }
  } catch (error) {
    console.error('Failed to load profile', error)
  } finally {
    isLoading.value = false
  }
}

const saveProfile = async () => {
  isSaving.value = true
  try {
    console.log('Saving Profile Form Data:', form.value)

    const payload = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      street: form.value.street || '',
      city: form.value.city || '',
      zipCode: form.value.zipCode || '',
      avatarUrl: form.value.avatarUrl,
    }

    console.log('Payload to Service:', payload)

    await adminService.updateProfile(payload, selectedFile.value)

    alert('Profile updated successfully!')
    loadProfile()
  } catch (error: any) {
    console.error('Failed to update profile', error)

    if (error.response) {
      console.log('Backend Error Status:', error.response.status)
      console.log('Backend Error Data:', error.response.data)
      alert(`Error: ${JSON.stringify(error.response.data)}`)
    } else {
      alert('Failed to update profile. Check console.')
    }
  } finally {
    isSaving.value = false
  }
}

// Change Password state and handler
const passwordForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })
const isChangingPassword = ref(false)
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match!')
    return
  }

  isChangingPassword.value = true
  try {
    await userService.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword,
    })
    alert('Password updated successfully!')
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (err: any) {
    console.error('Failed to change password', err)
    if (err.response) {
      const data = err.response.data
      const message = data?.message || data?.error || JSON.stringify(data)
      alert(message || 'Failed to update password.')
    } else {
      alert(err.message || 'Failed to update password.')
    }
  } finally {
    isChangingPassword.value = false
  }
}

onMounted(() => {
  loadProfile()
})

const onImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = getImageUrl(undefined)
  img.onerror = null
}
</script>
