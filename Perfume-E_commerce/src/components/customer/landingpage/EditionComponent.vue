<template>
  <div class="w-full mx-auto md:mt-10 mb-10 md:mb-20 relative overflow-hidden">
    <img
      src="/Image/HomePage/Purple and Gold Elegant Seoul Edition Facebook Ad 1.png"
      alt="Seoul Edition Advertisement"
      class="w-full h-auto object-contain"
    />

    <div class="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 md:pl-20 lg:pl-32 w-full">
      <p class="text-black dark:text-black text-sm md:text-xl luxurious-roman-regular mb-1 md:mb-4">
        Give your special woman the gift of luxury
      </p>

      <h2
        class="text-black dark:text-black text-2xl md:text-7xl lg:text-9xl luxurious-roman-regular mb-2 md:mb-6 leading-none"
      >
        Seoul Edition
      </h2>

      <p
        class="text-black dark:text-black text-base md:text-2xl luxurious-roman-regular mb-4 md:mb-8"
      >
        1200 USD only for a limited drop
      </p>

      <button
        type="button"
        @click="$router.push('/productlist')"
        class="bg-[#2E0249] text-white dark:text-white py-1.5 px-5 md:py-3 md:px-8 text-sm md:text-base luxurious-roman-regular hover:bg-purple-900 transition"
      >
        Shop Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for this component.
</script>
