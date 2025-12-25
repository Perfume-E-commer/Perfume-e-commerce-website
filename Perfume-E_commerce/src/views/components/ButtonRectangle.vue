<template>
  <div class="transform-all duration-500 ease-in-out z-2">
    <div
      class="flex items-center justify-center gap-2 hover:shadow-md rounded-lg border border-gray-300 cursor-pointer"
      :style="{ color: textColor, backgroundColor: btncolor, padding: '10px 20px' }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'ButtonRectangle',
  props: {
    textColor: {
      type: String,
      default: '#FFFFFF',
    },
    btncolor: {
      type: String,
      default: '#3E2C67',
    },
  },
})
</script>
