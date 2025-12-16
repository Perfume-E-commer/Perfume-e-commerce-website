<template>
  <router-link
    :to="detailLink"
    type="button"
    class="inline-flex items-center px-4 py-2 border-2 border-indigo-600 rounded-2xl text-sm font-medium text-indigo-600 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >Details</router-link
  >
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonDetail',
  props: {
    detailLink: {
      type: String,
      required: true,
    },
  },
})
</script>
