<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Loading from '@/components/layout/Loading.vue'
import { ref } from 'vue'

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
  <Loading v-if="isLoading" />
  <router-view else v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>
