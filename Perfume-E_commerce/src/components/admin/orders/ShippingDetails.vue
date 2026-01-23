<template>
  <div>
    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
      Shipping Details
    </h3>
    <div
      class="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm flex items-start gap-4"
    >
      <div class="p-2 bg-white rounded-lg shadow-sm text-gray-400">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <div v-if="address">
        <p class="font-bold text-gray-900">{{ address.fullName }}</p>
        <p class="text-gray-600 mt-1">
          {{ address.addressLine1 }}<br />
          <span v-if="address.addressLine2">{{ address.addressLine2 }}<br /></span>
          {{ address.city }}, {{ address.postalCode }}<br />
          {{ address.country }}
        </p>
        <p class="text-gray-600 mt-1">
          {{ address.street || address.addressLine1 }}<br />
          {{ address.city }}, {{ address.zipCode || address.postalCode }}<br />
          {{ address.country || '' }}
        </p>
        <p class="text-gray-500 mt-2 text-xs flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            ></path>
          </svg>
          {{ address.phoneNumber || 'No phone provided' }}
        </p>
        <p v-if="email" class="text-gray-500 mt-1 text-xs flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          {{ email }}
        </p>
      </div>
      <div v-else class="text-gray-500 italic">No shipping address provided.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  address?: any
  email?: string
}>()
</script>