<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Offer {
  image: string
  title1: string
  title2: string
  promotion: string
  description: string
}

defineProps<{
  SpecialOffer: Offer[]
}>()

const router = useRouter()

const goToOfferDetail = (index: number) => {
  router.push({ name: 'specialOfferDetail', params: { id: index } })
}
</script>
<template>
  <div class="w-full mx-auto mt-10 mb-10 px-4 sm:px-6 lg:px-8">
    <h1
      class="luxurious-roman-regular font-bold text-3xl lg:text-4xl xl:text-5xl text-center text-[#280559] leading-tight"
    >
      Special Offers
    </h1>
    <div class="w-full mx-auto mt-15" v-for="(offer, index) in SpecialOffer" :key="index">
      <div
        :class="[
          'w-full flex items-center gap-10 lg:gap-20 mt-10',
          index === 1 ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row',
        ]"
      >
        <img
          :src="offer.image"
          :alt="offer.title1"
          class="w-full sm:max-w-md lg:max-w-xl object-contain"
        />
        <div class="w-full flex flex-col items-start gap-2 px-5 lg:px-10">
          <h1
            :class="[
              ' luxurious-roman-regular text-black font-extralight text-2xl lg:text-3xl  xl:text-5xl leading-tight',
              index === 1 ? ' lg:max-w-2xl' : 'lg:max-w-xl',
            ]"
          >
            {{ offer.promotion }}
          </h1>
          <div class="flex flex-col gap-2 mt-10 mb-10">
            <h1
              class="luxurious-roman-regular text-black font-bold text-2xl lg:text-3xl xl:text-5xl leading-tight"
            >
              {{ offer.title1 }}
            </h1>
            <h1
              :class="[
                'luxurious-roman-regular font-bold text-2xl lg:text-3xl xl:text-4xl leading-tight',
                index === 1 ? 'text-yellow-500' : 'text-blue-500',
              ]"
            >
              {{ offer.title2 }}
            </h1>
          </div>
          <p
            class="lg:w-3xl luxurious-roman-regular text-black font-extralight text-base lg:text-lg xl:text-xl leading-tight"
          >
            {{ offer.description }}
          </p>
          <button
            @click="goToOfferDetail(index)"
            class="w-fit border text-black luxurious-roman-regular px-6 py-2 rounded-xl mt-5 lg:mt-10"
          >
            Know More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
