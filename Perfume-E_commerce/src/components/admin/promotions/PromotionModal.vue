<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
      
      <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="text-lg font-bold text-gray-900">
          {{ isEditing ? 'Edit Promotion' : 'Create New Promotion' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Promo Code
            <span class="text-red-500 ml-1">*</span>
          </label>
          <input 
            v-model="formData.code"
            type="text" 
            required
            :disabled="isEditing"
            :class="[
              'w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none placeholder-gray-400',
              codeError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500',
              isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            ]"
            placeholder="e.g. HOLIDAY15"
            @input="validateCode"
          />
          <p class="text-xs text-gray-400 mt-1">
            Unique code customers will enter at checkout. Letters and numbers only.
          </p>
          <p v-if="codeError" class="text-xs text-red-500 mt-1">{{ codeError }}</p>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Description
            <span class="text-red-500 ml-1">*</span>
          </label>
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
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Discount (%)
              <span class="text-red-500 ml-1">*</span>
            </label>
            <div class="relative">
              <input 
                v-model.number="formData.discountPercentage"
                type="number" 
                min="1" 
                max="100"
                required
                :class="[
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none pr-8',
                  formData.discountPercentage > 100 || formData.discountPercentage < 1 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-200 focus:ring-indigo-500'
                ]"
              />
              <span class="absolute right-3 top-2 text-gray-400 font-bold">%</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Between 1-100%</p>
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Expiry Date
              <span class="text-red-500 ml-1">*</span>
            </label>
            <input 
              v-model="formData.validUntil"
              type="date" 
              required
              :class="[
                'w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none',
                isDateInPast ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'
              ]"
              :min="minDate"
            />
            <p v-if="isDateInPast" class="text-xs text-red-500 mt-1">Date must be in the future</p>
          </div>
        </div>

        <div v-if="isEditing" class="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span class="text-sm font-medium text-gray-700">Promotion Status</span>
          <div class="flex items-center gap-2">
            <span :class="formData.active ? 'text-green-600' : 'text-gray-500'" class="text-sm font-medium">
              {{ formData.active ? 'Active' : 'Inactive' }}
            </span>
            <button 
              type="button"
              @click="formData.active = !formData.active"
              :class="formData.active ? 'bg-green-500' : 'bg-gray-300'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <span 
                :class="formData.active ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
        </div>

        <div v-else class="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-100">
          <span class="text-sm font-medium text-green-800">This promotion will be active immediately</span>
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>

        <div class="pt-4 flex justify-end gap-3">
          <button 
            type="button" 
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition border border-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="isLoading || !isFormValid"
            :class="[
              'px-6 py-2 text-white text-sm font-medium rounded-lg transition shadow-sm flex items-center',
              !isFormValid || isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            ]"
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
import { ref, watch, computed } from 'vue';

const props = defineProps<{
  isOpen: boolean,
  isLoading: boolean,
  editData: any | null
}>();

const emit = defineEmits(['close', 'save']);

const isEditing = ref(false);
const codeError = ref<string>('');

// ✅ FIX: Use 'discountPercentage' in state
const formData = ref({
  code: '',
  description: '',
  discountPercentage: 10, 
  validUntil: '',
  active: true
});

// Computed properties
const minDate = computed(() => {
  return new Date().toISOString().split('T')[0];
});

const isDateInPast = computed(() => {
  if (!formData.value.validUntil) return false;
  const selectedDate = new Date(formData.value.validUntil);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate < today;
});

const isFormValid = computed(() => {
  return (
    formData.value.code.trim() !== '' &&
    formData.value.description.trim() !== '' &&
    formData.value.discountPercentage >= 1 &&
    formData.value.discountPercentage <= 100 &&
    formData.value.validUntil !== '' &&
    !isDateInPast.value &&
    !codeError.value
  );
});

// Validation
const validateCode = () => {
  const code = formData.value.code.trim();
  if (!code) {
    codeError.value = '';
    return;
  }

  const alphanumericRegex = /^[A-Za-z0-9]+$/;
  if (!alphanumericRegex.test(code)) {
    codeError.value = 'Promo code must contain only letters and numbers';
    return;
  }

  if (code.length < 4) {
    codeError.value = 'Promo code must be at least 4 characters';
    return;
  }

  if (code.length > 20) {
    codeError.value = 'Promo code cannot exceed 20 characters';
    return;
  }

  codeError.value = '';
};

/**
 * Watch for modal opening
 */
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.editData) {
      isEditing.value = true;
      // ✅ FIX: Populate discountPercentage correctly from edit data
      // Handles both potential field names for robustness
      const discount = props.editData.discountPercentage || props.editData.discountPercent || 10;
      
      formData.value = { 
        ...props.editData,
        discountPercentage: discount,
        validUntil: props.editData.validUntil ? new Date(props.editData.validUntil).toISOString().split('T')[0] : '',
        active: props.editData.active !== undefined ? props.editData.active : true
      };
    } else {
      isEditing.value = false;
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      
      formData.value = {
        code: '',
        description: '',
        discountPercentage: 10,
        validUntil: nextMonth.toISOString().split('T')[0],
        active: true
      };
    }
    codeError.value = '';
  }
});

const handleSubmit = () => {
  if (!isFormValid.value) return;
  
  // ✅ FIX: Construct correct payload with 'discountPercentage'
  const payload = {
    ...formData.value,
    code: formData.value.code.toUpperCase().trim(),
    discountPercentage: Number(formData.value.discountPercentage),
    validUntil: new Date(formData.value.validUntil).toISOString()
  };
  
  emit('save', payload);
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