<template>
  <div class="w-full">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#280559]"></div>
    </div>

    <div v-else class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-6 w-full md:w-auto">
          <div class="relative group cursor-pointer" @click="triggerFileInput">
            <div
              class="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 group-hover:border-[#280559] p-1 transition-colors"
            >
              <img
                :src="
                  previewImage ||
                  getFullImageUrl(form.imageUrl) ||
                  'https://via.placeholder.com/150'
                "
                alt="Profile"
                class="w-full h-full rounded-full object-cover"
              />
            </div>
            <div
              class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
              </svg>
            </div>
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/*"
              @change="handleFileChange"
            />
          </div>

          <div>
            <h1 class="text-2xl font-serif font-bold text-[#280559]">My Profile</h1>
            <p class="text-gray-500 text-sm mt-1">Manage your account settings</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            @click="showPasswordModal = true"
            class="px-6 py-3 rounded-xl text-sm font-bold text-[#280559] bg-purple-50 hover:bg-purple-100 transition-colors flex-grow md:flex-grow-0"
          >
            Change Password
          </button>

          <button
            @click="saveProfileInfo"
            :disabled="isSaving"
            class="bg-[#280559] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-[#1e0342] transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-grow md:flex-grow-0"
          >
            <span
              v-if="isSaving"
              class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
            ></span>
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <hr class="border-gray-100" />

      <PersonalDetails v-model="form" />

      <hr class="border-gray-100 mx-8" />

      <AddressList
        :addresses="addresses"
        @add-address="handleAddAddress"
        @delete-address="handleDeleteAddress"
      />

      <hr class="border-gray-100 mx-8" />

      <PaymentList
        :credit-cards="creditCards"
        @add-card="handleAddCard"
        @delete-card="handleDeleteCard"
      />
    </div>

    <div
      v-if="showPasswordModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl transform transition-all">
        <h3 class="text-xl font-bold text-[#280559] mb-6">Change Password</h3>

        <form @submit.prevent="savePasswordChange" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Current Password</label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              required
              class="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-[#280559]"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">New Password</label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              required
              minlength="8"
              class="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-[#280559]"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Confirm New Password</label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              required
              class="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-[#280559]"
            />
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 py-3 bg-[#280559] text-white font-bold rounded-xl hover:bg-[#1e0342] transition shadow-md"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userService, { type Address, type CreditCard } from '@/services/userService'
import PersonalDetails from '@/components/profile/PersonalDetails.vue'
import AddressList from '@/components/profile/AddressList.vue'
import PaymentList from '@/components/profile/PaymentList.vue'

const isLoading = ref(true)
const isSaving = ref(false)
const showPasswordModal = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string | null>(null);
const addresses = ref<Address[]>([])
const creditCards = ref<CreditCard[]>([])
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  imageUrl: '',
})

const passwordForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })

// Fetch Data
const fetchProfile = async () => {
  isLoading.value = true
  try {
    const res = await userService.getProfile()
    const user = res.data
    form.value = { ...user }
    addresses.value = user.addresses || []
    creditCards.value = user.creditCards || []
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const getFullImageUrl = (path: string) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return path; 
};

// Profile Actions
const saveProfileInfo = async () => {
  isSaving.value = true
  try {
    await userService.updateProfile(form.value)
    alert('Profile saved!')
  } catch (e) {
    alert('Error saving profile.')
  } finally {
    isSaving.value = false
  }
}

// Address Actions
const handleAddAddress = async (newAddr: Address) => {
  try {
    const res = await userService.addAddress(newAddr)
    addresses.value = res.data.addresses
  } catch (e) {
    alert('Error adding address')
  }
}

const handleDeleteAddress = async (addr: Address) => { 
  if (!addr.id) return; 
  if(confirm("Are you sure you want to remove this address?")) {
    try {
      const res = await userService.deleteAddress(addr.id);
      addresses.value = res.data.addresses; 
    } catch (e) { alert("Failed to delete address"); }
  }
};

// Payment Actions
const handleAddCard = async (newCard: CreditCard) => {
  try {
    const res = await userService.addCreditCard(newCard)
    creditCards.value = res.data.creditCards
  } catch (e) {
    alert('Error adding card')
  }
}

const handleDeleteCard = async (card: CreditCard) => { 
  if (!card.id) return;
  if(confirm("Are you sure you want to remove this card?")) {
    try {
      const res = await userService.deleteCreditCard(card.id);
      creditCards.value = res.data.creditCards;
    } catch (e) { alert("Failed to delete card"); }
  }
};

// Avatar Upload Logic
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
    
    form.value.imageUrl = res.data.url;

    console.log("Image URL set to:", form.value.imageUrl);
    
  } catch (error) {
    console.error('Avatar upload failed:', error)
    alert("Failed to upload image")
    
    previewImage.value = null
    form.value.imageUrl = previousImage
  } finally {
    if (event.target instanceof HTMLInputElement) {
      (event.target as HTMLInputElement).value = ''
    }
  }
}

const savePasswordChange = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match!')
    return
  }

  try {
    await userService.changePassword({
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword,
    })
    alert('Password updated successfully!')
    showPasswordModal.value = false
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  } catch (error) {
    alert('Failed to update password. Check your current password.')
  }
}

onMounted(fetchProfile)
</script>
