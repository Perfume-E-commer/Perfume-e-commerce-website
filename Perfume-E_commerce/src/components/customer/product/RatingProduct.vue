<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import ButtonReview from './ButtonReview.vue'

interface Review {
  avatar: string
  name: string
  review: string
  date: string
}
defineProps<{
  reviewer: Review[]
}>()
</script>
<template>
  <div class="container max-8xl mx-auto mb-20">
    <h1
      class="text-center luxurious-roman-regular font-bold text-[#280559] text-3xl md:text-4xl lg:text-5xl"
    >
      Reviews
    </h1>

    <div class="container w-full max-w-3xl mx-auto mt-10">
      <div class="w-full flex flex-col md:flex-row justify-between items-center md:items-start">
        <div class="flex flex-col luxurious-roman-regular">
          <div class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">5 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div class="h-4 bg-[#280559] rounded-base" style="width: 100%"></div>
            </div>
            <span class="text-sm font-medium text-body">100%</span>
          </div>
          <div class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">4 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div class="h-4 bg-[#280559] rounded-base" style="width: 70%"></div>
            </div>
            <span class="text-sm font-medium text-body">80%</span>
          </div>
          <div class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">3 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div class="h-4 bg-[#280559] rounded-base" style="width: 50%"></div>
            </div>
            <span class="text-sm font-medium text-body">50%</span>
          </div>
          <div class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">2 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div class="h-4 bg-[#280559] rounded-base" style="width: 30%"></div>
            </div>
            <span class="text-sm font-medium text-body">30%</span>
          </div>
          <div class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">1 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div class="h-4 bg-[#280559] rounded-base" style="width: 10%"></div>
            </div>
            <span class="text-sm font-medium text-body">10%</span>
          </div>
        </div>
        <div class="flex flex-col gap-5 mt-10 md:mt-0">
          <div class="flex flex-col luxurious-roman-regular">
            <div class="flex text-[#280559] text-2xl">★★★★★</div>
            <p class="text-xl">5 out of 5</p>
          </div>
          <div class="flex flex-col luxurious-roman-regular">
            <p class="text-base">99% of reviewers recommend this product</p>
            <div class="flex gap-10 mt-2">
              <p>90 reviews</p>
              <button class="flex items-center hover:border px-5 py-1 rounded-lg gap-2">
                <Plus class="w-5 h-5" /> Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container w-full mx-auto mt-16 flex flex-col gap-10 px-5">
      <div v-for="(item, index) in reviewer" :key="index" class="flex gap-4 md:gap-6 items-start">
        <div class="shrink-0">
          <img
            :src="item.avatar"
            :alt="item.name"
            class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover bg-purple-100"
          />
        </div>

        <div class="flex flex-col luxurious-roman-regular">
          <div class="flex text-[#280559] text-xl mb-2">★★★★★</div>

          <p class="text-gray-800 italic leading-relaxed mb-3">
            {{ item.review }}
          </p>

          <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-10 mt-1">
            <span class="font-bold text-gray-900">{{ item.name }}</span>
            <span class="text-gray-500 text-sm">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <ButtonReview />
    </div>
  </div>
</template>
