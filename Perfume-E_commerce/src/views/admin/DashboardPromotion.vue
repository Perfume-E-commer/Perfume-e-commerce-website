
<template>
  <div class="p-6 space-y-8 min-h-screen bg-gray-50/50">
    
    <!-- Header Section -->
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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Create New Promotion
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>

    <!-- Content when loaded -->
    <div v-else>
      <!-- Statistics Summary -->
      <div v-if="promotions.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Promotions</p>
              <p class="text-2xl font-bold text-gray-800 mt-1">{{ promotions.length }}</p>
            </div>
            <div class="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Active Promotions</p>
              <p class="text-2xl font-bold text-green-600 mt-1">{{ activePromotions.length }}</p>
            </div>
            <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Past Promotions</p>
              <p class="text-2xl font-bold text-amber-600 mt-1">{{ pastPromotions.length }}</p>
            </div>
            <div class="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Promotions Section -->
      <PromotionTable 
        v-if="activePromotions.length > 0"
        title="Active Promotions" 
        :promotions="activePromotions"
        @toggle-status="handleToggleStatus"
        @edit="openEditModal"
        @delete="deletePromo"
      />

      <!-- Past Promotions Section -->
      <PromotionTable 
        v-if="pastPromotions.length > 0"
        title="Past Promotions (Expired or Inactive)" 
        :promotions="pastPromotions"
        @toggle-status="handleToggleStatus"
        @edit="openEditModal"
        @delete="deletePromo"
      />

      <!-- No Promotions Message -->
      <div v-if="promotions.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">No promotions yet</h3>
        <p class="text-gray-500 mb-4">Create your first promotional code to offer discounts to customers</p>
        <button 
          @click="openCreateModal" 
          class="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition inline-flex items-center shadow-sm font-medium"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Create Your First Promotion
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <PromotionModal 
      :is-open="isModalOpen" 
      :is-loading="isSaving" 
      :edit-data="selectedPromo"
      @close="closeModal" 
      @save="handleSave"
    />

    <!-- Toast Notification -->
    <div v-if="toast.show" :class="[
        'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg border transform transition-all duration-300 z-50',
        toast.type === 'success' 
          ? 'bg-green-50 text-green-800 border-green-200'
          : 'bg-red-50 text-red-800 border-red-200'
      ]">
      <div class="flex items-center gap-3">
        <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <span class="font-medium">{{ toast.message }}</span>
        <button @click="toast.show = false" class="ml-4 text-gray-400 hover:text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PromotionTable from '../../components/admin/promotions/PromotionTable.vue';
import PromotionModal from '../../components/admin/promotions/PromotionModal.vue';
import promotionService from '../../services/promotionService';

interface Promotion {
  id: string;
  code: string;
  description: string;
  discountPercent: number;
  validUntil: string;
  active: boolean;
  createdAt?: string;
}

// Reactive state
const promotions = ref<Promotion[]>([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const isSaving = ref(false);
const selectedPromo = ref<Promotion | null>(null);

// Toast notifications
const toast = ref({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
});

// Show toast message
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

// --- Computed Logic ---
const activePromotions = computed(() => {
  const now = new Date().getTime();
  return promotions.value.filter(p => {
    const expiry = new Date(p.validUntil).getTime();
    // Active if: active=true AND not expired
    return p.active === true && expiry >= now;
  });
});

const pastPromotions = computed(() => {
  const now = new Date().getTime();
  return promotions.value.filter(p => {
    const expiry = new Date(p.validUntil).getTime();
    // Past if: either expired OR inactive (regardless of date)
    return expiry < now || p.active === false;
  });
});

// --- Actions ---
const loadPromotions = async () => {
  isLoading.value = true;
  try {
    const response = await promotionService.getAllPromotions({ page: 0, size: 100, search: '' });
    // Handle both Page object with 'content' or direct array
    promotions.value = response.data.content || response.data || [];
  } catch (error: any) {
    console.error("Failed to fetch promotions", error);
    showToast(error.response?.data?.message || 'Failed to load promotions', 'error');
  } finally {
    isLoading.value = false;
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

const closeModal = () => {
  isModalOpen.value = false;
  selectedPromo.value = null;
};

const handleSave = async (formData: any) => {
  isSaving.value = true;
  try {
    const payload = {
      code: formData.code,
      description: formData.description,
      discountPercent: formData.discountPercent,
      validUntil: formData.validUntil,
      active: formData.active !== undefined ? formData.active : true
    };

    if (selectedPromo.value) {
      await promotionService.updatePromotion(selectedPromo.value.id, payload);
      showToast('Promotion updated successfully!');
    } else {
      await promotionService.createPromotion(payload);
      showToast('Promotion created successfully!');
    }
    
    await loadPromotions();
    closeModal();
  } catch (error: any) {
    console.error("Save failed", error);
    showToast(
      error.response?.data?.message || error.response?.data || 'Failed to save promotion',
      'error'
    );
  } finally {
    isSaving.value = false;
  }
};

const handleToggleStatus = async (promo: Promotion) => {
  const now = new Date().getTime();
  const expiry = new Date(promo.validUntil).getTime();
  const isExpired = expiry < now;
  const newActiveStatus = !promo.active;

  // Special handling for expired promotions
  if (isExpired && !promo.active) {
    if (confirm(`This promotion expired on ${new Date(promo.validUntil).toLocaleDateString()}. \n\nDo you want to EDIT the date to reactivate it?`)) {
      openEditModal(promo);
      return;
    }
    return;
  }

  try {
    // OPTIMISTIC UPDATE: Update local state immediately for better UX
    promotions.value = promotions.value.map(p => 
      p.id === promo.id ? { ...p, active: newActiveStatus } : p
    );

    // Send minimal payload to backend - only the active field
    await promotionService.updatePromotion(promo.id, { active: newActiveStatus });
    
    showToast(`Promotion ${newActiveStatus ? 'activated' : 'deactivated'} successfully!`);
    
  } catch (error: any) {
    // ROLLBACK: Revert local state on error
    promotions.value = promotions.value.map(p => 
      p.id === promo.id ? { ...p, active: promo.active } : p
    );
    
    console.error("Toggle failed", error);
    showToast(
      error.response?.data?.message || 'Failed to update promotion status',
      'error'
    );
  }
};

const deletePromo = async (id: string) => {
  if (!confirm("Are you sure you want to permanently delete this promotion? This action cannot be undone.")) return;
  
  try {
    // OPTIMISTIC UPDATE: Remove from local state immediately
    const promoToDelete = promotions.value.find(p => p.id === id);
    promotions.value = promotions.value.filter(p => p.id !== id);
    
    await promotionService.deletePromotion(id);
    
    showToast('Promotion deleted successfully!');
  } catch (error: any) {
    // ROLLBACK: Add back if deletion failed
    if (promoToDelete) {
      promotions.value.push(promoToDelete);
    }
    
    console.error("Delete failed", error);
    showToast(
      error.response?.data?.message || 'Failed to delete promotion. It might be linked to existing orders.',
      'error'
    );
  }
};

onMounted(() => {
  loadPromotions();
});
</script>