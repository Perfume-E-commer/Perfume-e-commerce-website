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
import PromotionTable from '../components/promotions/PromotionTable.vue';
import PromotionModal from '../components/promotions/PromotionModal.vue';
import promotionService from '../../services/promotionService';

interface Promotion {
  id: string;
  code: string;
  description: string;
  discountPercent: number;
  validUntil: string;
  active: boolean;   
}

const promotions = ref<Promotion[]>([]);
const isModalOpen = ref(false);
const isSaving = ref(false);
const selectedPromo = ref<Promotion | null>(null);


const activePromotions = computed(() => {
  const now = new Date().getTime();
  return promotions.value.filter(p => {
    const expiry = new Date(p.validUntil).getTime();
    return p.active === true && expiry >= now;
  });
});

const pastPromotions = computed(() => {
  const now = new Date().getTime();
  return promotions.value.filter(p => {
    const expiry = new Date(p.validUntil).getTime();
    return p.active === false || expiry < now;
  });
});


const loadPromotions = async () => {
  try {
    const response = await promotionService.getAllPromotions();
    promotions.value = response.data.content || response.data || [];
    
  } catch (error) {
    console.error("Failed to fetch promotions", error);
  }
};

const openCreateModal = () => {
  selectedPromo.value = null;
  isModalOpen.value = true;
};

const openEditModal = (promo: Promotion) => {
  selectedPromo.value = { ...promo, isActive: promo.active }; 
  isModalOpen.value = true;
};

const handleSave = async (formData: any) => {
  isSaving.value = true;
  try {
    const payload = {
      ...formData,
      active: formData.isActive
    };
    delete payload.isActive;

    if (selectedPromo.value) {
      await promotionService.updatePromotion(selectedPromo.value.id, payload);
    } else {
      await promotionService.createPromotion(payload);
    }
    
    await loadPromotions(); // Reload from server
    isModalOpen.value = false;
  } catch (error) {
    console.error("Save failed", error);
    alert("Failed to save promotion");
  } finally {
    isSaving.value = false;
  }
};

const handleToggleStatus = async (promo: Promotion) => {
  try {
    promo.active = !promo.active;
    
    // API Call
    // If your backend doesn't have a specific toggle endpoint, use update:
    await promotionService.updatePromotion(promo.id, {
      ...promo,
      active: promo.active
    });
    
    // Reload to ensure list sorting (Active vs Past) updates correctly
    await loadPromotions(); 
  } catch (error) {
    // Revert on failure
    promo.active = !promo.active;
    console.error("Failed to toggle status", error);
    alert("Failed to update status");
  }
};

const handleDelete = async (promo: Promotion) => {
  if (!confirm(`Are you sure you want to delete ${promo.code}?`)) return;
  
  try {
    await promotionService.deletePromotion(promo.id);
    promotions.value = promotions.value.filter(p => p.id !== promo.id);
  } catch (error) {
    console.error("Delete failed", error);
    alert("Failed to delete promotion");
  }
};

onMounted(() => {
  loadPromotions();
});
</script>