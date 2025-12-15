<script setup lang="ts">
defineProps<{
  image: string
  title: string
  text1: string
  text2: string
}>()
</script>

<template>
  <div
    class="w-full max-w-8xl mx-auto flex flex-col-reverse md:flex-row items-start justify-center mt-20 mb-20 px-5 gap-5 lg:gap-10 xl:gap-40"
  >
    <!-- Image -->
    <img :src="image" alt="Main Hero Image" class="w-full sm:max-w-md lg:max-w-lg object-contain" />

    <div class="flex flex-col gap-6 max-w-xl">
      <h1
        class="luxurious-roman-regular font-bold text-3xl lg:text-4xl xl:text-5xl text-center md:text-left lg:text-center text-[#280559] leading-tight"
      >
        {{ title }}
      </h1>

      <p
        class="luxurious-roman-regular text-black dark:text-black font-extralight text-base lg:text-lg xl:text-xl lg:text-left"
      >
        {{ text1 }}
      </p>

      <p
        class="luxurious-roman-regular text-black dark:text-black font-extralight text-base lg:text-lg xl:text-xl lg:text-left"
      >
        {{ text2 }}
      </p>
    </div>
  </div>
</template>
