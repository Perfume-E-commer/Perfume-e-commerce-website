<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToastStore } from '@/stores/toastStore'
import type { Toast } from '@/stores/toastStore'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-vue-next'

const props = defineProps<{
  toast: Toast
}>()

const toastStore = useToastStore()
const isVisible = ref(true)

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
  info: Info,
}

const bgColorMap = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200',
}

const textColorMap = {
  success: 'text-green-800',
  error: 'text-red-800',
  warning: 'text-yellow-800',
  info: 'text-blue-800',
}

const iconColorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
}

const closeToast = () => {
  isVisible.value = false
  setTimeout(() => {
    toastStore.removeToast(props.toast.id)
  }, 300)
}
</script>

<template>
  <div
    v-show="isVisible"
    :class="[
      'flex items-center gap-3 px-4 py-3 rounded-lg border pointer-events-auto shadow-lg min-w-[300px] max-w-[400px] transform transition-all duration-300',
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      bgColorMap[toast.type],
    ]"
  >
    <component
      :is="iconMap[toast.type]"
      :class="['w-5 h-5 flex-shrink-0', iconColorMap[toast.type]]"
    />
    <span :class="['text-sm font-medium flex-1', textColorMap[toast.type]]">{{
      toast.message
    }}</span>
    <button
      @click="closeToast"
      :class="['ml-auto p-1 hover:opacity-70 flex-shrink-0', textColorMap[toast.type]]"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</template>
