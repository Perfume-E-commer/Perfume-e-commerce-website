<script setup lang="ts">
import { type Product } from '@/stores/productStore'
defineProps<{
  detailsItem: Product[]
}>()
</script>

<template>
  <div class="container max-w-8xl flex flex-col items-center mx-auto">
    <div class="w-full overflow-x-auto whitespace-nowrap md:hidden py-4">
      <div class="flex gap-6 px-2">
        <div
          v-for="(item, index) in detailsItem"
          :key="index"
          @click="
            $router.push({
              name: 'ProductDetail',
              params: { id: item.title },
              query: {
                descriptions: item.description,
                image: item.image,
                price: item.price,
                variants: JSON.stringify(item.variants || []),
                story: JSON.stringify(item.productStory || {}),
              },
            })
          "
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

    <div
      class="hidden md:grid grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 mb-15 w-full max-w-8xl"
    >
      <div
        v-for="(item, index) in detailsItem"
        :key="index"
        @click="
          $router.push({
            name: 'ProductDetail',
            params: { id: item.title },
            query: {
              descriptions: item.description,
              image: item.image,
              price: item.price,
              variants: JSON.stringify(item.variants || []),
              story: JSON.stringify(item.productStory || {}),
            },
          })
        "
        class="flex flex-col justify-center items-center p-4 hover:border-2 hover:border-[#280559] cursor-pointer"
      >
        <img :src="item.image" :alt="item.title" class="w-full h-[300px] object-contain" />
        <div class="flex flex-col items-center gap-2 mt-4">
          <h2 class="luxurious-roman-regular text-xl text-[#280559]">{{ item.title }}</h2>
          <p class="luxurious-roman-regular text-lg text-[#280559]">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
