<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// This tells TypeScript exactly which keys are allowed
type FilterCategory = 'brand' | 'scent' | 'category' | 'occasion'

// --- 2. DATA ---
const activeDropdown = ref<string | null>(null)
const filters = ref({
  brand: [
    { id: 1, label: 'Chanel', checked: false },
    { id: 2, label: 'Dior', checked: true },
    { id: 3, label: 'Gucci', checked: false },
  ],
  scent: [
    { id: 1, label: 'Floral', checked: false },
    { id: 2, label: 'Woody', checked: false },
    { id: 3, label: 'Citrus', checked: false },
  ],
  category: [
    { id: 1, label: 'Perfume', checked: false },
    { id: 2, label: 'Cologne', checked: false },
  ],
  occasion: [
    { id: 1, label: 'Daily', checked: false },
    { id: 2, label: 'Party', checked: true },
  ],
  sort: [
    { id: 1, label: 'Price: Low to High', checked: false },
    { id: 2, label: 'Price: High to Low', checked: false },
  ],
})

// Configuration for the loop (Typed explicitly to fix the error)
const filterGroups: { key: FilterCategory; label: string }[] = [
  { key: 'brand', label: 'Brand' },
  { key: 'scent', label: 'Scent' },
  { key: 'category', label: 'Category' },
  { key: 'occasion', label: 'Occasions' },
]

// --- 3. LOGIC ---
// Toggle logic
const toggleDropdown = (key: string) => {
  if (activeDropdown.value === key) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = key
  }
}

const closeAll = () => {
  activeDropdown.value = null
}

// Lifecycle hooks for click-outside detection
onMounted(() => document.addEventListener('click', closeAll))
onUnmounted(() => document.removeEventListener('click', closeAll))
</script>

<template>
  <div class="container max-w-8xl mx-auto border-t-2 border-t-black mt-10 px-4">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 gap-6">
      <div
        class="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 w-full lg:w-auto"
      >
        <p class="text-xl luxurious-roman-regular text-black shrink-0 font-bold">Filter by</p>

        <div class="flex flex-wrap gap-4 md:gap-8 luxurious-roman-regular">
          <div v-for="group in filterGroups" :key="group.key" class="relative">
            <button
              @click.stop="toggleDropdown(group.key)"
              type="button"
              class="inline-flex items-center justify-center px-4 py-2.5 text-xl text-black bg-white rounded hover:bg-gray-100 transition-colors"
            >
              {{ group.label }}
              <svg
                class="w-4 h-4 ms-2 transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === group.key }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7" />
              </svg>
            </button>

            <div
              v-if="activeDropdown === group.key"
              @click.stop
              class="absolute z-50 mt-2 w-48 bg-white border border-gray-200 rounded shadow-xl animate-fade-in"
            >
              <ul class="p-3 space-y-2">
                <li v-for="option in filters[group.key]" :key="option.id">
                  <div class="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer">
                    <input
                      :id="`${group.key}-${option.id}`"
                      type="checkbox"
                      v-model="option.checked"
                      class="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      :for="`${group.key}-${option.id}`"
                      class="ms-2 text-sm font-medium text-gray-900 cursor-pointer w-full"
                    >
                      {{ option.label }}
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="self-end lg:self-auto luxurious-roman-regular relative">
        <button
          @click.stop="toggleDropdown('sort')"
          class="inline-flex items-center justify-center px-4 py-2.5 text-xl text-black bg-white rounded hover:bg-gray-100 transition-colors"
        >
          Sort by
          <svg
            class="w-4 h-4 ms-2 transition-transform duration-200"
            :class="{ 'rotate-180': activeDropdown === 'sort' }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7" />
          </svg>
        </button>

        <div
          v-if="activeDropdown === 'sort'"
          @click.stop
          class="absolute right-0 z-50 mt-2 w-56 bg-white border border-gray-200 rounded shadow-xl animate-fade-in"
        >
          <ul class="p-3 space-y-2">
            <li v-for="option in filters.sort" :key="option.id">
              <div class="flex items-center hover:bg-gray-50 p-1 rounded cursor-pointer">
                <input
                  name="sort-radio"
                  :id="`sort-${option.id}`"
                  type="radio"
                  class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  :for="`sort-${option.id}`"
                  class="ms-2 text-sm font-medium text-gray-900 cursor-pointer w-full"
                >
                  {{ option.label }}
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Simple fade animation for smoother UI */
.animate-fade-in {
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
