<template>
  <div class="flex flex-col xl:flex-row gap-8">
    
    <div class="w-full xl:w-1/3 space-y-6">
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
        <h2 class="text-xl font-bold text-gray-900 self-start mb-6">Profile</h2>

        <div class="relative w-32 h-32 mb-4">
          <img 
            :src="form.imageUrl || 'https://i.pravatar.cc/150?img=12'" 
            alt="Profile" 
            class="w-full h-full rounded-full object-cover border-4 border-gray-50 shadow-inner"
          >
          <button class="absolute bottom-0 right-0 bg-[#280559] p-2 rounded-full text-white hover:bg-purple-900 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        
        <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ form.firstName }} {{ form.lastName }}</h3>
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
        <div v-if="showPasswordSection" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">Change Password</h2>
             <a href="#" class="text-sm text-[#280559] hover:underline">Need help?</a>
          </div>

          <form @submit.prevent="handleChangePassword" class="space-y-5">
             <div>
               <label class="block text-gray-700 text-sm font-medium mb-1.5">Current Password</label>
               <input type="password" placeholder="Enter current password" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition">
             </div>

             <div>
               <label class="block text-gray-700 text-sm font-medium mb-1.5">New Password</label>
               <input v-model="newPassword" type="password" placeholder="Enter new password" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition">
               <div class="mt-2 flex items-center gap-1" v-if="newPassword">
                 <div class="h-1 flex-1 rounded-full transition-all duration-300" :class="passwordStrength > 0 ? 'bg-red-400' : 'bg-gray-200'"></div>
                 <div class="h-1 flex-1 rounded-full transition-all duration-300" :class="passwordStrength > 1 ? 'bg-yellow-400' : 'bg-gray-200'"></div>
                 <div class="h-1 flex-1 rounded-full transition-all duration-300" :class="passwordStrength > 2 ? 'bg-green-500' : 'bg-gray-200'"></div>
               </div>
               <p class="text-xs text-gray-400 mt-1" v-if="newPassword">{{ passwordStrengthText }}</p>
             </div>

             <div>
               <label class="block text-gray-700 text-sm font-medium mb-1.5">Re-enter Password</label>
               <input type="password" placeholder="Confirm new password" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition">
             </div>

             <button type="submit" class="w-full bg-[#2E0249] text-white font-medium py-3 rounded-xl hover:bg-purple-900 transition shadow-md">
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
          <button class="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Edit Profile
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1.5">First Name</label>
            <input v-model="form.firstName" type="text" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition font-medium text-gray-900">
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1.5">Last Name</label>
            <input v-model="form.lastName" type="text" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition font-medium text-gray-900">
          </div>

          <div class="md:col-span-2">
            <label class="block text-gray-700 text-sm font-medium mb-1.5">Email Address</label>
            <div class="relative">
              <input v-model="form.email" type="email" readonly class="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed font-medium">
              <span class="absolute right-4 top-3.5 text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded border border-green-200">Verified</span>
            </div>
          </div>

          <div>
             <label class="block text-gray-700 text-sm font-medium mb-1.5">Phone Number</label>
             <div class="relative flex">
               <div class="absolute left-0 top-0 h-full px-3 flex items-center bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg">
                 <span class="text-lg">🇰🇭</span>
               </div>
               <input v-model="form.phoneNumber" type="text" class="w-full bg-gray-50 border border-gray-200 rounded-lg pl-14 pr-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition font-medium" placeholder="+855 ...">
             </div>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1.5">Gender</label>
            <div class="relative">
              <select class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition appearance-none cursor-pointer font-medium text-gray-700">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <div class="absolute right-4 top-4 pointer-events-none text-gray-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1.5">Date of Birth</label>
            <input v-model="form.dateOfBirth" type="date" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition text-gray-600 font-medium">
          </div>

          <div class="md:col-span-2">
            <label class="block text-gray-700 text-sm font-medium mb-1.5">Address</label>
            <input v-model="form.street" type="text" placeholder="Street address, apartment, suite" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition font-medium">
          </div>

          <div>
            <label class="block text-gray-700 text-sm font-medium mb-1.5">City</label>
            <input v-model="form.city" type="text" placeholder="Phnom Penh" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition font-medium">
          </div>
          <div>
             <label class="block text-gray-700 text-sm font-medium mb-1.5">Country</label>
             <input v-model="form.country" type="text" placeholder="Cambodia" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#280559] outline-none transition font-medium">
          </div>
          
          <div class="md:col-span-2 pt-6 border-t border-gray-100">
            <label class="block text-gray-700 text-sm font-medium mb-3">Saved Cards</label>
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                 <div class="w-10 h-6 bg-red-500 rounded text-white text-[10px] flex items-center justify-center font-bold tracking-wider">VISA</div>
                 <span class="font-medium text-gray-900 text-sm">•••• •••• •••• 4444</span>
              </div>
              <button class="text-gray-400 hover:text-red-500 transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
            </div>
             <button class="mt-3 text-sm text-[#280559] font-medium hover:underline flex items-center gap-1">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
               Add New Card
             </button>
          </div>

          <div class="md:col-span-2 mt-4 text-right">
             <button @click="saveChanges" class="bg-[#2E0249] text-white px-10 py-3 rounded-xl hover:bg-purple-900 transition font-medium shadow-lg shadow-purple-100 transform active:scale-95">
               Save Changes
             </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import userService from '@/services/userService';

// State Management
const showPasswordSection = ref(false);
const newPassword = ref('');

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  street: '',
  city: '',
  country: '',
  imageUrl: ''
});

// Fetch Data
onMounted(async () => {
  try {
    const res = await userService.getProfile();
    const user = res.data;
    
    form.value = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      dateOfBirth: user.dateOfBirth || '',
      imageUrl: user.imageUrl || '',
      street: user.addresses?.[0]?.street || '',
      city: user.addresses?.[0]?.city || '', // Assuming this exists
      country: user.addresses?.[0]?.country || '' // Assuming this exists
    };
  } catch (error) {
    console.error("Failed to load profile", error);
  }
});

// Save Logic
const saveChanges = async () => {
  try {
    // You might need to restructure address into array before sending
    await userService.updateProfile(form.value);
    alert('Profile updated successfully!');
  } catch (error) {
    alert('Failed to update profile.');
  }
};

const handleChangePassword = () => {
  alert("Password update logic here");
};

const passwordStrength = computed(() => {
  let score = 0;
  if (newPassword.value.length > 5) score++;
  if (newPassword.value.length > 8) score++;
  if (/[A-Z]/.test(newPassword.value) && /[0-9]/.test(newPassword.value)) score++;
  return score;
});

const passwordStrengthText = computed(() => {
  if (passwordStrength.value === 1) return 'Weak';
  if (passwordStrength.value === 2) return 'Medium';
  if (passwordStrength.value === 3) return 'Strong';
  return '';
});
</script>