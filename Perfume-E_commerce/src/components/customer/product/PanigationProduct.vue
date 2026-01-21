<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()
const { pagination } = storeToRefs(productStore)
const { fetchProducts } = productStore

const changePage = (newPage: number) => {
  if (newPage >= 0) {
    fetchProducts(newPage, pagination.value.size)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const visiblePages = computed(() => {
  const total = Math.max(1, pagination.value.totalPages)
  const current = pagination.value.page + 1
  const delta = 2

  const range: (number | string)[] = []

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }
  return range
})
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center bg-white gap-4 px-10">
    <div class="w-full flex items-center justify-between gap-2 p-2">
      <button
        @click="changePage(pagination.page - 1)"
        :disabled="pagination.page === 0"
        class="group flex items-center justify-center w-10 h-10 rounded-full border border-transparent hover:border-[#280559] hover:bg-[#280559] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        <ChevronLeft :size="32" />
      </button>
      <p class="text-lg text-gray-400 luxurious-roman-regular">
        page {{ pagination.page + 1 }}
        <span v-if="pagination.totalPages > 0"> of {{ pagination.totalPages }}</span>
      </p>

      <button
        @click="changePage(pagination.page + 1)"
        class="group flex items-center justify-center w-10 h-10 rounded-full border border-transparent hover:border-[#280559] hover:bg-[#280559] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
        aria-label="Next Page"
      >
        <ChevronRight :size="32" />
      </button>
    </div>
  </div>
</template>
