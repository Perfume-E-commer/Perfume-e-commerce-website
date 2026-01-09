<template>
  <div class="space-y-8">
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Main Product Image</h3>
      
      <div class="flex flex-col md:flex-row gap-6">
        <div class="shrink-0">
          <div class="w-48 h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
            <img 
              v-if="formData.imageUrl" 
              :src="formData.imageUrl" 
              class="w-full h-full object-cover"
              alt="Main Preview" 
            />
            <div v-else class="text-center p-4">
              <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs text-gray-500 block mt-2">No image set</span>
            </div>

            <button 
              v-if="formData.imageUrl"
              @click="formData.imageUrl = ''"
              class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove Image"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <div class="flex-1 space-y-4">
          <div class="flex space-x-4 border-b border-gray-100">
            <button 
              @click="mainMode = 'url'"
              :class="mainMode === 'url' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'"
              class="pb-2 text-sm font-medium transition-colors"
            >
              Image URL
            </button>
            <button 
              @click="mainMode = 'file'"
              :class="mainMode === 'file' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'"
              class="pb-2 text-sm font-medium transition-colors"
            >
              Upload File
            </button>
          </div>

          <div v-if="mainMode === 'url'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Paste Image Link</label>
            <input 
              v-model="formData.imageUrl" 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
            <p class="text-xs text-gray-500 mt-1">Supports JPG, PNG, WebP from any external source.</p>
          </div>

          <div v-if="mainMode === 'file'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Select from Computer</label>
            <div class="relative">
              <input 
                type="file" 
                accept="image/*"
                @change="(e) => handleFileUpload(e, 'main')"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
              <div v-if="uploading.main" class="absolute right-2 top-2">
                <span class="text-xs text-indigo-600 font-medium animate-pulse">Uploading...</span>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Files are uploaded instantly. Extensions allowed: jpg, png, webp.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-gray-900">Gallery Images</h3>
        <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{{ formData.images.length }} images</span>
      </div>

      <div v-if="formData.images.length > 0" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
        <div v-for="(img, index) in formData.images" :key="index" class="relative group aspect-square">
          <img :src="img" class="w-full h-full object-cover rounded-lg border border-gray-200" />
          <button 
            @click="removeGalleryImage(index)"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
      
      <div v-else class="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 mb-6">
        <p class="text-gray-500 text-sm">No additional images added yet.</p>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p class="text-sm font-bold text-gray-700 mb-3">Add New Image</p>
        
        <div class="flex space-x-4 mb-3 border-b border-gray-200/50">
          <button 
            @click="galleryMode = 'url'"
            :class="galleryMode === 'url' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'"
            class="pb-1 text-xs font-medium uppercase tracking-wider"
          >
            By URL
          </button>
          <button 
            @click="galleryMode = 'file'"
            :class="galleryMode === 'file' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'"
            class="pb-1 text-xs font-medium uppercase tracking-wider"
          >
            By Upload
          </button>
        </div>

        <div v-if="galleryMode === 'url'" class="flex gap-2">
          <input 
            v-model="tempGalleryUrl"
            @keyup.enter="addGalleryUrl"
            type="text" 
            placeholder="Paste image URL and hit Enter" 
            class="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button 
            @click="addGalleryUrl"
            :disabled="!tempGalleryUrl"
            class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            Add
          </button>
        </div>

        <div v-if="galleryMode === 'file'" class="relative">
           <input 
              type="file" 
              accept="image/*"
              @change="(e) => handleFileUpload(e, 'gallery')"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
             <div v-if="uploading.gallery" class="mt-2">
                <span class="text-xs text-indigo-600 font-medium animate-pulse">Uploading to server...</span>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import apiClient from '@/services/apiClient';

// Props: expecting the parent to pass the full formData object
const props = defineProps<{
  formData: any
}>();

// Local State
const mainMode = ref<'url' | 'file'>('url');
const galleryMode = ref<'url' | 'file'>('url');
const tempGalleryUrl = ref('');
const uploading = reactive({
  main: false,
  gallery: false
});

// Method: Add Gallery URL (Manual text input)
const addGalleryUrl = () => {
  if (tempGalleryUrl.value.trim()) {
    props.formData.images.push(tempGalleryUrl.value.trim());
    tempGalleryUrl.value = ''; // Clear input
  }
};

// Method: Remove Gallery Image
const removeGalleryImage = (index: number) => {
  props.formData.images.splice(index, 1);
};

// Method: Handle File Upload
const handleFileUpload = async (event: Event, target: 'main' | 'gallery') => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const formDataPayload = new FormData();
  formDataPayload.append('file', file);

  // Set loading state
  if (target === 'main') uploading.main = true;
  else uploading.gallery = true;

  try {
    // 🚀 Call the Backend API
    const response = await apiClient.post('/upload', formDataPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // ✅ Success: Use the returned URL
    const uploadedUrl = response.data.url;

    if (target === 'main') {
      props.formData.imageUrl = uploadedUrl;
    } else {
      props.formData.images.push(uploadedUrl);
    }

  } catch (error) {
    console.error('Upload failed', error);
    alert('Failed to upload image. Please check the console.');
  } finally {
    // Reset loading state
    if (target === 'main') uploading.main = false;
    else uploading.gallery = false;
    
    // Clear the input so selecting the same file again triggers change
    input.value = ''; 
  }
};
</script>