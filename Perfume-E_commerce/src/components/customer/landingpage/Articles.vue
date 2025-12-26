<script setup lang="ts">
interface Article {
  image: string
  title: string
  description: string
}

defineProps<{
  articles: Article[]
}>()
</script>
<template>
  <div class="container mx-auto px-4 py-8 mt-10 mb-10">
    <h1
      class="text-center luxurious-roman-regular font-bold text-[#280559] text-2xl md:text-4xl lg:text-5xl mb-6"
    >
      Lasted Articles
    </h1>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="overflow-hidden flex flex-col gap-10 hover:border-2 hover:border-[#280559] p-5"
      >
        <img :src="article.image" :alt="article.title" class="w-full h-3/4 object-cover" />
        <div class="flex flex-col gap-1 mt-2">
          <h2 class="text-xl text-black dark:text-black luxurious-roman-regular font-semibold mb-2">
            {{ article.title }}
          </h2>
          <p class="text-gray-600 text-sm luxurious-roman-regular">
            {{ article.description }}
          </p>
        </div>
        <button
          class="luxurious-roman-regular bg-[#280559] text-white w-fit px-6 py-2 rounded-[14px] text-sm cursor-pointer"
        >
          Read More
        </button>
      </div>
    </div>
  </div>
</template>
