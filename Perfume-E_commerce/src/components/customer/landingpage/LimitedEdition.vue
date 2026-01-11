<script setup lang="ts">
interface BannerItem {
  title: string
  subtitle: string
  image: string
  buttonText?: string
}

defineProps<{
  banners: BannerItem[]
}>()
</script>

<template>
  <section class="container mx-auto px-4 py-14">
    <h2
      class="luxurious-roman-regular text-center font-bold text-[#280559] text-3xl md:text-4xl lg:text-5xl mb-10"
    >
      Limited Edition
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-8xl mx-auto">
      <div
        v-for="(banner, index) in banners"
        :key="index"
        class="relative h-80 rounded-2xl overflow-hidden group"
      >
        <img
          :src="banner.image"
          :alt="banner.title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div
          class="relative z-10 h-full flex flex-col justify-end p-6 bg-linear-to-t from-black/60 via-black/30 to-transparent"
        >
          <span class="luxurious-roman-regular text-xs tracking-widest text-white mb-2">
            LIMITED
          </span>

          <h3 class="luxurious-roman-regular text-2xl font-bold text-white mb-2">
            {{ banner.title }}
          </h3>

          <p class="text-sm text-white/90 mb-4">
            {{ banner.subtitle }}
          </p>

          <button
            class="w-fit px-5 py-2 rounded-lg text-sm luxurious-roman-regular bg-[#280559] text-white hover:bg-white hover:text-[#280559] transition-all duration-300"
          >
            {{ banner.buttonText || 'Shop Now' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
