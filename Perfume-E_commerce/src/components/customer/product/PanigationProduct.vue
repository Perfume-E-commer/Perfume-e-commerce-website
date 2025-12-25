<script setup lang="ts">
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
</script>
<template>
  <div class="container max-8xl mx-auto p-4">
    <div class="flex justify-between items-center">
      <button class="">
        <ChevronLeft />
      </button>
      <p class="text-gray-500 luxurious-roman-regular">Page 1 of 4</p>
      <button class=""><ChevronRight /></button>
    </div>
  </div>
</template>
