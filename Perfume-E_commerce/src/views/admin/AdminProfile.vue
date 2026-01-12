<template>
  <div class="p-6 min-h-screen bg-gray-50/50 space-y-6 animate-fade-in">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Admin Profile</h1>
        <p class="text-sm text-gray-500 mt-1">Manage your account settings and preferences.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
        <div class="relative w-32 h-32 mb-4 group">
          <img 
            :src="imagePreview || getImageUrl(form.avatarUrl)" 
            class="w-full h-full rounded-full object-cover border-4 border-indigo-50 shadow-sm transition-transform duration-300 group-hover:scale-105"
            alt="Profile"
          >
          
          <input 
            type="file" 
            ref="fileInput" 
            class="hidden" 
            accept="image/*"
            @change="handleFileChange"
          >

          <button 
            @click="triggerFileInput"
            class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2.5 rounded-full hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5" 
            title="Change Photo"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </button>
        </div>

        <h2 class="text-xl font-bold text-gray-900">{{ form.firstName }} {{ form.lastName }}</h2>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-2">
          {{ form.role }}
        </span>
      </div>

      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Personal Information</h3>
        
        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input 
                v-model="form.firstName" 
                type="text" 
                class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input 
                v-model="form.lastName" 
                type="text" 
                class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              v-model="form.email" 
              type="email" 
              disabled
              class="w-full rounded-lg border-gray-300 bg-gray-50 text-gray-500 shadow-sm text-sm cursor-not-allowed"
            >
            <p class="text-xs text-gray-400 mt-1">Email cannot be changed securely from this panel.</p>
          </div>

          <div class="border-t border-gray-100 pt-6">
             <h3 class="text-lg font-bold text-gray-900 mb-4">Address Information</h3>
             <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input 
                    v-model="form.street" 
                    type="text" 
                    placeholder="123 Perfume Lane"
                    class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                  >
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input 
                      v-model="form.city" 
                      type="text" 
                      class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                    <input 
                      v-model="form.zipCode" 
                      type="text" 
                      class="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-sm"
                    >
                  </div>
                </div>
             </div>
          </div>

          <div class="flex justify-end pt-4 border-t border-gray-100 mt-6">
            <button 
              type="submit" 
              class="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm flex items-center"
              :disabled="isSaving"
            >
              <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import adminService from '../../services/adminService'
import { getImageUrl } from '../../utils/imageHelper';

const isLoading = ref(false);
const isSaving = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | undefined>(undefined);
const imagePreview = ref<string | null>(null);

const form = ref({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  avatarUrl: '',
  street: '',
  city: '',
  zipCode: ''
});

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const loadProfile = async () => {
  isLoading.value = true;
  try {
    const response = await adminService.getProfile();
    const data = response.data;
    
    const primaryAddress = data.addresses && data.addresses.length > 0 ? data.addresses[0] : {};

    form.value = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
      avatarUrl: data.imageUrl || data.avatarUrl || '', 
      street: primaryAddress.street || '',
      city: primaryAddress.city || '',
      zipCode: primaryAddress.zipCode || ''
    };
  } catch (error) {
    console.error("Failed to load profile", error);
  } finally {
    isLoading.value = false;
  }
};

const saveProfile = async () => {
  isSaving.value = true;
  try {
    await adminService.updateProfile(
      {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        street: form.value.street,
        city: form.value.city,
        zipCode: form.value.zipCode,
        avatarUrl: form.value.avatarUrl 
      }, 
      selectedFile.value
    );
    
    alert('Profile updated successfully!');
    // Update the Auth Store if needed so Navbar updates immediately
    // const authStore = useAuthStore();
    // authStore.fetchUser(); 
    
    loadProfile();
  } catch (error) {
    console.error("Failed to update profile", error);
    alert('Failed to update profile.');
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>