<script setup lang="ts">
defineProps<{
  firstName: string
  lastName: string
  email: string
}>()
</script>

<template>
  <div class="mb-8">
    <h3 class="text-xl luxurious-roman-regular mb-4 text-gray-800">Contact Information</h3>
    <div class="bg-gray-50 p-6 rounded-xl border border-gray-200 grid gap-4">
      <div>
        <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          Customer Name
        </label>
        <div class="text-gray-900 font-medium luxurious-roman-regular">
          {{ firstName }} {{ lastName }}
        </div>
      </div>
      <div>
        <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
          Email Address
        </label>
        <div class="text-gray-900 font-medium luxurious-roman-regular">
          {{ email }}
        </div>
      </div>
    </div>
  </div>
</template>