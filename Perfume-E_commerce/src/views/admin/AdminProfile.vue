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
        <div class="relative w-32 h-32 mb-4">
          <img 
            :src="form.avatarUrl || 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff'" 
            class="w-full h-full rounded-full object-cover border-4 border-indigo-50"
            alt="Profile"
          >
          <label class="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition shadow-sm cursor-pointer" title="Change Photo">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <input 
              type="file" 
              accept="image/*" 
              class="hidden"
              @change="onFileSelect"
            >
          </label>
        </div>
        <h2 class="text-xl font-bold text-gray-900">{{ form.firstName }} {{ form.lastName }}</h2>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-2">
          {{ form.role }}
        </span>
        <p class="text-sm text-gray-500 mt-4">
          "With great power comes great responsibility."
        </p>
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
             <h3 class="text-lg font-bold text-gray-900 mb-4">Security</h3>
             <button type="button" class="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center">
               <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
               Change Password
             </button>
          </div>

          <div class="flex justify-end pt-4">
            <button 
              type="submit" 
              class="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm flex items-center"
              :disabled="isSaving"
            >
              <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Save Changes
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

const isLoading = ref(false);
const isSaving = ref(false);
const selectedFile = ref<File | null>(null);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  avatarUrl: ''
});

const onFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
    // Preview the image
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        form.value.avatarUrl = e.target.result as string;
      }
    };
    reader.readAsDataURL(target.files[0]);
  }
};

const loadProfile = async () => {
  isLoading.value = true;
  try {
    const response = await adminService.getProfile();
    form.value = {
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      role: response.data.role,
      avatarUrl: response.data.avatarUrl || ''
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
    const formData = new FormData();
    
    formData.append('firstName', form.value.firstName);
    formData.append('lastName', form.value.lastName);
    
    if (selectedFile.value) {
      formData.append('image', selectedFile.value);
    }

    await adminService.updateProfile(formData);
    alert('Profile updated successfully!');
    selectedFile.value = null; 
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