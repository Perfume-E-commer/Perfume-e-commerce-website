<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div
      class="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center"
    >
      <div class="relative w-full sm:max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="searchQueryLocal"
          type="text"
          placeholder="Search by name, email, or phone..."
          class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        />
      </div>

      <div class="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <select
          v-model="localFilters.orderCount"
          @change="emit('update-filter', 'orderCount', localFilters.orderCount)"
          class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
        >
          <option value="">All Orders</option>
          <option value="1">1 Order</option>
          <option value="2+">2+ Orders</option>
          <option value="5+">5+ Orders</option>
        </select>

        <select
          v-model="localFilters.spendingTier"
          @change="emit('update-filter', 'spendingTier', localFilters.spendingTier)"
          class="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
        >
          <option value="">All Spending</option>
          <option value="high">High (>$200)</option>
          <option value="medium">Medium ($50-$200)</option>
          <option value="low">Low (<$50)</option>
        </select>

        <button
          @click="emit('export')"
          class="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition flex items-center gap-1 whitespace-nowrap"
          title="Export CSV"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead
          class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs"
        >
          <tr>
            <th class="px-6 py-3">Customer</th>
            <th class="px-6 py-3">Joined</th>
            <th class="px-6 py-3 text-center">Orders</th>
            <th class="px-6 py-3 text-right">Total Spent</th>
            <th class="px-6 py-3">Last Active</th>
            <th class="px-6 py-3 text-center">Status</th>
            <th class="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="customers.length === 0">
            <td colspan="7" class="px-6 py-12 text-center text-gray-400">
              <div class="flex flex-col items-center">
                <svg
                  class="w-12 h-12 mb-2 opacity-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <p>No customers found matching your criteria.</p>
              </div>
            </td>
          </tr>

          <tr
            v-for="customer in customers"
            :key="customer.id"
            class="hover:bg-gray-50/80 transition group"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs"
                >
                  {{ getInitials(customer.firstName, customer.lastName) }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">
                    {{ customer.firstName }} {{ customer.lastName }}
                  </p>
                  <p class="text-xs text-gray-500">{{ customer.email }}</p>
                </div>
              </div>
            </td>

            <td class="px-6 py-4 text-gray-600 whitespace-nowrap">
              {{ formatDate(customer.joinedAt || '') }}
            </td>

            <td class="px-6 py-4 text-center font-medium">
              <span
                v-if="customer.ordersCount && customer.ordersCount > 0"
                class="px-2 py-0.5 bg-gray-100 rounded-md"
              >
                {{ customer.ordersCount }}
              </span>
              <span v-else class="text-gray-400">-</span>
            </td>

            <td class="px-6 py-4 text-right font-medium text-gray-900">
              {{ formatCurrency(customer.totalSpent) }}
            </td>

            <td class="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
              {{ formatRelativeTime(customer.lastOrderDate) }}
            </td>

            <td class="px-6 py-4 text-center">
              <span
                v-if="customer.active"
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-100"
              >
                Active
              </span>
              <span
                v-else
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200"
              >
                Inactive
              </span>
            </td>

            <td class="px-6 py-4 text-right">
              <button
                @click="emit('view-details', customer)"
                class="text-indigo-600 hover:text-indigo-900 text-xs font-bold px-3 py-1.5 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-white transition shadow-sm"
              >
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '@/services/customerService'

const props = defineProps<{
  customers: Customer[]
  searchQuery: string
  filters: {
    orderCount: string
    spendingTier: string
  }
}>()

const emit = defineEmits(['update:searchQuery', 'update-filter', 'view-details', 'export'])

import { reactive, watch, computed } from 'vue'

// Normalize incoming filters: parent may pass a ref or a plain object
const resolveFilters = (f: any) => {
  if (!f) return { orderCount: '', spendingTier: '' }
  if (f.orderCount !== undefined && f.spendingTier !== undefined) return f
  if (f.value && f.value.orderCount !== undefined) return f.value
  return { orderCount: '', spendingTier: '' }
}

const initialFilters = resolveFilters(props.filters)
const localFilters = reactive({
  orderCount: initialFilters.orderCount || '',
  spendingTier: initialFilters.spendingTier || '',
})

// Keep localFilters in sync with parent-provided filters (handles ref or plain object)
watch(
  () => resolveFilters(props.filters),
  (next) => {
    localFilters.orderCount = next?.orderCount || ''
    localFilters.spendingTier = next?.spendingTier || ''
  },
  { deep: true },
)

// Expose customers as a computed to make template usage simple
const customers = computed(() => props.customers || [])

// Bindable searchQuery with getter/setter so v-model works and emits properly
const searchQueryLocal = computed({
  get: () => props.searchQuery || '',
  set: (val: string) => emit('update:searchQuery', val),
})

// Helpers
const getInitials = (first: string, last: string) => {
  return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase()
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null) return '-'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

const formatRelativeTime = (dateStr?: string) => {
  if (!dateStr) return 'Never'
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return formatDate(dateStr)
}
</script>
