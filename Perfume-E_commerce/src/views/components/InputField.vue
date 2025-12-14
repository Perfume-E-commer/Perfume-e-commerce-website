<template>
  <div class="space-y-1">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :readonly="readonly"
      :class="[
        'w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500',
        { 'bg-gray-50 text-gray-500 pointer-events-none': readonly },
      ]"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  modelValue: [String, Number],
  readonly: { type: Boolean, default: false },
  type: { type: String, default: 'text' },
})

const emit = defineEmits(['update:modelValue'])
</script>
