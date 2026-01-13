<template>
  <div class="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col items-center text-center h-fit sticky top-28 transition-all duration-300 hover:shadow-xl">
    
    <h2 class="text-xl font-serif font-bold text-[#280559] self-start mb-6">
      Profile
    </h2>

    <div class="relative w-32 h-32 mb-5 group">
      <div class="w-full h-full rounded-full p-1 border-2 border-dashed border-gray-300 group-hover:border-[#280559] transition-colors duration-300 cursor-pointer">
        <img 
          :src="imageUrl || 'https://via.placeholder.com/150'" 
          alt="User Avatar" 
          class="w-full h-full rounded-full object-cover"
        >
      </div>
      
      <button 
        @click="$emit('trigger-upload')"
        class="absolute inset-0 flex items-center justify-center bg-[#280559]/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    </div>

    <h3 class="text-2xl font-bold text-gray-900 mb-1">
      {{ firstName }} {{ lastName }}
    </h3>
    <a 
      :href="`mailto:${email}`" 
      class="text-gray-500 text-sm mb-8 font-medium bg-gray-50 px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
    >
      {{ email }}
    </a>

    <div class="w-full space-y-4">
      <button 
        @click="$emit('change-password')"
        class="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#280559] shadow-md shadow-indigo-100 hover:bg-[#1e0342] hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Change Password
      </button>
      
      <button 
        @click="$emit('logout')"
        class="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-red-500 border border-red-100 bg-white hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sign Out
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string;
}>();

defineEmits(['change-password', 'logout', 'trigger-upload']);
</script>