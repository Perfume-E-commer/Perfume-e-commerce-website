<script setup lang="ts">
defineProps<{
  image: string
  title: string
  text: string
}>()
</script>
<template>
  <div
    class="w-full max-w-8xl mx-auto md:h-[90vh] xl:h-screen flex flex-col-reverse md:flex-row items-center xl:justify-between px-5 pb-20 pt-30 md:pt-20 md:px-10 lg:px-20"
  >
    <div class="flex flex-col gap-5 lg:gap-20 xl:gap-30 mt-10 md:mt-0">
      <div class="flex flex-col space-y-2 md:space-y-10 max-w-3xl xl:max-w-5xl">
        <h1
          class="luxurious-roman-regular font-medium text-3xl lg:text-4xl xl:text-7xl leading-tight"
        >
          {{ title }}
        </h1>

        <p
          class="luxurious-roman-regular font-extralight text-base lg:text-xl xl:text-2xl leading-tight"
        >
          {{ text }}
        </p>
      </div>
      <router-link
        to="/productlist"
        class="w-fit px-10 py-2 xl:px-15 xl:py-4 rounded-lg text-base xl:text-lg luxurious-roman-regular text-white bg-[#280559]"
      >
        Shop Now
      </router-link>
    </div>
    <img
      :src="image"
      alt="Main Hero Image"
      class="w-full h-[500px] md:w-[400px] md:h-[600px] xl:w-[650px] xl:h-[770px] object-contain"
    />
  </div>
</template>
