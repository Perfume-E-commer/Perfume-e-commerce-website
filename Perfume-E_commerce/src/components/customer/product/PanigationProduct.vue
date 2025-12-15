<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { useProductStore } from '@/stores/productStore'

// 1. Connect to Store
const productStore = useProductStore()
const { pagination } = storeToRefs(productStore)
const { fetchProducts } = productStore

// 2. Handle Page Changes
const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < pagination.value.totalPages) {
    fetchProducts(newPage, pagination.value.size)
    // Optional: Scroll to top of product list
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
const visiblePages = computed(() => {
  const total = pagination.value.totalPages
  const current = pagination.value.page + 1
  const delta = 2 // How many pages to show around current page

  const range = []
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
  <div v-if="pagination.totalPages > 1" class="container mx-auto p-4 mt-8">
    <div class="flex justify-center items-center gap-2 luxurious-roman-regular">
      <button
        @click="changePage(pagination.page - 1)"
        :disabled="pagination.page === 0"
        class="p-2 rounded-full border border-[#280559] text-[#280559] hover:bg-[#280559] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#280559]"
      >
        <ChevronLeft :size="20" />
      </button>

      <div class="flex items-center gap-1 mx-2">
        <template v-for="(p, index) in visiblePages" :key="index">
          <span v-if="p === '...'" class="px-2 text-gray-400">...</span>

          <button
            v-else
            @click="changePage((p as number) - 1)"
            class="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300"
            :class="[
              pagination.page === (p as number) - 1
                ? 'bg-[#280559] text-white border-[#280559] shadow-md' // Active State
                : 'bg-white text-[#280559] border-gray-200 hover:border-[#280559] hover:bg-purple-50', // Inactive State
            ]"
          >
            {{ p }}
          </button>
        </template>
      </div>

      <button
        @click="changePage(pagination.page + 1)"
        :disabled="pagination.last"
        class="p-2 rounded-full border border-[#280559] text-[#280559] hover:bg-[#280559] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#280559]"
      >
        <ChevronRight :size="20" />
      </button>
    </div>

    <p class="text-center text-gray-500 text-sm mt-4">
      Showing page {{ pagination.page + 1 }} of {{ pagination.totalPages }}
    </p>
  </div>
</template>
