<script setup lang="ts">
import { type Product } from '@/types/clientProduct'
defineProps<{
  detailsItem: Product[]
}>()
</script>

<template>
  <div class="w-full flex flex-col items-center mx-auto gap-20 p-4">
    <div
      class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-10 mb-15 xl:px-30"
    >
      <div
        v-for="(item, index) in detailsItem"
        :key="index"
        @click="
          $router.push({
            name: 'ProductDetail',
            params: { id: item.id ?? item.name },
          })
        "
        class="flex flex-col justify-start items-center p-2 md:p-4 hover:border-2 hover:border-[#280559] cursor-pointer h-full"
      >
        <img
          :src="item.image"
          :alt="item.name"
          class="w-full h-[180px] md:h-[300px] object-contain"
        />
        <div class="flex flex-col items-center gap-1 md:gap-2 mt-2 md:mt-4 text-center">
          <h2 class="luxurious-roman-regular text-sm md:text-xl text-[#280559] line-clamp-2">
            {{ item.name }}
          </h2>
          <p class="luxurious-roman-regular text-xs md:text-lg text-[#280559]">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
