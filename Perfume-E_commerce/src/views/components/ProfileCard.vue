<template>
  <div class="bg-white shadow-lg rounded-xl border border-gray-100">
    <div class="flex justify-between items-center p-6 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900">Profile Update</h2>
    </div>

    <form @submit.prevent="updateProfile" class="p-6 space-y-6">
      <div class="flex items-center space-x-4 pb-4 border-b border-gray-100">
        <div class="w-16 h-16 rounded-full overflow-hidden border">
          <img :src="formData.avatar || 'https://via.placeholder.com/150'" alt="Avatar" class="w-full h-full object-cover" />
        </div>

        <div class="flex space-x-2">
          <input 
            type="file" 
            ref="fileInput" 
            class="hidden" 
            accept="image/*"
            @change="handleFileUpload"
          />
          <button
            type="button"
            @click="triggerFileInput"
            class="py-2 px-4 bg-[#280559] hover:bg-[#1f044a] text-white text-sm font-medium rounded-lg transition duration-150"
            :disabled="isUploading"
          >
            {{ isUploading ? 'Uploading...' : 'Upload New' }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <input 
            v-model="formData.firstName" 
            type="text" 
            class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#280559] focus:border-[#280559]"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <input 
            v-model="formData.lastName" 
            type="text" 
            class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#280559] focus:border-[#280559]"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            v-model="formData.phoneNumber" 
            type="tel" 
            class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#280559] focus:border-[#280559]"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="formData.email" 
            type="email" 
            readonly 
            class="w-full py-2 px-3 border border-gray-300 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed"
          />
        </div>
        
        <div class="space-y-1 md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Address</label>
          <input 
            v-model="formData.address" 
            type="text" 
            class="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#280559] focus:border-[#280559]"
          />
        </div>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="w-full py-3 px-4 bg-[#280559] hover:bg-[#1f044a] text-white font-medium rounded-lg transition duration-150 disabled:opacity-50"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/apiClient';

const fileInput = ref(null);
const isLoading = ref(false);
const isUploading = ref(false);

const formData = ref({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  avatar: ''
});

// 1. Fetch User Profile
const loadProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    // Merge response data into formData
    Object.assign(formData.value, response.data);
  } catch (error) {
    console.error("Failed to load profile", error);
  }
};

const triggerFileInput = () => fileInput.value.click();

// 2. Handle Image Upload
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Basic Validation
  if (!file.type.match('image.*')) {
    alert('Please select an image file');
    return;
  }

  isUploading.value = true;
  const uploadData = new FormData();
  uploadData.append('file', file); // ✅ Key must match @RequestParam("file") in FileController

  try {
    // ✅ Call the correct endpoint: /upload (not /upload/avatar)
    const response = await api.post('/upload', uploadData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    // ✅ Update avatar URL from response
    formData.value.avatar = response.data.url;
    
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Failed to upload image.');
  } finally {
    isUploading.value = false;
    event.target.value = ''; // Reset input
  }
};

// 3. Save Profile
const updateProfile = async () => {
  isLoading.value = true;
  try {
    await api.put('/users/profile', formData.value);
    alert('Profile updated successfully!');
    // Reload to update the Header/Sidebar avatar if needed
    window.location.reload();
  } catch (error) {
    console.error('Update failed:', error);
    alert('Failed to update profile.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>