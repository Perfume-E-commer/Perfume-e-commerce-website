<template>
  <div class="p-6 min-h-screen bg-gray-50 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-gray-900">Admin Profile</h1>
      <p class="text-gray-500">Manage your personal information and account settings</p>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#280559]"></div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="flex flex-col items-center">
            <div class="relative w-40 h-40 mb-6 group">
              <img
                :src="previewImage || getImageUrl(form.imageUrl)"
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
                class="absolute bottom-3 right-3 bg-[#280559] text-white p-3 rounded-full hover:bg-[#1e0342] transition-all shadow-lg hover:shadow-xl hover:scale-110"
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
              class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-purple-50 text-[#280559] mb-4"
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
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
          <form @submit.prevent="changePassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#280559] focus:ring-2 focus:ring-purple-100 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>
            <button
              type="submit"
              :disabled="isChangingPassword"
              class="w-full bg-[#280559] text-white px-6 py-3 rounded-lg font-medium hover:opacity-95 transition-all shadow-sm mt-2 disabled:opacity-70"
            >
              {{ isChangingPassword ? 'Updating...' : 'Update Password' }}
            </button>
          </form>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <PersonalDetails v-model="form" />
          <div class="px-8 pb-8">
            <button
              @click="() => saveProfile()"
              :disabled="isSaving"
              class="w-full sm:w-auto bg-[#280559] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1e0342] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <span
                v-if="isSaving"
                class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"
              ></span>
              {{ isSaving ? 'Saving Changes...' : 'Save Personal Details' }}
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <AddressList
            :addresses="addresses"
            @add-address="handleAddAddress"
            @delete-address="handleDeleteAddress"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userService, { type Address } from '../../services/userService'
import { getImageUrl } from '../../utils/imageHelper'

import PersonalDetails from '@/components/profile/PersonalDetails.vue'
import AddressList from '@/components/profile/AddressList.vue'

const isLoading = ref(false)
const isSaving = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string | null>(null)

const form = ref({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  role: '',
  imageUrl: '',
})

const addresses = ref<Address[]>([])

const loadProfile = async () => {
  isLoading.value = true
  try {
    const response = await userService.getProfile()
    const data = response.data

    form.value = {
      ...form.value,
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role || 'ADMIN',
      phoneNumber: data.phoneNumber || '',
      dateOfBirth: data.dateOfBirth || '',
      imageUrl: data.imageUrl || '',
    }

    addresses.value = data.addresses || []
  } catch (error) {
    console.error('Failed to load profile', error)
  } finally {
    isLoading.value = false
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const previousImage = form.value.imageUrl
  previewImage.value = URL.createObjectURL(file)

  try {
    const res = await userService.uploadAvatar(file)
    form.value.imageUrl = res.data.url
    await saveProfile(true)
  } catch (error) {
    console.error('Avatar upload failed:', error)
    alert('Failed to upload image')
    previewImage.value = null
    form.value.imageUrl = previousImage
  } finally {
    if (event.target instanceof HTMLInputElement) {
      ;(event.target as HTMLInputElement).value = ''
    }
  }
}

const saveProfile = async (silent = false) => {
  isSaving.value = true
  try {
    const payload = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phoneNumber: form.value.phoneNumber,
      dateOfBirth: form.value.dateOfBirth,
      imageUrl: form.value.imageUrl,
    }

    await userService.updateProfile(payload)

    if (!silent) alert('Profile updated successfully!')
  } catch (error: any) {
    console.error('Failed to update profile', error)
    if (!silent) alert('Failed to update profile.')
  } finally {
    isSaving.value = false
  }
}

const handleAddAddress = async (newAddr: Address) => {
  try {
    const res = await userService.addAddress(newAddr)
    addresses.value = res.data.addresses
  } catch (e) {
    alert('Error adding address')
  }
}

const handleDeleteAddress = async (addr: Address) => {
  if (!addr.id && !addr._id) return
  if (confirm('Are you sure you want to remove this address?')) {
    try {
      const idToDelete = addr.id || addr._id || ''
      const res = await userService.deleteAddress(idToDelete)
      addresses.value = res.data.addresses
    } catch (e) {
      alert('Failed to delete address')
    }
  }
}

const passwordForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })
const isChangingPassword = ref(false)

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
    alert(err.response?.data?.message || 'Failed to update password.')
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
