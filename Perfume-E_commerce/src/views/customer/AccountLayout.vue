<template>
  <div class="min-h-screen bg-[#F9F9F9] flex flex-col">
    <Navbar />

    <div class="pt-24 lg:pt-32"></div>

    <div class="flex-grow max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      
      <div class="mb-8">
        <h1 class="text-3xl font-serif font-bold text-[#280559]">My Account</h1>
        <p class="text-gray-500 mt-2 font-light">Manage your orders and personal details</p>
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

    <Footer />
  </div>
</template>

<script setup lang="ts">
import CustomerSidebar from '../../components/layout/CustomerSidebar.vue'; 
import Footer from '../../components/layout/Footer.vue';
import Navbar from '../../components/layout/Navbar.vue';

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