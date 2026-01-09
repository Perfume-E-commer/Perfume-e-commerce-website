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
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Create New Promotion
      </button>
    </div>

    <PromotionTable 
      title="Active Promotions (Upcoming)" 
      :promotions="activePromotions"
      @toggle-status="handleToggleStatus"
      @edit="openEditModal"
      @delete="handleDelete"
    />

    <PromotionTable 
      title="Past Promotions (Expired or Inactive)" 
      :promotions="pastPromotions"
      @toggle-status="handleToggleStatus"
      @edit="openEditModal"
      @delete="handleDelete"
    />

    <PromotionModal 
      :is-open="isModalOpen" 
      :is-loading="isSaving" 
      :edit-data="selectedPromo"
      @close="isModalOpen = false" 
      @save="handleSave"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PromotionTable from '@/components/admin/promotions/PromotionTable.vue';
import PromotionModal from '@/components/admin/promotions/PromotionModal.vue';

// --- Types ---
interface Promotion {
  id: string;
  code: string;
  description: string;
  discountPercent: number;
  validUntil: string; // ISO Date String
  isActive: boolean;
}

// --- State ---
const promotions = ref<Promotion[]>([]);
const isModalOpen = ref(false);
const isSaving = ref(false);
const selectedPromo = ref<Promotion | null>(null);

// --- Computed Lists ---
const activePromotions = computed(() => {
  const now = new Date().getTime();
  return promotions.value.filter(p => {
    const expiry = new Date(p.validUntil).setHours(23, 59, 59, 999);
    return p.isActive && expiry >= now;
  });
});

const pastPromotions = computed(() => {
  const now = new Date().getTime();
  return promotions.value.filter(p => {
    const expiry = new Date(p.validUntil).setHours(23, 59, 59, 999);
    return !p.isActive || expiry < now;
  });
});

// --- Actions ---

const loadPromotions = async () => {
  // TODO: Replace with real API call
  // await promotionService.getAll()
  
  // Mock Data for Demo
  if (promotions.value.length === 0) {
    promotions.value = [
      { id: '1', code: 'HOLIDAY15', description: 'Holiday Special', discountPercent: 15, validUntil: '2025-12-31', isActive: true },
      { id: '2', code: 'SUMMER20', description: 'Summer Sale', discountPercent: 20, validUntil: '2026-06-30', isActive: true },
      { id: '3', code: 'WELCOME5', description: 'New User Bonus', discountPercent: 5, validUntil: '2024-11-10', isActive: false }, // Past
      { id: '4', code: 'FLASH50', description: 'Flash Sale', discountPercent: 50, validUntil: '2023-01-01', isActive: true } // Expired
    ];
  }
};

const openCreateModal = () => {
  selectedPromo.value = null;
  isModalOpen.value = true;
};

const openEditModal = (promo: Promotion) => {
  selectedPromo.value = promo;
  isModalOpen.value = true;
};

const handleSave = async (formData: any) => {
  isSaving.value = true;
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (selectedPromo.value) {
    // Update existing
    const index = promotions.value.findIndex(p => p.id === selectedPromo.value?.id);
    if (index !== -1) {
      promotions.value[index] = { ...selectedPromo.value, ...formData };
    }
  } else {
    // Create new
    const newPromo = {
      id: Date.now().toString(),
      ...formData
    };
    promotions.value.push(newPromo);
  }

  isSaving.value = false;
  isModalOpen.value = false;
};

const handleToggleStatus = (promo: Promotion) => {
  // Optimistic update
  const index = promotions.value.findIndex(p => p.id === promo.id);
  if (index !== -1) {
    promotions.value[index].isActive = !promotions.value[index].isActive;
  }
  // TODO: Call API to persist
};

const handleDelete = (promo: Promotion) => {
  if (confirm(`Delete promotion ${promo.code}?`)) {
    promotions.value = promotions.value.filter(p => p.id !== promo.id);
    // TODO: Call API
  }
};

onMounted(() => {
  loadPromotions();
});
</script>