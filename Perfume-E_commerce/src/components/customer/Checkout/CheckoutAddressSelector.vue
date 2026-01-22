<script setup lang="ts">
import type { Address } from '@/services/userService'

const props = defineProps<{
  modelValue: Address | null
  addresses: Address[]
  loading: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const onSelectChange = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const selected = props.addresses.find((a) => (a._id || a.id) === select.value)

  emit('update:modelValue', selected || null)
}
</script>

<template>
  <div class="mb-6">
    <div class="mb-6">
      <div v-if="loading" class="text-sm text-gray-500 mb-4">Loading saved addresses...</div>

      <div v-else-if="addresses.length === 0" class="text-sm text-red-500 mb-4">
        No saved addresses found. Please add one in your profile.
      </div>

      <select
        v-else
        :value="modelValue?._id || modelValue?.id || ''"
        @change="onSelectChange"
        class="w-full border-2 border-dashed border-gray-300 px-4 py-3 rounded-lg mb-4 text-sm font-medium text-gray-600 hover:border-gray-400 transition luxurious-roman-regular cursor-pointer bg-white outline-none appearance-none"
      >
        <option value="" disabled>+ Select from Saved Addresses</option>
        <option v-for="addr in addresses" :key="addr._id || addr.id" :value="addr._id || addr.id">
          {{ addr.fullName }} - {{ addr.city }} {{ addr.isDefault ? '(Default)' : '' }}
        </option>
      </select>
    </div>

    <div v-if="modelValue" class="space-y-4 animate-fade-in">
      <div class="mb-4">
        <p class="text-sm text-gray-500 mb-2">Receiver Name</p>
        <input
          type="text"
          :value="modelValue.fullName"
          readonly
          placeholder="Full Name"
          class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
        />
      </div>

      <div class="flex gap-4 mb-4">
        <div class="w-1/2">
          <p class="text-sm text-gray-500 mb-2">House Number</p>
          <input
            type="text"
            :value="modelValue.houseNumber || ''"
            readonly
            placeholder="House Number"
            class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
          />
        </div>
        <div class="w-1/2">
          <p class="text-sm text-gray-500 mb-2">Street</p>
          <input
            type="text"
            :value="modelValue.street || ''"
            readonly
            placeholder="Street"
            class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
          />
        </div>
      </div>

      <div class="flex gap-4 mb-4">
        <div class="w-1/2">
          <p class="text-sm text-gray-500 mb-2">Village (Phum)</p>
          <input
            type="text"
            :value="modelValue.village || ''"
            readonly
            placeholder="Village"
            class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
          />
        </div>
        <div class="w-1/2">
          <p class="text-sm text-gray-500 mb-2">District (Sangkat)</p>
          <input
            type="text"
            :value="modelValue.district || ''"
            readonly
            placeholder="Community"
            class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
          />
        </div>
      </div>

      <!-- District + City -->
      <div class="flex gap-4 mb-4">
        <div class="w-1/2">
          <p class="text-sm text-gray-500 mb-2">Community (Khan)</p>
          <input
            type="text"
            :value="modelValue.community || ''"
            readonly
            placeholder="District"
            class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
          />
        </div>
        <div class="w-1/2">
          <p class="text-sm text-gray-500 mb-2">City/Province</p>
          <input
            type="text"
            :value="modelValue.city || ''"
            readonly
            placeholder="City/Province"
            class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
          />
        </div>
      </div>

      <div class="flex gap-4">
        <div class="w-1/2">
          <p class="text-sm text-gray-500 mb-2">Phone Number</p>
          <input
            type="tel"
            :value="modelValue.phoneNumber || ''"
            readonly
            placeholder="Phone Number"
            class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
          />
        </div>
        <div class="w-1/2">
          <p class="text-sm text-gray-500 mb-2">Zip Code</p>
          <input
            type="text"
            :value="modelValue.zipCode || ''"
            readonly
            placeholder="Zip Code"
            class="w-full border rounded-lg border-gray-300 p-3 text-gray-700 luxurious-roman-regular focus:outline-none cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  </div>
</template>
