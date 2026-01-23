<template>
  <div class="p-6 space-y-8 min-h-screen bg-gray-50/50">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Promotion Management</h1>
        <p class="text-sm text-gray-500 mt-1">Manage discount codes and seasonal offers.</p>
      </div>
      <button
        @click="openCreateModal"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center shadow-sm text-sm font-medium"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Create New Promotion
      </button>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full"
      ></div>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Campaigns</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ activePromotions.length }}</p>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
        <div
          class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Inactive Promotions
            </p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ inactivePromotions.length }}</p>
          </div>
          <div class="p-3 bg-red-50 rounded-lg text-red-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              />
            </svg>
          </div>
        </div>
        <div
          class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Promos</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ promotions.length }}</p>
          </div>
          <div class="p-3 bg-blue-50 rounded-lg text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>
      </div>

      <PromotionTable
        title="Active Campaigns"
        :promotions="activePromotions"
        @toggle-status="handleToggleStatus"
        @edit="openEditModal"
        @delete="handleDelete"
      />

      <PromotionTable
        v-if="inactivePromotions.length > 0"
        title="Past & Inactive Promotions"
        :promotions="inactivePromotions"
        @toggle-status="handleToggleStatus"
        @edit="openEditModal"
        @delete="handleDelete"
      />
    </div>

    <PromotionModal
      :is-open="isModalOpen"
      :edit-data="selectedPromo"
      :is-loading="isSaving"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PromotionTable from '@/components/admin/promotions/PromotionTable.vue'
import PromotionModal from '@/components/admin/promotions/PromotionModal.vue'
import promotionService from '@/services/promotionService'

// --- State ---
const promotions = ref<any[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const isModalOpen = ref(false)
const selectedPromo = ref<any | null>(null)

// --- Computed Properties ---
const activePromotions = computed(() => {
  const now = new Date()
  return promotions.value.filter((p) => {
    if (!p) return false
    if (p.active !== true) return false
    if (p.validUntil) {
      const expiry = new Date(p.validUntil)
      expiry.setHours(23, 59, 59, 999)
      if (expiry < now) return false
    }
    return true
  })
})

const inactivePromotions = computed(() => {
  const now = new Date()
  return promotions.value.filter((p) => {
    if (!p) return false
    if (p.active === false) return true
    if (p.validUntil) {
      const expiry = new Date(p.validUntil)
      expiry.setHours(23, 59, 59, 999)
      if (expiry < now) return true
    }
    return false
  })
})

// --- API Methods ---
const loadPromotions = async () => {
  if (promotions.value.length === 0) isLoading.value = true
  try {
    const response = await promotionService.getAllPromotions({ page: 0, size: 100, search: '' })

    // Robust Unwrap Logic
    let data: any[] = []
    const respAny = response as any
    if (Array.isArray(response)) data = response
    else if (respAny?.data && Array.isArray(respAny.data)) data = respAny.data
    else if (respAny?.data?.content && Array.isArray(respAny.data.content))
      data = respAny.data.content
    else if (respAny?.result && Array.isArray(respAny.result)) data = respAny.result

    promotions.value = data
  } catch (error) {
    console.error('Failed to load promotions:', error)
    alert('Could not load promotions. Please refresh.')
  } finally {
    isLoading.value = false
  }
}

const handleSave = async (payload: any) => {
  isSaving.value = true
  try {
    if (selectedPromo.value) {
      // UPDATE SCENARIO
      const id = selectedPromo.value.id

      // 🟢 SMART CHECK: Did the user toggle the status in the modal?
      if (payload.active !== selectedPromo.value.active) {
        console.log('🔄 Status change detected in Modal. Triggering Toggle Endpoint...')
        await promotionService.togglePromotion(id)
      }

      // Update other details
      await promotionService.updatePromotion(id, payload)
      alert('Updated successfully!')
    } else {
      // CREATE SCENARIO
      await promotionService.createPromotion(payload)
      alert('Created successfully!')
    }
    closeModal()
    await loadPromotions()
  } catch (error: any) {
    console.error('Save error:', error)
    const msg = error.response?.data?.message || 'Operation failed'
    alert('Error: ' + msg)
  } finally {
    isSaving.value = false
  }
}

const handleToggleStatus = async (promo: any) => {
  try {
    // Standard List Toggle
    await promotionService.togglePromotion(promo.id)
    await loadPromotions()
  } catch (error: any) {
    console.error('Toggle error:', error)
    alert('Failed to toggle status.')
  }
}

const handleDelete = async (id: string) => {
  if (!confirm('Delete this promotion?')) return
  try {
    await promotionService.deletePromotion(id)
    await loadPromotions()
  } catch (error) {
    console.error('Delete error:', error)
    alert('Failed to delete.')
  }
}

// --- Modal Logic ---
const openCreateModal = () => {
  selectedPromo.value = null
  isModalOpen.value = true
}

const openEditModal = (promo: any) => {
  selectedPromo.value = { ...promo }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedPromo.value = null
}

// --- Init ---
onMounted(() => {
  loadPromotions()
})
</script>
