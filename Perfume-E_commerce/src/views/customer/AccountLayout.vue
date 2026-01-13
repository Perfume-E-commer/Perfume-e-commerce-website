<template>
  <div class="min-h-screen bg-[#F9F9F9]">
    <div class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex text-sm text-gray-500">
          <router-link to="/" class="hover:text-[#280559] transition">Home</router-link>
          <span class="mx-2">/</span>
          <span class="text-gray-900 font-medium">My Account</span>
          <span class="mx-2">/</span>
          <span class="text-[#280559] font-bold capitalize">{{ currentRouteName }}</span>
        </nav>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <h1 class="text-3xl font-serif font-bold text-[#280559]">My Account</h1>
        <p class="text-gray-500 mt-2">Manage your orders and personal details</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <div class="lg:col-span-1">
          <CustomerSidebar />
        </div>

        <div class="lg:col-span-3">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import CustomerSidebar from '../../components/layout/CustomerSidebar.vue';

const route = useRoute();

const currentRouteName = computed(() => {
  const name = route.name?.toString() || '';
  return name.replace(/([A-Z])/g, ' $1').trim(); 
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>