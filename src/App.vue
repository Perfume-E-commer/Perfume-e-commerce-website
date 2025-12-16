<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Loading from './components/layout/Loading.vue'
import { ref } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'

const isLoading = ref(true)
const router = useRouter()

router.beforeEach((to, from, next) => {
  isLoading.value = true
  next()
})
router.afterEach(() => {
  isLoading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans">
    
    <Navbar />

    <main>
      <Loading v-if="isLoading" />

      <router-view v-else v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>