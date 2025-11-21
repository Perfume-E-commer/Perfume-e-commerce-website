<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  image: string
  title: string
  text: string
}>()
</script>
<template>
  <div class="w-full max-w-7xl h-[90vh] flex flex-row items-center justify-center">
    <div class="flex flex-col gap-30">
      <div class="flex flex-col space-y-10">
        <h1 class="luxurious-roman-regular font-medium text-6xl leading-tight">{{ title }}</h1>
        <p class="luxurious-roman-regular font-extralight text-2xl leading-tight w-2xl">
          {{ text }}
        </p>
      </div>
      <router-link
        to=""
        class="w-fit px-10 py-2 mt-5 rounded-lg luxurious-roman-regular text-white bg-[#280559]"
        >Shop Now</router-link
      >
    </div>
    <img :src="image" alt="Main Hero Image" class="w-[430px] h-[579px] object-contain" />
  </div>
</template>
