<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
      
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="text-lg font-bold text-gray-900">
          {{ isEditing ? 'Edit Promotion' : 'Create New Promotion' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Promo Code</label>
          <input 
            v-model="formData.code"
            type="text" 
            required
            :disabled="isEditing"
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-mono placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-500"
            placeholder="e.g. HOLIDAY15"
          />
          <p class="text-xs text-gray-400 mt-1">Unique code customers will enter at checkout.</p>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
          <input 
            v-model="formData.description"
            type="text" 
            required
            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="e.g. 15% off Holiday Special"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Discount (%)</label>
            <div class="relative">
              <input 
                v-model.number="formData.discountPercent"
                type="number" 
                min="1" 
                max="100"
                required
                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none pr-8"
              />
              <span class="absolute right-3 top-2 text-gray-400 font-bold">%</span>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Expiry Date</label>
            <input 
              v-model="formData.validUntil"
              type="date" 
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div v-if="isEditing" class="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span class="text-sm font-medium text-gray-700">Promotion Status</span>
          <button 
            type="button"
            @click="formData.isActive = !formData.isActive"
            :class="formData.isActive ? 'bg-green-500' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          >
            <span 
              :class="formData.isActive ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </button>
        </div>

        <div class="pt-4 flex justify-end gap-3">
          <button 
            type="button" 
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="isLoading"
            class="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 flex items-center"
          >
            <span v-if="isLoading" class="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
            {{ isEditing ? 'Update Promotion' : 'Create Promotion' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean,
  isLoading: boolean,
  editData: any | null
}>();

const emit = defineEmits(['close', 'save']);

const isEditing = ref(false);
const formData = ref({
  code: '',
  description: '',
  discountPercent: 10,
  validUntil: '',
  isActive: true
});

// Watch for modal opening to populate data
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.editData) {
      isEditing.value = true;
      // Clone data to avoid direct mutation
      formData.value = { 
        ...props.editData,
        // Format date for input:date (YYYY-MM-DD)
        validUntil: props.editData.validUntil ? new Date(props.editData.validUntil).toISOString().split('T')[0] : ''
      };
    } else {
      isEditing.value = false;
      // Default state for new promo
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      
      formData.value = {
        code: '',
        description: '',
        discountPercent: 10,
        validUntil: nextMonth.toISOString().split('T')[0],
        isActive: true
      };
    }
  }
});

const handleSubmit = () => {
  emit('save', { ...formData.value });
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>