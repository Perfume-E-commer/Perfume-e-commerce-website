<template>
  <div class="mt-4">
    <p class="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wider">Delivery Address</p>
    
    <div class="bg-gray-50 rounded-lg p-4 border border-gray-100 text-sm text-gray-700 leading-relaxed">
      <p class="font-bold text-gray-900 mb-1">{{ address.fullName }}</p>
      <p>#{{ address.houseNumber }}, {{ address.street }}</p>
      <p>{{ address.village }}, {{ address.community }}</p>
      <p>{{ address.district }}, {{ address.city }}</p>
      <p class="mt-2 text-xs text-gray-500">Tel: {{ address.phoneNumber }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  address: {
    fullName: string;
    houseNumber: string;
    street: string;
    village: string;
    community: string;
    district: string;
    city: string;
    phoneNumber: string;
  }
}>();
</script>