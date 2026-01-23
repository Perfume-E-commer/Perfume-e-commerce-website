<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 animate-fade-in"
  >
    <div class="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <h3 class="font-bold text-gray-800">{{ title }}</h3>
        <span
          class="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm"
        >
          {{ promotions.length }}
        </span>
      </div>
      <p class="text-xs text-gray-500">
        {{ tableDescription }}
      </p>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead
          class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs"
        >
          <tr>
            <th class="px-6 py-3">Promo Code</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3 text-center">Discount</th>
            <th class="px-6 py-3">Expiry Date</th>
            <th class="px-6 py-3 text-center">Status</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="promotions.length === 0">
            <td colspan="6" class="px-6 py-12 text-center">
              <div class="flex flex-col items-center text-gray-400">
                <svg
                  class="w-12 h-12 mb-3 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p class="italic mb-2">No promotions found in this section</p>
                <p class="text-xs">Create a new promotion to get started</p>
              </div>
            </td>
          </tr>

          <tr
            v-for="promo in promotions"
            :key="promo.id"
            class="hover:bg-gray-50/80 transition group"
            :class="{
              'opacity-75': isExpired(promo.validUntil) || !promo.active,
            }"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span
                  class="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-sm select-all shadow-sm"
                >
                  {{ promo.code }}
                </span>
                <span
                  v-if="isNewPromotion(promo.createdAt)"
                  class="px-2 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-200"
                >
                  NEW
                </span>
              </div>
            </td>

            <td class="px-6 py-4">
              <div>
                <p class="text-gray-800 font-medium">{{ promo.description }}</p>
                <p v-if="promo.createdAt" class="text-xs text-gray-400 mt-1">
                  Created {{ formatRelativeDate(promo.createdAt) }}
                </p>
              </div>
            </td>

            <td class="px-6 py-4 text-center">
              <span
                class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-100 shadow-sm"
              >
                <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ promo.discountPercentage || promo.discount || promo.percentage || 0 }}% OFF
              </span>
            </td>

            <td class="px-6 py-4">
              <div class="flex flex-col">
                <span class="font-medium text-gray-800">{{ formatDate(promo.validUntil) }}</span>
                <div class="flex items-center gap-1.5 mt-1">
                  <span
                    v-if="isExpired(promo.validUntil)"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 border border-red-200"
                  >
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Expired
                  </span>
                  <span
                    v-else-if="isExpiringSoon(promo.validUntil)"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200"
                  >
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Expiring Soon
                  </span>
                  <span v-else class="text-xs text-gray-500">
                    {{ daysUntilExpiry(promo.validUntil) }} days left
                  </span>
                </div>
              </div>
            </td>

            <td class="px-6 py-4 text-center">
              <div class="flex flex-col items-center">
                <button
                  @click="$emit('toggle-status', promo)"
                  :class="[
                    'px-4 py-2 rounded-lg text-xs font-bold border transition-all duration-200 shadow-sm',
                    promo.active && !isExpired(promo.validUntil)
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300'
                      : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200',
                  ]"
                  :disabled="isExpired(promo.validUntil)"
                >
                  <span class="flex items-center gap-1.5">
                    <span
                      :class="
                        promo.active && !isExpired(promo.validUntil)
                          ? 'bg-emerald-500'
                          : 'bg-gray-400'
                      "
                      class="w-2 h-2 rounded-full"
                    ></span>
                    {{ getStatusText(promo) }}
                  </span>
                </button>
                <p
                  v-if="isExpired(promo.validUntil) && promo.active"
                  class="text-xs text-gray-400 mt-1"
                >
                  Auto-expired
                </p>
              </div>
            </td>

            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2">
                <button
                  @click="$emit('edit', promo)"
                  class="text-indigo-600 hover:text-indigo-900 text-xs font-bold bg-white border border-gray-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1.5"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  @click="$emit('delete', promo.id)"
                  class="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1.5 rounded-lg hover:bg-red-50 transition border border-transparent hover:border-red-200 flex items-center gap-1.5"
                  title="Delete promotion"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

const props = defineProps<{
  title: string
  promotions: any[]
}>()

const emit = defineEmits(['toggle-status', 'edit', 'delete'])

// ✅ DEBUG: Log the data to console so you can inspect it
onMounted(() => {
  if (props.promotions && props.promotions.length > 0) {
    console.log('📢 PROMOTION DATA RECEIVED:', props.promotions[0])
  }
})

// Computed description based on title
const tableDescription = computed(() => {
  if (props.title.includes('Active')) {
    return 'Promotions that are currently active and not expired'
  } else if (props.title.includes('Past')) {
    return 'Expired or manually deactivated promotions'
  }
  return ''
})

// Helper functions
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatRelativeDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return formatDate(dateStr)
}

const isExpired = (dateStr: string) => {
  if (!dateStr) return false
  const expiry = new Date(dateStr).setHours(23, 59, 59, 999)
  const now = new Date().getTime()
  return now > expiry
}

const isExpiringSoon = (dateStr: string) => {
  if (!dateStr) return false
  if (isExpired(dateStr)) return false

  const expiry = new Date(dateStr)
  const now = new Date()
  const diffTime = expiry.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays <= 7 // Expiring in 7 days or less
}

const daysUntilExpiry = (dateStr: string) => {
  if (!dateStr) return 0
  const expiry = new Date(dateStr)
  const now = new Date()
  const diffTime = expiry.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
}

const isNewPromotion = (createdAt: string) => {
  if (!createdAt) return false
  const created = new Date(createdAt)
  const now = new Date()
  const diffTime = now.getTime() - created.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7 // New if created within last 7 days
}

const getStatusText = (promo: any) => {
  if (isExpired(promo.validUntil)) {
    return 'Expired'
  } else if (!promo.active) {
    return 'Deactivated'
  } else {
    return 'Active'
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
