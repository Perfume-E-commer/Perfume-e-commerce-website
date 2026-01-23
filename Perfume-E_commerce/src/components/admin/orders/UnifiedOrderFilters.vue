<template>
  <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
    <div class="flex flex-col md:flex-row gap-4 justify-between">
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="filters.search"
          type="text"
          placeholder="Search order #, customer name or email..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm transition"
        />
      </div>

      <button
        @click="$emit('reset')"
        class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition"
      >
        Reset Filters
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">From Date</label>
        <input
          v-model="filters.startDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">To Date</label>
        <input
          v-model="filters.endDate"
          type="date"
          class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1"
          >Payment Method</label
        >
        <select
          v-model="filters.paymentMethod"
          class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          <option value="">All Methods</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Stripe">Stripe</option>
          <option value="Cash">Cash on Delivery</option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Order Status</label>
        <select
          v-model="filters.status"
          class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          <option value="">All Statuses</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue'

// Accept parent filters via v-model:filters
const props = defineProps<{
  filters?: {
    search?: string
    startDate?: string
    endDate?: string
    paymentMethod?: string
    status?: string
  }
}>()

const emit = defineEmits(['update:filters', 'reset'])

// Local reactive copy so inputs are responsive and we can debounce
const localFilters = reactive({
  search: props.filters?.search ?? '',
  startDate: props.filters?.startDate ?? '',
  endDate: props.filters?.endDate ?? '',
  paymentMethod: props.filters?.paymentMethod ?? '',
  status: props.filters?.status ?? '',
})

// Keep localFilters in sync when parent updates filters (e.g., reset)
watch(
  () => props.filters,
  (newVal) => {
    if (!newVal) return
    localFilters.search = newVal.search ?? ''
    localFilters.startDate = newVal.startDate ?? ''
    localFilters.endDate = newVal.endDate ?? ''
    localFilters.paymentMethod = newVal.paymentMethod ?? ''
    localFilters.status = newVal.status ?? ''
  },
  { deep: true },
)

// Debounce emitting changes back to parent
let timeout: ReturnType<typeof setTimeout>
watch(
  () => ({ ...localFilters }),
  (newFilters) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      emit('update:filters', { ...newFilters })
    }, 300)
  },
  { deep: true },
)
</script>
