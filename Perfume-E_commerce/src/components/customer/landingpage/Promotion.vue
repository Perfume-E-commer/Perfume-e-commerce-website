<script setup lang="ts">
defineProps<{
  title: string
  description: string
  imageUrl: string
}>()
</script>
<template>
  <div class="container mx-auto px-4 py-8 mt-15 mb-10">
    <div class="relative w-full flex flex-col md:flex-row justify-between items-center gap-10">
      <!-- Text Content -->
      <div class="w-full flex flex-col gap-10 z-10">
        <div class="flex flex-col gap-2">
          <h1
            class="luxurious-roman-regular text-black dark:text-black text-2xl md:text-3xl xl:text-5xl font-medium max-w-sm xl:max-w-xl"
          >
            {{ title }}
          </h1>
          <p class="luxurious-roman-regular text-black dark:text-black font-extralight max-w-sm">
            {{ description }}
          </p>
        </div>
        <button
          class="w-fit luxurious-roman-regular font-medium text-white dark:text-white bg-[#280559] px-10 py-3 rounded-[14px]"
        >
          Shop Now
        </button>
      </div>

      <div class="w-full relative">
        <!-- shape right side -->
        <div
          class="absolute top-0 right-0 w-30 h-40 xl:w-48 xl:h-60 bg-[#280559] rounded-4xl"
        ></div>
        <div
          class="relative top-2 right-0 left-0 transform translate-x-10 xl:translate-x-1/5 xl:top-2 xl:-right-20"
        >
          <img :src="imageUrl" alt="Promotion Image" class="w-3/4 h-full xl:w-3/4" />
        </div>
        <!-- shape left side -->
        <div
          class="absolute bottom-2 xl:right-3/4 transform xl:translate-x-1/3 w-30 h-40 xl:w-48 xl:h-60 bg-[#280559] rounded-4xl"
        ></div>
      </div>

      <div class="hidden md:block">
        <!-- Sparkle 1-->
        <div class="absolute md:-top-20 left-1/3 xl:top-0 xl:left-1/3 z-20">
          <svg
            class="w-20 h-20 xl:w-30 xl:h-30 text-[#280559]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C10 6 6 10 2 12C6 14 10 18 12 22C14 18 18 14 22 12C18 10 14 6 12 2Z" />
          </svg>
        </div>

        <!-- Sparkle 2 -->
        <div class="absolute md:-top-10 left-10 xl:top-15 xl:left-20 z-20">
          <svg
            class="w-8 h-8 xl:w-10 xl:h-10 text-[#280559]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C10 6 6 10 2 12C6 14 10 18 12 22C14 18 18 14 22 12C18 10 14 6 12 2Z" />
          </svg>
        </div>

        <!-- Sparkle 3 -->
        <div class="absolute md:bottom-1/4 md:left-1/3 xl:bottom-1/4 xl:left-1/3 z-20">
          <svg
            class="w-10 h-10 xl:w-15 xl:h-15 text-[#280559]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C10 6 6 10 2 12C6 14 10 18 12 22C14 18 18 14 22 12C18 10 14 6 12 2Z" />
          </svg>
        </div>

        <!-- Bottom Left Sparkle -->
        <div class="absolute md:bottom-10 md:left-40 xl:bottom-4 xl:left-1/6 z-20">
          <svg
            class="w-10 h-10 xl:w-20 xl:h-20 text-[#280559]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C10 6 6 10 2 12C6 14 10 18 12 22C14 18 18 14 22 12C18 10 14 6 12 2Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
