<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-full">
    <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
      <h2 class="text-xl font-bold text-gray-900">Profile Update</h2>
      <button
        class="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
      >
        Delete Avatar
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1.5">First Name</label>
        <input
          v-model="form.firstName"
          type="text"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition"
        />
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1.5">Last Name</label>
        <input
          v-model="form.lastName"
          type="text"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-gray-700 text-sm font-medium mb-1.5"
          >Email Address</label
        >
        <div class="relative">
          <input
            v-model="form.email"
            type="email"
            readonly
            class="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
          />
          <span
            class="absolute right-4 top-3.5 text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded"
            >Verified</span
          >
        </div>
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1.5">Phone Number</label>
        <div class="relative">
          <span
            class="absolute left-3 top-3.5 flex items-center justify-center w-6 h-6 text-lg"
            >🇰🇭</span
          >
          <input
            v-model="form.phoneNumber"
            type="text"
            class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition"
            placeholder="+855 ..."
          />
        </div>
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1.5">Gender</label>
        <div class="relative">
          <select
            class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition appearance-none cursor-pointer"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <div class="absolute right-4 top-4 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1.5"
          >Date of Birth</label
        >
        <input
          v-model="form.dateOfBirth"
          type="date"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition text-gray-600"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-gray-700 text-sm font-medium mb-1.5">Address</label>
        <input
          v-model="form.street"
          type="text"
          placeholder="Street address, apartment, suite"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition"
        />
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1.5">City</label>
        <input
          v-model="form.city"
          type="text"
          placeholder="Phnom Penh"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition"
        />
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-medium mb-1.5">Country</label>
        <input
          v-model="form.country"
          type="text"
          placeholder="Cambodia"
          class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-gray-700 text-sm font-medium mb-1.5">Credit Card</label>

        <div
          v-for="(card, index) in form.creditCards"
          :key="index"
          class="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between shadow-sm mb-2"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs"
            >
              Card
            </div>
            <span class="text-gray-900 font-medium">{{ card.cardNumber }}</span>
          </div>
          <button
            @click="removeCard(index)"
            class="text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>

        <!-- Add Card Button -->
        <button
          @click="addCard"
          class="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-gray-500 hover:text-gray-700 mt-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span class="font-medium">Add Card</span>
        </button>

        <div v-if="form.creditCards.length === 0" class="text-sm text-gray-400 italic">
          No cards saved.
        </div>
      </div>

      <div class="md:col-span-2 mt-2">
        <label
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
        >
          <input
            type="checkbox"
            class="w-5 h-5 text-[#280559] border-gray-300 rounded focus:ring-[#280559]"
            checked
          />
          <div>
            <p class="text-sm font-medium text-gray-900">Subscribe to our Newsletter</p>
            <p class="text-xs text-gray-500">
              Receive updates on new arrivals and special promotions.
            </p>
          </div>
        </label>
      </div>

      <div class="md:col-span-2 mt-6 text-right">
        <button
          @click="saveChanges"
          class="bg-[#2E0249] text-white px-8 py-3 rounded-lg hover:bg-purple-900 transition font-medium shadow-lg shadow-purple-100 transform active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import userService from '@/services/userService'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  zipCode: '',
  street: '',
  city: '',
  country: '',
  imageUrl: '',
  creditCards: [] as Array<{ cardNumber: string; expiryDate: string; cvv: string }>,
})

onMounted(async () => {
  try {
    const res = await userService.getProfile()
    const user = res.data
    form.value = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      dateOfBirth: user.dateOfBirth || '',
      imageUrl: user.imageUrl || '',
      street: user.addresses?.[0]?.street || '',
      zipCode: user.addresses?.[0]?.zipCode || '',
      creditCards: user.creditCards || [],
    }
  } catch (error) {
    console.error('Failed to load profile', error)
  }
})

const saveChanges = async () => {
  try {
    await userService.updateProfile(form.value)
    alert('Profile updated successfully!')
  } catch (error) {
    alert('Failed to update profile.')
  }
}

const addCard = () => {
  form.value.creditCards.push({
    cardNumber: '**** **** **** 0000',
    expiryDate: '12/30',
    cvv: '123',
  })
}

const removeCard = (index: number) => {
  if (confirm('Are you sure you want to remove this card?')) {
    form.value.creditCards.splice(index, 1)
  }
}
</script>