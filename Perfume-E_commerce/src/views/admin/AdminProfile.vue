<template>
  <div class="p-6 min-h-screen bg-gray-50 space-y-6">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-gray-900">Admin Profile</h1>
      <p class="text-gray-500">Manage your personal information and account settings</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange" />
              <button
                @click="triggerFileInput"
                class="absolute bottom-3 right-3 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-110"
                title="Change Photo"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-1">
              {{ form.firstName }} {{ form.lastName }}
            </h2>
            <span class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
              {{ form.role }}
            </span>
            <div class="w-full pt-4 border-t border-gray-100">
              <div class="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
              <input v-model="passwordForm.currentPassword" type="password" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input v-model="passwordForm.newPassword" type="password" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input v-model="passwordForm.confirmPassword" type="password" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none" />
            </div>
            <button type="submit" :disabled="isChangingPassword" class="w-full bg-[#280559] text-white px-6 py-3 rounded-lg font-medium hover:opacity-95 transition-all shadow-sm mt-2">
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
                @click="saveProfile"
                :disabled="isSaving"
                class="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <span v-if="isSaving" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                {{ isSaving ? 'Saving Changes...' : 'Save Personal Details' }}
              </button>
           </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <AddressList 
             :addresses="adminAddressArray" 
             @add-address="handleAdminAddressUpdate"
             @delete-address="handleAdminAddressDelete"
           />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import adminService from '../../services/adminService'
import userService, { type Address } from '../../services/userService'
import { getImageUrl } from '../../utils/imageHelper'

import PersonalDetails from '@/components/profile/PersonalDetails.vue'
import AddressList from '@/components/profile/AddressList.vue'

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
  phoneNumber: '', 
  dateOfBirth: '',
  role: '',
  avatarUrl: '',
  street: '',
  city: '',
  zipCode: '',
  fullName: '', 
})

const adminAddressArray = computed<Address[]>(() => {
  if (!form.value.street && !form.value.city) return []
  
  return [{
    id: 'admin-main',
    fullName: `${form.value.firstName} ${form.value.lastName}`,
    houseNumber: '', 
    street: form.value.street,
    village: '',
    community: '',
    district: '',
    city: form.value.city,
    zipCode: form.value.zipCode,
    phoneNumber: form.value.phoneNumber || '',
  }]
})

const handleAdminAddressUpdate = async (newAddr: Address) => {
  form.value.street = `${newAddr.houseNumber ? '#' + newAddr.houseNumber + ', ' : ''}${newAddr.street}`
  form.value.city = newAddr.city
  form.value.zipCode = newAddr.zipCode
  await saveProfile()
}

const handleAdminAddressDelete = async () => {
  if(confirm("Clear address details?")) {
    form.value.street = ''
    form.value.city = ''
    form.value.zipCode = ''
    await saveProfile()
  }
}

const triggerFileInput = () => { fileInput.value?.click() }

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
      ...form.value, 
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
    const payload = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      street: form.value.street,
      city: form.value.city,
      zipCode: form.value.zipCode,
      avatarUrl: form.value.avatarUrl,
    }
    await adminService.updateProfile(payload, selectedFile.value)
    alert('Profile updated successfully!')
    loadProfile() 
  } catch (error: any) {
    console.error('Failed to update profile', error)
    alert('Failed to update profile.')
  } finally {
    isSaving.value = false
  }
}

// Password Logic
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
    alert(err.response?.data?.message || 'Failed to update password.')
  } finally {
    isChangingPassword.value = false
  }
}

onMounted(() => { loadProfile() })

const onImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = getImageUrl(undefined)
  img.onerror = null
}
</script>