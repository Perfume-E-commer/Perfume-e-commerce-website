<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar />

    <main class="flex-grow container mx-auto px-4 py-10 mt-24">
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <router-link to="/" class="hover:text-[#280559]">Home</router-link> /
        <span>My Account</span> /
        <span class="text-[#280559] font-medium">My Profile</span>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 items-start">
        <aside class="w-full lg:w-1/4 shrink-0">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul class="flex flex-col text-gray-600">
              <li>
                <a
                  href="#"
                  class="block px-6 py-4 font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
                >
                  My Profile
                </a>
              </li>
              <li>
                <router-link to="/orders" class="block px-6 py-4 hover:bg-gray-50 transition"
                  >My Orders</router-link
                >
              </li>
              <li>
                <a href="#" class="block px-6 py-4 hover:bg-gray-50 transition">My Returns</a>
              </li>
              <li>
                <a href="#" class="block px-6 py-4 hover:bg-gray-50 transition">My Wish list</a>
              </li>
              <li>
                <a href="#" class="block px-6 py-4 hover:bg-gray-50 transition">Order History</a>
              </li>
            </ul>
          </div>

          <button
            @click="handleLogout"
            class="mt-6 w-full bg-white border border-gray-200 text-red-600 font-medium py-3 rounded-xl hover:bg-red-50 transition shadow-sm"
          >
            Log Out
          </button>
        </aside>

        <div class="w-full lg:w-3/4 flex flex-col xl:flex-row gap-8">
          <div class="w-full xl:w-1/3 space-y-6">
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center"
            >
              <h2 class="text-xl font-bold text-gray-900 self-start mb-6">Profile</h2>

              <div class="relative w-32 h-32 mb-4">
                <img
                  :src="form.imageUrl || 'https://i.pravatar.cc/150?img=12'"
                  alt="Profile"
                  class="w-full h-full rounded-full object-cover border-4 border-gray-50 shadow-inner"
                />
                <button
                  class="absolute bottom-0 right-0 bg-[#280559] p-2 rounded-full text-white hover:bg-purple-900 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>

              <h3 class="text-2xl font-bold text-gray-900 mb-1">
                {{ form.firstName }} {{ form.lastName }}
              </h3>
              <p class="text-gray-500 mb-8">{{ form.email }}</p>

              <button
                @click="showPasswordSection = !showPasswordSection"
                class="w-full bg-[#2E0249] text-white font-medium py-3 rounded-xl hover:bg-purple-900 transition shadow-lg shadow-purple-100"
              >
                {{ showPasswordSection ? 'Hide Password Options' : 'Change Password' }}
              </button>
            </div>

            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform -translate-y-4 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-active-class="transition duration-200 ease-in"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-to-class="transform -translate-y-4 opacity-0"
            >
              <div
                v-if="showPasswordSection"
                class="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
              >
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-bold text-gray-900">Change Password</h2>
                </div>

                <form @submit.prevent="handleChangePassword" class="space-y-5">
                  <div>
                    <input
                      type="password"
                      placeholder="Current Password"
                      class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <div class="relative">
                      <input
                        v-model="newPassword"
                        type="password"
                        placeholder="New Password"
                        class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition placeholder-gray-400"
                      />
                    </div>

                    <div class="mt-2 flex items-center gap-1" v-if="newPassword">
                      <div
                        class="h-1 flex-1 rounded-full transition-all duration-300"
                        :class="passwordStrength > 0 ? 'bg-red-400' : 'bg-gray-200'"
                      ></div>
                      <div
                        class="h-1 flex-1 rounded-full transition-all duration-300"
                        :class="passwordStrength > 1 ? 'bg-yellow-400' : 'bg-gray-200'"
                      ></div>
                      <div
                        class="h-1 flex-1 rounded-full transition-all duration-300"
                        :class="passwordStrength > 2 ? 'bg-green-500' : 'bg-gray-200'"
                      ></div>
                    </div>
                    <p class="text-xs text-gray-400 mt-1" v-if="newPassword">
                      {{ passwordStrengthText }}
                    </p>
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder="Re-enter Password"
                      class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    class="w-full bg-[#2E0249] text-white font-medium py-3 rounded-xl hover:bg-purple-900 transition shadow-md"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </transition>
          </div>

          <div class="w-full xl:w-2/3">
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
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import userService from '@/services/userService'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const showPasswordSection = ref(false)
const newPassword = ref('')

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

const passwordStrength = computed(() => {
  let score = 0
  if (newPassword.value.length > 5) score++
  if (newPassword.value.length > 8) score++
  if (/[A-Z]/.test(newPassword.value) && /[0-9]/.test(newPassword.value)) score++
  return score
})

const passwordStrengthText = computed(() => {
  if (passwordStrength.value === 1) return 'Weak'
  if (passwordStrength.value === 2) return 'Medium'
  if (passwordStrength.value === 3) return 'Strong'
  return ''
})

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

const handleChangePassword = () => {
  alert('Password change logic goes here!')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
