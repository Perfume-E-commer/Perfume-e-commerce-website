<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
    <ul class="flex flex-col text-gray-600">
      
      <li>
        <router-link 
          to="/account/profile" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          My Profile
        </router-link>
      </li>

      <li>
        <router-link 
          to="/account/orders" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          My Orders
        </router-link>
      </li>

      <li>
        <router-link 
          to="/account/returns" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          My Returns
        </router-link>
      </li>

      <li>
        <router-link 
          to="/account/wishlist" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          My Wish list
        </router-link>
      </li>

      <li>
        <router-link 
          to="/account/history" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          Order History
        </router-link>
      </li>

      <li class="border-t border-gray-100 mt-2">
        <button 
          @click="handleSignOut" 
          class="w-full text-left px-6 py-4 hover:bg-red-50 text-red-500 transition font-medium flex items-center gap-3"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Sign Out
        </button>
      </li>

    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/authStore'; 

const router = useRouter();
const authStore = useAuthStore();

const handleSignOut = () => {
  if(confirm("Are you sure you want to sign out?")) {
    authStore.logout();
    router.push('/login');
  }
};
</script>