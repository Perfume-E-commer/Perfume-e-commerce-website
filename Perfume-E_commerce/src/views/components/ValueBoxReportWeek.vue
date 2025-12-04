<template>
  <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
    <div
      v-for="item in items"
      :key="item.name"
      @click="handleClick(item)"
      :class="[
        'cursor-pointer transition-colors duration-200 py-2 px-1 border-b',
        activeItem === item.name
          ? 'bg-linear-to-t from-indigo-100 text-gray-700 border-indigo-300'
          : 'text-gray-700 border-indigo-200',
      ]"
    >
      <div class="p-3">
        <div class="text-2xl">{{ item.value }}</div>
        <div class="text-sm">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ValueBoxReportWeek',
  props: {
    items: {
      type: Array as () => { name: string; value: string | number }[],
      required: true,
    },
  },
  emits: ['update:activeItem'],
  setup(props, { emit }) {
    const activeItem = ref(props.items[0]?.name || '')

    const handleClick = (item: { name: string; value: string | number }) => {
      activeItem.value = item.name
      emit('update:activeItem', item.name)
    }

    return {
      activeItem,
      handleClick,
    }
  },
})
</script>
