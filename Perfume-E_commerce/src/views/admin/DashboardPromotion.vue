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
      @delete="deletePromo"
    />

    <PromotionTable 
      title="Past Promotions (Expired or Inactive)" 
      :promotions="pastPromotions"
      @toggle-status="handleToggleStatus"
      @edit="openEditModal"
      @delete="deletePromo"
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

// --- Computed Logic ---
const activePromotions = computed(() => {
  const now = new Date().getTime();
  return promotions.value.filter(p => {
    const expiry = new Date(p.validUntil).getTime();
    // Must be marked active AND date must be in the future
    return p.active === true && expiry >= now;
  });
});

const pastPromotions = computed(() => {
  const now = new Date().getTime();
  return promotions.value.filter(p => {
    const expiry = new Date(p.validUntil).getTime();
    // Move to past if manually deactivated OR date has passed
    return p.active === false || expiry < now;
  });
});

// --- Actions ---
const loadPromotions = async () => {
  try {
    const response = await promotionService.getAllPromotions();
    // Backend returns Page object with 'content' array
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
  selectedPromo.value = { ...promo }; 
  isModalOpen.value = true;
};

const handleSave = async (formData: any) => {
  isSaving.value = true;
  try {
    const payload = {
      code: formData.code,
      description: formData.description,
      discountPercent: formData.discountPercent,
      validUntil: formData.validUntil,
      active: formData.active
    };

    if (selectedPromo.value) {
      await promotionService.updatePromotion(selectedPromo.value.id, payload);
    } else {
      await promotionService.createPromotion(payload);
    }
    
    await loadPromotions(); 
    isModalOpen.value = false;
  } catch (error) {
    console.error("Save failed", error);
    alert("Failed to save promotion");
  } finally {
    isSaving.value = false;
  }
};

const handleToggleStatus = async (promo: Promotion) => {
  const now = new Date().getTime();
  const expiry = new Date(promo.validUntil).getTime();
  const isExpired = expiry < now;

  // UX Rule: Re-activate expired codes by editing date instead of just toggling
  if (isExpired && !promo.active) {
    if (confirm(`This promotion expired on ${new Date(promo.validUntil).toLocaleDateString()}. \n\nDo you want to EDIT the date to reactivate it?`)) {
      openEditModal(promo); 
      return;
    }
    return; 
  }

  try {
    // Send the current object with flipped active status
    const updatedPayload = { ...promo, active: !promo.active };
    await promotionService.updatePromotion(promo.id, updatedPayload);
    
    alert("Status updated successfully");
    await loadPromotions(); 
  } catch (error: any) {
    console.error("Toggle failed", error);
    alert(`Failed to update status: ${error.response?.data?.message || 'Server Error'}`);
  }
};

const deletePromo = async (id: string) => {
  if (!confirm("Are you sure you want to PERMANENTLY delete this coupon?")) return;
  
  try {
    await promotionService.deletePromotion(id);
    // Remove from local state for immediate feedback
    promotions.value = promotions.value.filter(p => p.id !== id);
    alert("Promotion deleted successfully");
  } catch (error: any) {
    console.error("Delete failed", error);
    // If backend returns 400/500 due to foreign key constraints
    const errorMsg = error.response?.data?.message || "This code is linked to existing order history and cannot be deleted.";
    alert(`Delete failed: ${errorMsg}`);
  }
};

onMounted(() => {
  loadPromotions();
});
</script>






