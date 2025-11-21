<script setup lang="ts">
import { ChevronUp } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const showButton = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const handleScroll = () => {
    showButton.value = window.scrollY > 300
  }
  window.addEventListener('scroll', handleScroll)
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>
<template>
  <button
    @click="scrollToTop"
    class="fixed bottom-10 right-5 z-50 p-3 rounded-full bg-[#280559] text-white shadow-lg transition-opacity duration-300"
    :class="{ 'opacity-100': showButton, 'opacity-0 pointer-events-none': !showButton }"
  >
    <ChevronUp />
  </button>
</template>
