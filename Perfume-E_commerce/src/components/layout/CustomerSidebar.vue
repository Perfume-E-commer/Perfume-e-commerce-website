<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <ul class="flex flex-col text-gray-600">
      
      <li>
        <router-link 
          to="/profile" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          My Profile
        </router-link>
      </li>

      <li>
        <router-link 
          to="/orders" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          My Orders
        </router-link>
      </li>

      <li>
        <router-link 
          to="/returns" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          My Returns
        </router-link>
      </li>

      <li>
        <router-link 
          to="/wishlist" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          My Wish list
        </router-link>
      </li>

      <li>
        <router-link 
          to="/order-history" 
          class="block px-6 py-4 hover:bg-gray-50 transition"
          active-class="font-bold text-[#280559] border-l-4 border-[#280559] bg-purple-50"
        >
          Order History
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script setup lang="ts">
</script>