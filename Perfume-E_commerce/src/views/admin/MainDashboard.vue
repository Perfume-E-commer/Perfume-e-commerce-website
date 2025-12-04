<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />

    <div class="flex-1 p-6 sm:ml-64 mt-14">
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '../layout/Sidebar.vue'
</script>
