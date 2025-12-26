<script setup lang="ts">
defineProps<{
  image: string
  title: string
  text: string
}>()
</script>

<template>
  <div class="relative mx-auto">
    <!-- Background Image -->
    <div class="fixed mx-auto inset-0 w-screen h-screen md:h-[90vh]">
      <img :src="image" alt="Overlay Perfume" class="w-full h-full object-cover" />
    </div>

    <!-- Content -->
    <div class="relative flex flex-col justify-center items-end h-[90vh] mr-5 lg:mr-25 gap-5">
      <h1
        class="luxurious-roman-regular font-medium text-white dark:text-white text-3xl sm:text-4xl lg:text-6xl leading-tight text-center mr-8 lg:mr-26"
      >
        {{ title }}
      </h1>

      <p
        class="luxurious-roman-regular font-extralight text-white dark:text-white text-base sm:text-lg lg:text-xl leading-relaxed max-w-sm sm:max-w-md lg:max-w-4xl text-center"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>
