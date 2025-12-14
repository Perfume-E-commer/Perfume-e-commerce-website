<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <ProfileCard />
      </div>

      <div class="lg:col-span-2">
        <ProfileUpdateForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfileCard from '@/views/components/ProfileCard.vue'
import ProfileUpdateForm from '@/views/components/ProfileUpdateForm.vue'
</script>
