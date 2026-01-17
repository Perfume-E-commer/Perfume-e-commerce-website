<template>
  <div class="fixed top-0 left-0 w-full h-2 z-9999">
    <div
      class="h-full bg-[#2E0249] transition-all duration-150"
      :style="{ width: scrollProgress + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

const updateScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = Math.min(100, Math.round((scrollTop / docHeight) * 100))
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>
