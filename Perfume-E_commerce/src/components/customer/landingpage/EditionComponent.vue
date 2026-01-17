<template>
  <div class="w-full mx-auto md:mt-10 mb-10 md:mb-20 relative overflow-hidden group">
    <div
      class="flex transition-transform duration-700 ease-in-out h-100 md:h-150 lg:h-190"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="w-full shrink-0 relative">
        <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />

        <div
          class="absolute inset-0 luxurious-roman-regular flex items-center p-6 md:px-20 lg:px-32"
        >
          <div
            class="w-full md:w-1/2 flex flex-col justify-center gap-5"
            :class="
              slide.position === 'right'
                ? 'ml-auto items-end text-right'
                : 'mr-auto items-start text-left'
            "
          >
            <p class="text-gray-500 text-sm md:text-lg mb-2 tracking-wide font-medium">
              {{ slide.subtitle }}
            </p>

            <h2
              class="text-3xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-3"
              :class="index === 0 ? 'text-black' : 'text-[#002B5C]'"
            >
              {{ slide.title }}
            </h2>

            <p
              class="text-2xl md:text-4xl italic font-serif mb-6"
              :class="index === 0 ? 'text-black' : 'text-[#C59D5F]'"
            >
              {{ slide.price }}
            </p>

            <button
              type="button"
              @click="$router.push('/productlist')"
              class="bg-[#2E0249] text-white py-2 px-6 md:py-3 md:px-10 text-sm md:text-base tracking-widest hover:bg-purple-900 transition shadow-md"
            >
              SHOP NOW
            </button>

            <p class="mt-4 text-xs text-gray-400 uppercase tracking-widest">
              Limited Edition. Online Exclusive.
            </p>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 px-4 py-3 rounded-full transition shadow-sm"
    >
      ‹
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 px-4 py-3 rounded-full transition shadow-sm"
    >
      ›
    </button>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <span
        v-for="(_, index) in slides"
        :key="index"
        @click="currentIndex = index"
        class="w-6 h-3 rounded-full cursor-pointer transition-colors border border-black"
        :class="currentIndex === index ? 'bg-[#2E0249]' : 'bg-white'"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const slides = ref([
  {
    // Seoul Edition (Keep original style)
    image: '/Image/HomePage/Purple and Gold Elegant Seoul Edition Facebook Ad 1.png',
    title: 'Seoul Edition',
    subtitle: 'Give your special woman the gift of luxury',
    price: '1200 USD only for a limited drop',
    position: 'left',
  },
  {
    // Ocean Breeze -> DESIGN SHOWS RIGHT
    image: '/Image/HomePage/1.png',
    title: 'OCEAN BREEZE COLLECTION',
    subtitle: 'Capture the essence of the sea.',
    price: 'Price: $85.00',
    position: 'right',
  },
  {
    // Rose Elixir -> DESIGN SHOWS LEFT
    image: '/Image/HomePage/2.png',
    title: 'ROSE ELIXIR COLLECTION',
    subtitle: 'A timeless scent of blooming romance.',
    price: 'Price: $95.00',
    position: 'right',
  },
  {
    // Midnight Orchid -> DESIGN SHOWS RIGHT
    image: '/Image/HomePage/3.png',
    title: 'MIDNIGHT ORCHID ESSENCE',
    subtitle: 'Unleash your inner elegance.',
    price: 'Price: $98.00',
    position: 'left',
  },
])

const currentIndex = ref(0)
let interval: number

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
}

onMounted(() => {
  interval = window.setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
