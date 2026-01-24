<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

type FilterCategory = 'brand' | 'scent' | 'category' | 'occasion' | 'price' | 'rating' | 'sort'

type Option = { id: string; label: string; checked: boolean }
type SortOption = { id: string; label: string; value?: string; checked: boolean }
type RatingOption = { id: string; label: string; checked: boolean }
type PriceOption = {
  id: string
  label: string
  min: number
  max: number
  selectedMin: number
  selectedMax: number
}

type Filters = {
  brand: Option[]
  scent: Option[]
  category: Option[]
  occasion: Option[]
  sort: SortOption[]
  rating: RatingOption[]
  price: PriceOption[]
}

const props = defineProps<{
  brands: string[]
  scents: string[]
  categories: string[]
  occasions: string[]
}>()

const emit = defineEmits<{
  filterChange: [filters: Record<string, any>]
  sortChange: [sortOption: string]
}>()

const activeDropdown = ref<string | null>(null)
const isMobileMenuOpen = ref(false)

const filters = ref<Filters>({
  brand: [],
  scent: [],
  category: [],
  occasion: [],
  sort: [
    { id: 'default', label: 'Default', value: 'default', checked: true },
    { id: 'rating_eq_0', label: 'Rating: 0 stars', value: 'rating_eq_0', checked: false },
    { id: 'rating_eq_1', label: 'Rating: 1 star', value: 'rating_eq_1', checked: false },
    { id: 'rating_eq_2', label: 'Rating: 2 stars', value: 'rating_eq_2', checked: false },
    { id: 'rating_eq_3', label: 'Rating: 3 stars', value: 'rating_eq_3', checked: false },
    { id: 'rating_eq_4', label: 'Rating: 4 stars', value: 'rating_eq_4', checked: false },
    { id: 'rating_eq_5', label: 'Rating: 5 stars', value: 'rating_eq_5', checked: false },
  ],
  rating: [
    { id: '0', label: 'No rating', checked: false },
    { id: '1', label: '1 star', checked: false },
    { id: '2', label: '2 stars', checked: false },
    { id: '3', label: '3 stars', checked: false },
    { id: '4', label: '4 stars', checked: false },
    { id: '5', label: '5 stars', checked: false },
  ],
  price: [{ id: 'price', label: 'Price', min: 0, max: 1000, selectedMin: 0, selectedMax: 1000 }],
})

const filterGroups: { key: FilterCategory; label: string }[] = [
  { key: 'brand', label: 'Brand' },
  { key: 'scent', label: 'Scent' },
  { key: 'category', label: 'Category' },
  { key: 'occasion', label: 'Occasions' },
]

const updateFilterOptions = (
  currentOptions: { id: string; label: string; checked: boolean }[],
  newValues: string[],
) => {
  const checkedSet = new Set(currentOptions.filter((o) => o.checked).map((o) => o.label))

  return newValues.map((value) => ({
    id: value,
    label: value,
    checked: checkedSet.has(value),
  }))
}

watch(
  () => [props.brands, props.scents, props.categories, props.occasions],
  () => {
    filters.value.brand = updateFilterOptions(filters.value.brand, props.brands || [])
    filters.value.scent = updateFilterOptions(filters.value.scent, props.scents || [])
    filters.value.category = updateFilterOptions(filters.value.category, props.categories || [])
    filters.value.occasion = updateFilterOptions(filters.value.occasion, props.occasions || [])
  },
  { immediate: true, deep: true },
)

const selectedFilters = computed(() => {
  const selected: Record<string, string[]> = {}

  // handle price separately
  const priceOption = filters.value.price && filters.value.price[0]
  if (priceOption) {
    const min = Number(priceOption.selectedMin ?? priceOption.min ?? 0)
    const max = Number(priceOption.selectedMax ?? priceOption.max ?? 1000)
    if (min !== Number(priceOption.min) || max !== Number(priceOption.max)) {
      selected.price = [String(min), String(max)]
    }
  }

  // checkbox-like groups
  const checkboxKeys: FilterCategory[] = ['brand', 'scent', 'category', 'occasion', 'rating']
  checkboxKeys.forEach((key) => {
    const options = filters.value[key] as Array<{ id: string; label?: string; checked?: boolean }>
    const checkedItems = options
      .filter((item) => !!item.checked)
      .map((item) => (key === 'rating' ? item.id : item.label || item.id))
    if (checkedItems.length > 0) selected[key] = checkedItems
  })

  return selected
})

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
  const target = e.target as HTMLElement
  if (!target.closest('.filter-container')) {
    activeDropdown.value = null
  }
}

watch(
  selectedFilters,
  (newFilters) => {
    console.debug('MenuFilter selectedFilters ->', newFilters)
    emit('filterChange', newFilters)
  },
  { deep: true },
)

const handleSortChange = (sortValue: string) => {
  emit('sortChange', sortValue)
  filters.value.sort.forEach((option) => {
    option.checked = option.value === sortValue
  })
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
                  <label
                    v-if="group.key !== 'price'"
                    class="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors duration-150"
                  >
                    <input
                      :id="`desktop-${group.key}-${option.id}`"
                      type="checkbox"
                      v-model="(option as any).checked"
                      class="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span class="ms-2 text-sm font-medium text-gray-900">
                      <template v-if="group.key === 'rating'">
                        <span class="flex items-center gap-1" aria-hidden="true">
                          <svg
                            v-for="i in 5"
                            :key="i"
                            class="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            :class="{
                              'fill-[#280559] text-[#280559]': i <= Number(option.id),
                              'text-gray-300': i > Number(option.id),
                            }"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.376 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.631 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z"
                            />
                          </svg>
                        </span>
                        <span class="ms-2 text-sm text-gray-700">
                          {{ option.id === '0' ? 'No rating' : option.id + ' star' }}
                        </span>
                      </template>
                      <template v-else>{{ option.label }}</template>
                    </span>
                  </label>

                  <!-- Price range UI (desktop) -->
                  <div v-else class="px-3 py-2">
                    <div class="text-sm text-gray-700 mb-2">Price range</div>
                    <div class="flex items-center gap-3">
                      <input
                        type="number"
                        class="w-20 p-1 border rounded"
                        :min="(option as any).min"
                        :max="(option as any).max"
                        v-model.number="(option as any).selectedMin"
                        @input="
                          (option as any).selectedMin = Math.min(
                            (option as any).selectedMin,
                            (option as any).selectedMax,
                          )
                        "
                      />
                      <span class="text-sm">—</span>
                      <input
                        type="number"
                        class="w-20 p-1 border rounded"
                        :min="(option as any).min"
                        :max="(option as any).max"
                        v-model.number="(option as any).selectedMax"
                        @input="
                          (option as any).selectedMax = Math.max(
                            (option as any).selectedMax,
                            (option as any).selectedMin,
                          )
                        "
                      />
                    </div>
                    <div class="mt-3">
                      <input
                        type="range"
                        :min="(option as any).min"
                        :max="(option as any).max"
                        v-model.number="(option as any).selectedMin"
                        @input="
                          (option as any).selectedMin = Math.min(
                            (option as any).selectedMin,
                            (option as any).selectedMax,
                          )
                        "
                        class="w-full"
                      />
                      <input
                        type="range"
                        :min="(option as any).min"
                        :max="(option as any).max"
                        v-model.number="(option as any).selectedMax"
                        @input="
                          (option as any).selectedMax = Math.max(
                            (option as any).selectedMax,
                            (option as any).selectedMin,
                          )
                        "
                        class="w-full mt-2"
                      />
                    </div>
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
              <label
                class="flex items-center hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors duration-150"
              >
                <input
                  name="sort-radio-desktop"
                  :id="`desktop-sort-${option.id}`"
                  type="radio"
                  :value="option.value"
                  :checked="option.checked"
                  @change="handleSortChange(option.value as string)"
                  class="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span class="ms-2 text-sm font-medium text-gray-900">
                  <template v-if="option.value && option.value.includes('rating')">
                    <span class="flex items-center gap-1" aria-hidden="true">
                      <svg
                        v-for="i in 5"
                        :key="i"
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        :class="{
                          'fill-[#280559] text-[#280559]':
                            option.value === 'rating_desc' ||
                            (option.value === 'rating_asc' && i === 1) ||
                            (option.value &&
                              option.value.startsWith &&
                              option.value.startsWith('rating_eq_') &&
                              i <= Number(option.value.split('_').pop())),
                          'text-gray-300': !(
                            option.value === 'rating_desc' ||
                            (option.value === 'rating_asc' && i === 1) ||
                            (option.value &&
                              option.value.startsWith &&
                              option.value.startsWith('rating_eq_') &&
                              i <= Number(option.value.split('_').pop()))
                          ),
                        }"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.376 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.631 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z"
                        />
                      </svg>
                    </span>
                    <span class="sr-only">
                      {{
                        option.value === 'rating_desc'
                          ? 'Rating: High to Low'
                          : 'Rating: Low to High'
                      }}
                    </span>
                  </template>
                  <template v-else>{{ option.label }}</template>
                </span>
              </label>
            </li>
          </ul>

          <!-- Desktop price UI inside Sort dropdown -->
          <div v-if="filters.price && filters.price[0]" class="border-t pt-3 px-3">
            <div class="text-sm text-gray-700 mb-2">Price range</div>
            <div class="flex items-center gap-3">
              <input
                type="number"
                class="w-20 p-1 border rounded"
                :min="filters.price[0].min"
                :max="filters.price[0].max"
                v-model.number="filters.price[0].selectedMin"
                @input="
                  filters.price[0].selectedMin = Math.min(
                    filters.price[0].selectedMin,
                    filters.price[0].selectedMax,
                  )
                "
              />
              <span class="text-sm">—</span>
              <input
                type="number"
                class="w-20 p-1 border rounded"
                :min="filters.price[0].min"
                :max="filters.price[0].max"
                v-model.number="filters.price[0].selectedMax"
                @input="
                  filters.price[0].selectedMax = Math.max(
                    filters.price[0].selectedMax,
                    filters.price[0].selectedMin,
                  )
                "
              />
            </div>
            <div class="mt-3">
              <input
                type="range"
                :min="filters.price[0].min"
                :max="filters.price[0].max"
                v-model.number="filters.price[0].selectedMin"
                @input="
                  filters.price[0].selectedMin = Math.min(
                    filters.price[0].selectedMin,
                    filters.price[0].selectedMax,
                  )
                "
                class="w-full"
              />
              <input
                type="range"
                :min="filters.price[0].min"
                :max="filters.price[0].max"
                v-model.number="filters.price[0].selectedMax"
                @input="
                  filters.price[0].selectedMax = Math.max(
                    filters.price[0].selectedMax,
                    filters.price[0].selectedMin,
                  )
                "
                class="w-full mt-2"
              />
            </div>
          </div>
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
            class="flex items-center justify-between w-full px-2 py-3 text-lg font-medium text-left text-black bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-150"
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

          <div
            v-if="activeDropdown === group.key"
            @click.stop
            class="mt-2 w-full bg-white pl-4 animate-fade-in rounded border border-gray-200"
          >
            <ul class="space-y-2 py-2">
              <li v-for="option in filters[group.key]" :key="option.id">
                <label
                  v-if="group.key !== 'price'"
                  class="flex items-center cursor-pointer p-1 rounded hover:bg-gray-50 transition-colors duration-150"
                >
                  <input
                    :id="`mobile-${group.key}-${option.id}`"
                    type="checkbox"
                    v-model="(option as any).checked"
                    class="w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ms-3 text-base text-gray-700">
                    <template v-if="group.key === 'rating'">
                      <span class="flex items-center gap-1" aria-hidden="true">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          :class="{
                            'fill-[#280559] text-[#280559]': i <= Number(option.id),
                            'text-gray-300': i > Number(option.id),
                          }"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.376 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.631 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z"
                          />
                        </svg>
                      </span>
                      <span class="ms-3 text-base text-gray-700">{{
                        option.id === '0' ? 'No rating' : option.id + ' star'
                      }}</span>
                    </template>
                    <template v-else>{{ option.label }}</template>
                  </span>
                </label>

                <!-- Price UI for mobile -->
                <div v-else class="px-3 py-2">
                  <div class="text-sm text-gray-700 mb-2">Price range</div>
                  <div class="flex items-center gap-3">
                    <input
                      type="number"
                      class="w-20 p-1 border rounded"
                      :min="(option as any).min"
                      :max="(option as any).max"
                      v-model.number="(option as any).selectedMin"
                      @input="
                        (option as any).selectedMin = Math.min(
                          (option as any).selectedMin,
                          (option as any).selectedMax,
                        )
                      "
                    />
                    <span class="text-sm">—</span>
                    <input
                      type="number"
                      class="w-20 p-1 border rounded"
                      :min="(option as any).min"
                      :max="(option as any).max"
                      v-model.number="(option as any).selectedMax"
                      @input="
                        (option as any).selectedMax = Math.max(
                          (option as any).selectedMax,
                          (option as any).selectedMin,
                        )
                      "
                    />
                  </div>
                  <div class="mt-3">
                    <input
                      type="range"
                      :min="(option as any).min"
                      :max="(option as any).max"
                      v-model.number="(option as any).selectedMin"
                      @input="
                        (option as any).selectedMin = Math.min(
                          (option as any).selectedMin,
                          (option as any).selectedMax,
                        )
                      "
                      class="w-full"
                    />
                    <input
                      type="range"
                      :min="(option as any).min"
                      :max="(option as any).max"
                      v-model.number="(option as any).selectedMax"
                      @input="
                        (option as any).selectedMax = Math.max(
                          (option as any).selectedMax,
                          (option as any).selectedMin,
                        )
                      "
                      class="w-full mt-2"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-b border-gray-100 pb-2">
          <button
            @click.stop="toggleDropdown('sort')"
            class="flex items-center justify-between w-full px-2 py-3 text-lg font-medium text-left text-black bg-gray-50 rounded hover:bg-gray-100 transition-colors duration-150"
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

          <div
            v-if="activeDropdown === 'sort'"
            @click.stop
            class="mt-2 w-full bg-white pl-4 animate-fade-in rounded border border-gray-200"
          >
            <ul class="space-y-2 py-2">
              <li v-for="option in filters.sort" :key="option.id">
                <label
                  class="flex items-center cursor-pointer p-1 rounded hover:bg-gray-50 transition-colors duration-150"
                >
                  <input
                    name="sort-radio-mobile"
                    :id="`mobile-sort-${option.id}`"
                    type="radio"
                    :value="option.value"
                    :checked="option.checked"
                    @change="handleSortChange(option.value as string)"
                    class="w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span class="ms-3 text-base text-gray-700">
                    <template v-if="option.value && option.value.includes('rating')">
                      <span class="flex items-center gap-1" aria-hidden="true">
                        <svg
                          v-for="i in 5"
                          :key="i"
                          class="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          :class="{
                            'fill-[#280559] text-[#280559]':
                              option.value === 'rating_desc' ||
                              (option.value === 'rating_asc' && i === 1) ||
                              (option.value &&
                                option.value.startsWith &&
                                option.value.startsWith('rating_eq_') &&
                                i <= Number(option.value.split('_').pop())),
                            'text-gray-300': !(
                              option.value === 'rating_desc' ||
                              (option.value === 'rating_asc' && i === 1) ||
                              (option.value &&
                                option.value.startsWith &&
                                option.value.startsWith('rating_eq_') &&
                                i <= Number(option.value.split('_').pop()))
                            ),
                          }"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.376 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.631 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.049 2.927z"
                          />
                        </svg>
                      </span>
                      <span class="sr-only">
                        {{
                          option.value === 'rating_desc'
                            ? 'Rating: High to Low'
                            : 'Rating: Low to High'
                        }}
                      </span>
                    </template>
                    <template v-else>{{ option.label }}</template>
                  </span>
                </label>
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
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
