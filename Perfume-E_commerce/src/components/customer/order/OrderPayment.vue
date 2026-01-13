<template>
  <div class="mt-6 mb-6">
    <p class="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">Payment Information</p>
    
    <div class="flex items-center gap-2 text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200 shadow-sm w-fit">
      
      <svg v-if="isOnline" class="w-6 h-6 text-indigo-900" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4v10h16V8H4z"></path>
      </svg>
      
      <svg v-else class="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>

      <span class="font-medium">{{ isOnline ? 'Online Payment' : 'Cash on Delivery' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  method: string; // e.g., "CREDIT_CARD", "PAYPAL", "CASH"
}>();

const isOnline = computed(() => {
  return ['CREDIT_CARD', 'PAYPAL', 'ONLINE'].includes(props.method?.toUpperCase());
});
</script>