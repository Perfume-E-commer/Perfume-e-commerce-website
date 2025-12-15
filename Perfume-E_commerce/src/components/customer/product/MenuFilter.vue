<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- 1. TYPES ---
type FilterCategory = 'brand' | 'scent' | 'category' | 'occasion'

// --- 2. DATA ---
const activeDropdown = ref<string | null>(null)
const isMobileMenuOpen = ref(false) // New state for mobile menu

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

const filterGroups: { key: FilterCategory; label: string }[] = [
  { key: 'brand', label: 'Brand' },
  { key: 'scent', label: 'Scent' },
  { key: 'category', label: 'Category' },
  { key: 'occasion', label: 'Occasions' },
]

// --- 3. LOGIC ---
const toggleDropdown = (key: string) => {
  if (activeDropdown.value === key) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = key
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeAll = (e: Event) => {
  // Optional: check if click target is inside the component to avoid closing unexpectedly
  // For now, keeping your original simple logic to clear active dropdowns
  // but we usually don't want to close the Mobile Menu immediately on click inside it.
  const target = e.target as HTMLElement
  if (!target.closest('.filter-container')) {
    activeDropdown.value = null
  }
}

onMounted(() => document.addEventListener('click', closeAll))
onUnmounted(() => document.removeEventListener('click', closeAll))
</script>

<template>
  <div class="filter-container container max-w-8xl mx-auto border-t-2 border-t-black mt-10 px-4">
    <div class="hidden lg:flex flex-row justify-between items-center mt-4 gap-6">
      <div class="flex items-center gap-12">
        <p class="text-xl luxurious-roman-regular text-black shrink-0 font-bold">Filter by</p>

        <div class="flex flex-wrap gap-8 luxurious-roman-regular">
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
                      :id="`desktop-${group.key}-${option.id}`"
                      type="checkbox"
                      v-model="option.checked"
                      class="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      :for="`desktop-${group.key}-${option.id}`"
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

      <div class="luxurious-roman-regular relative">
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
                  name="sort-radio-desktop"
                  :id="`desktop-sort-${option.id}`"
                  type="radio"
                  class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  :for="`desktop-sort-${option.id}`"
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

    <div class="lg:hidden mt-4">
      <div class="flex justify-between items-center mb-4">
        <p class="text-xl luxurious-roman-regular text-black font-bold">Filter by</p>

        <button
          @click.stop="toggleMobileMenu"
          class="p-2 text-black hover:bg-gray-100 rounded focus:outline-none"
        >
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div v-if="isMobileMenuOpen" class="flex flex-col gap-2 animate-fade-in">
        <div v-for="group in filterGroups" :key="group.key" class="border-b border-gray-100 pb-2">
          <button
            @click.stop="toggleDropdown(group.key)"
            class="flex items-center justify-between w-full px-2 py-3 text-lg font-medium text-left text-black bg-gray-50 rounded hover:bg-gray-100"
          >
            {{ group.label }}
            <svg
              class="w-4 h-4 transition-transform duration-200"
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

          <div v-if="activeDropdown === group.key" @click.stop class="mt-2 w-full bg-white pl-4">
            <ul class="space-y-3 py-2">
              <li v-for="option in filters[group.key]" :key="option.id">
                <div class="flex items-center">
                  <input
                    :id="`mobile-${group.key}-${option.id}`"
                    type="checkbox"
                    v-model="option.checked"
                    class="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    :for="`mobile-${group.key}-${option.id}`"
                    class="ms-3 text-base text-gray-700 w-full"
                  >
                    {{ option.label }}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-b border-gray-100 pb-2">
          <button
            @click.stop="toggleDropdown('sort')"
            class="flex items-center justify-between w-full px-2 py-3 text-lg font-medium text-left text-black bg-gray-50 rounded hover:bg-gray-100"
          >
            Sort by
            <svg
              class="w-4 h-4 transition-transform duration-200"
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

          <div v-if="activeDropdown === 'sort'" @click.stop class="mt-2 w-full bg-white pl-4">
            <ul class="space-y-3 py-2">
              <li v-for="option in filters.sort" :key="option.id">
                <div class="flex items-center">
                  <input
                    name="sort-radio-mobile"
                    :id="`mobile-sort-${option.id}`"
                    type="radio"
                    class="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    :for="`mobile-sort-${option.id}`"
                    class="ms-3 text-base text-gray-700 w-full"
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
  </div>
</template>

<style scoped>
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
