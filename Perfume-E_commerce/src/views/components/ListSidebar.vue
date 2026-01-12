<template>
  <li v-for="item in menuItems" :key="item.name">
    <RouterLink
      :to="item.link"
      @click="$emit('item-click')"
      class="w-full cursor-pointer duration-200 py-3 px-4 rounded-xl block transition-all group"
      :class="
        isActive(item.link)
          ? 'bg-[#280559] text-white shadow-lg font-semibold'
          : 'text-gray-600 hover:bg-[#280559] hover:text-white hover:pl-6'
      "
    >
      <span class="flex items-center">
        <span
          :class="isActive(item.link) ? 'scale-110' : 'group-hover:scale-110'"
          class="transition-transform duration-200"
        >
          {{ item.name }}</span
        >
      </span>
    </RouterLink>
  </li>
</template>

<script lang="ts">
import { RouterLink, useRoute } from 'vue-router'

export default {
  name: 'ListSidebar',
  components: { RouterLink },
  emits: ['item-click'],
  props: {
    menuItems: {
      type: Array as () => { name: string; link: string }[],
      required: true,
    },
  },
  setup() {
    const route = useRoute()

    const isActive = (link: string) => {
      if (link === '/admin/dashboard' && route.path !== '/admin/dashboard') {
          return false;
      }
      return route.path.startsWith(link)
    }

    return { isActive }
  },
}
</script>
