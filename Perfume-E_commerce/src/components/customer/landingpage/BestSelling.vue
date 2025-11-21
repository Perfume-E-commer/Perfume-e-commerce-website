<script setup lang="ts">
interface BestSellingItem {
  title: string
  price: number
  image: string
}

defineProps<{
  bestSelling: BestSellingItem[]
}>()
</script>

<template>
  <div class="container flex flex-col items-center mx-auto px-4 py-8">
    <h1
      class="text-center luxurious-roman-regular font-bold text-[#280559] text-3xl md:text-4xl lg:text-5xl"
    >
      Best Selling Products
    </h1>

    <!-- Mobile horizontal scroll -->
    <div class="w-full overflow-x-auto whitespace-nowrap md:hidden py-4">
      <div class="flex gap-6 px-2">
        <div
          v-for="(item, index) in bestSelling"
          :key="index"
          class="w-[296px] shrink-0 flex flex-col justify-center items-center p-4"
        >
          <img :src="item.image" :alt="item.title" class="w-full h-[400px] object-contain" />
          <div class="flex flex-col items-center gap-1 mt-4">
            <h2 class="luxurious-roman-regular text-xl text-[#280559]">{{ item.title }}</h2>
            <p class="luxurious-roman-regular text-lg text-[#280559]">${{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop grid layout -->
    <div
      class="hidden md:grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 mb-15 w-full max-w-8xl"
    >
      <div
        v-for="(item, index) in bestSelling"
        :key="index"
        class="flex flex-col justify-center items-center p-4 hover:border-2 hover:border-[#280559]"
      >
        <img :src="item.image" :alt="item.title" class="w-full h-[400px] object-contain" />
        <div class="flex flex-col items-center gap-1 mt-4">
          <h2 class="luxurious-roman-regular text-xl text-[#280559]">{{ item.title }}</h2>
          <p class="luxurious-roman-regular text-lg text-[#280559]">${{ item.price }}</p>
        </div>
      </div>
    </div>

    <button
      class="w-fit px-10 py-2 rounded-lg text-base xl:text-lg mb-10 luxurious-roman-regular text-white bg-[#280559]"
    >
      View More
    </button>
  </div>
</template>
