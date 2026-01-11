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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Create New Promotion
      </button>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Campaigns</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ activePromotions.length }}</p>
          </div>
          <div class="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Promos</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ promotions.length }}</p>
          </div>
          <div class="p-3 bg-blue-50 rounded-lg text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
      </div>

      <PromotionTable 
        title="Active Campaigns"
        :promotions="activePromotions"
        @toggle-status="toggleStatus"
        @edit="openEditModal"
        @delete="deletePromo"
      />

      <PromotionTable 
        v-if="inactivePromotions.length > 0"
        title="Past & Inactive Promotions"
        :promotions="inactivePromotions"
        @toggle-status="toggleStatus"
        @edit="openEditModal"
        @delete="deletePromo"
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
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'vue-toastification'; 
import PromotionTable from '../../components/admin/promotions/PromotionTable.vue';
import PromotionModal from '../../components/admin/promotions/PromotionModal.vue';
import promotionService from '../../services/promotionService';

// State
const promotions = ref<any[]>([]);
const isLoading = ref(true);
const isSaving = ref(false);
const isModalOpen = ref(false);
const selectedPromo = ref<any | null>(null);

const toast = useToast();

// Computed
const activePromotions = computed(() => {
  if (!Array.isArray(promotions.value)) return []; 
  
  const now = new Date();
  return promotions.value.filter(p => {
    if (!p.validUntil) return false;
    const expiry = new Date(p.validUntil);
    expiry.setHours(23, 59, 59, 999);
    return p.active && expiry >= now;
  });
});

const inactivePromotions = computed(() => {
  if (!Array.isArray(promotions.value)) return []; // Prevent crash

  const now = new Date();
  return promotions.value.filter(p => {
    if (!p.validUntil) return true; 
    const expiry = new Date(p.validUntil);
    expiry.setHours(23, 59, 59, 999);
    return !p.active || expiry < now;
  });
});

// Methods
const fetchPromotions = async () => {
  isLoading.value = true;
  try {
    const response = await promotionService.getAllPromotions({ page: 0, size: 100, search: '' });
    
    console.log("📢 Raw API Response:", response);

    let dataToUse = [];

    if (Array.isArray(response)) {
      dataToUse = response;
    } 
    else if (Array.isArray(response.data)) {
      dataToUse = response.data;
    }
    else if (response.data && Array.isArray(response.data.content)) {
      dataToUse = response.data.content;
    }
    else if (response.result && Array.isArray(response.result)) {
      dataToUse = response.result;
    }
    else if (response.data && Array.isArray(response.data.data)) {
      dataToUse = response.data.data;
    }

    console.log("✅ Final Promotions Array:", dataToUse);
    promotions.value = dataToUse;

  } catch (error: any) {
    console.error("Failed to fetch promotions", error);
    showToast(error.response?.data?.message || 'Failed to load promotions', 'error');
    promotions.value = [];
  } finally {
    isLoading.value = false;
  }
};

const openCreateModal = () => {
  selectedPromo.value = null;
  isModalOpen.value = true;
};

const openEditModal = (promo: any) => {
  selectedPromo.value = { ...promo };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedPromo.value = null;
};

// ✅ FIX: Save Handler using correct payload from Modal
const handleSave = async (payload: any) => {
  isSaving.value = true;
  try {
    if (selectedPromo.value) {
      // UPDATE Existing
      const updatedPromo = await promotionService.updatePromotion(selectedPromo.value.id, payload);
      
      // Update local state immediately
      const index = promotions.value.findIndex(p => p.id === selectedPromo.value.id);
      if (index !== -1) {
        promotions.value[index] = updatedPromo;
      }
      toast.success("Promotion updated successfully!");
    } else {
      // CREATE New
      const newPromo = await promotionService.createPromotion(payload);
      
      // Add to local state immediately
      promotions.value.unshift(newPromo);
      toast.success("Promotion created successfully!");
    }
    closeModal();
  } catch (error: any) {
    console.error("Save failed", error);
    const msg = error.response?.data?.message || "Failed to save promotion";
    toast.error(msg);
  } finally {
    isSaving.value = false;
  }
};

const toggleStatus = async (promo: any) => {
  try {
    const newActiveStatus = !promo.active;
    
    // OPTIMISTIC UPDATE: Update UI immediately
    promotions.value = promotions.value.map(p => 
      p.id === promo.id ? { ...p, active: newActiveStatus } : p
    );

    // Send only the active field if your API supports partial updates, 
    // otherwise verify what your service expects.
    await promotionService.updatePromotion(promo.id, { active: newActiveStatus });
    
    toast.success(`Promotion ${newActiveStatus ? 'activated' : 'deactivated'} successfully!`);
    
  } catch (error: any) {
    // ROLLBACK on error
    promotions.value = promotions.value.map(p => 
      p.id === promo.id ? { ...p, active: promo.active } : p
    );
    console.error("Toggle failed", error);
    toast.error("Failed to update status");
  }
};

const deletePromo = async (id: string) => {
  if (!confirm("Are you sure you want to delete this promotion?")) return;
  
  // Store deleted item for rollback
  const promoToDelete = promotions.value.find(p => p.id === id);
  
  try {
    // OPTIMISTIC UPDATE
    promotions.value = promotions.value.filter(p => p.id !== id);
    
    await promotionService.deletePromotion(id);
    
    toast.success("Promotion deleted successfully!");
  } catch (error: any) {
    // ROLLBACK
    if (promoToDelete) {
      promotions.value.push(promoToDelete);
    }
    console.error("Delete failed", error);
    toast.error("Failed to delete promotion");
  }
};

// Init
onMounted(() => {
  fetchPromotions();
});
</script>

<style scoped>
/* Transitions for lists */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>