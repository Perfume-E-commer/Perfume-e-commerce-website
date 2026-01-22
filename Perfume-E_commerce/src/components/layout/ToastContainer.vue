<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore'
import Toast from './Toast.vue'

const toastStore = useToastStore()
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
      <Toast v-for="toast in toastStore.toasts" :key="toast.id" :toast="toast" />
    </div>
  </Teleport>
</template>
