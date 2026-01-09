<template>
  <div class="space-y-8">
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Main Product Image</h3>
      
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/3">
          <div class="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden relative group">
            <img 
              v-if="modelValue.imageUrl" 
              :src="modelValue.imageUrl" 
              class="w-full h-full object-cover" 
              alt="Main preview" 
            />
            <div v-else class="text-center p-4">
              <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="mt-2 text-sm text-gray-400">No image selected</p>
            </div>
          </div>
        </div>

        <div class="w-full md:w-2/3 space-y-4">
          <div class="flex gap-4 border-b border-gray-100 pb-2">
            <button 
              type="button"
              @click="inputType = 'url'"
              :class="['text-sm font-medium pb-2 px-2 transition-colors', inputType === 'url' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700']"
            >
              Image URL
            </button>
            <button 
              type="button"
              @click="inputType = 'upload'"
              :class="['text-sm font-medium pb-2 px-2 transition-colors', inputType === 'upload' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700']"
            >
              Upload File
            </button>
          </div>

          <div v-if="inputType === 'url'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Paste Image Link</label>
            <input 
              :value="modelValue.imageUrl"
              @input="$emit('update:modelValue', { ...modelValue, imageUrl: ($event.target as HTMLInputElement).value })"
              type="text" 
              placeholder="https://example.com/image.jpg"
              class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div v-else>
            <label class="block text-sm font-medium text-gray-700 mb-1">Select File</label>
            <div class="flex gap-2">
              <input 
                type="file" 
                accept="image/*"
                @change="handleFileUpload($event, 'main')"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
              />
              <span v-if="isUploading" class="text-xs text-indigo-600 flex items-center">
                <svg class="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Uploading...
              </span>
            </div>
            <p class="text-xs text-gray-500 mt-2">Supported: JPG, PNG, WEBP, GIF</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Gallery Images</h3>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div v-for="(img, index) in modelValue.images" :key="index" class="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
          <img :src="img" class="w-full h-full object-cover" />
          <button 
            @click="removeGalleryImage(index)"
            class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 class="text-sm font-medium text-gray-700 mb-3">Add to Gallery</h4>
        
        <div class="flex flex-col sm:flex-row gap-4 items-start">
          <div class="flex-1 w-full">
            <div class="flex gap-4 mb-2">
              <label class="text-xs font-medium text-gray-600 flex items-center cursor-pointer">
                <input type="radio" v-model="galleryInputType" value="url" class="mr-1"> URL
              </label>
              <label class="text-xs font-medium text-gray-600 flex items-center cursor-pointer">
                <input type="radio" v-model="galleryInputType" value="upload" class="mr-1"> Upload
              </label>
            </div>

            <input 
              v-if="galleryInputType === 'url'"
              v-model="newGalleryUrl"
              @keyup.enter="addGalleryImage"
              type="text" 
              placeholder="Paste image URL and press Enter"
              class="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            
            <input 
              v-else
              type="file" 
              accept="image/*"
              @change="handleFileUpload($event, 'gallery')"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
            />
          </div>

          <button 
            v-if="galleryInputType === 'url'"
            @click="addGalleryImage"
            type="button"
            class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import adminService from '@/services/adminService';

const props = defineProps<{
  modelValue: {
    imageUrl: string;
    images: string[];
  }
}>();

const emit = defineEmits(['update:modelValue']);

// Local State
const inputType = ref<'url' | 'upload'>('url');
const galleryInputType = ref<'url' | 'upload'>('url');
const newGalleryUrl = ref('');
const isUploading = ref(false);

// Handle File Uploads
const handleFileUpload = async (event: Event, target: 'main' | 'gallery') => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  isUploading.value = true;
  try {
    const res = await adminService.uploadImage(file);
    const uploadedUrl = res.data.url;

    if (target === 'main') {
      emit('update:modelValue', { ...props.modelValue, imageUrl: uploadedUrl });
    } else {
      emit('update:modelValue', { 
        ...props.modelValue, 
        images: [...props.modelValue.images, uploadedUrl] 
      });
      // Reset input if needed or show success
    }
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Image upload failed. Please try again.');
  } finally {
    isUploading.value = false;
  }
};

// Gallery Logic
const addGalleryImage = () => {
  if (!newGalleryUrl.value.trim()) return;
  emit('update:modelValue', { 
    ...props.modelValue, 
    images: [...props.modelValue.images, newGalleryUrl.value] 
  });
  newGalleryUrl.value = '';
};

const removeGalleryImage = (index: number) => {
  const newImages = [...props.modelValue.images];
  newImages.splice(index, 1);
  emit('update:modelValue', { ...props.modelValue, images: newImages });
};
</script>