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

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
        
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Promo Code <span class="text-red-500">*</span>
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
          <p v-if="codeError" class="text-xs text-red-500 mt-1">{{ codeError }}</p>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Description <span class="text-red-500">*</span>
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
              Discount (%) <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input 
                v-model.number="formData.discountPercentage"
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
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Usage Limit
            </label>
            <input 
              v-model.number="formData.usageLimit"
              type="number" 
              min="1"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Unlimited"
            />
            <p class="text-[10px] text-gray-400 mt-1">Leave empty for unlimited</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Valid From <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.validFrom"
              type="date" 
              required
              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Valid Until <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="formData.validUntil"
              type="date" 
              required
              :min="formData.validFrom"
              :class="[
                'w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none',
                isDateInvalid ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-indigo-500'
              ]"
            />
          </div>
        </div>
        <p v-if="isDateInvalid" class="text-xs text-red-500">End date must be after start date</p>

        <div v-if="isEditing" class="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
          <span class="text-sm font-medium text-gray-700">Active Status</span>
          <button 
            type="button"
            @click="formData.active = !formData.active"
            :class="formData.active ? 'bg-green-500' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
          >
            <span 
              :class="formData.active ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </button>
        </div>

        <div class="pt-4 flex justify-end gap-3">
          <button 
            type="button" 
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="isLoading || !isFormValid"
            :class="[
              'px-6 py-2 text-white text-sm font-medium rounded-lg shadow-sm flex items-center',
              !isFormValid || isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            ]"
          >
            <span v-if="isLoading" class="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
            {{ isEditing ? 'Update' : 'Create' }}
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

// ✅ FIX: Added validFrom and usageLimit to state
const formData = ref({
  code: '',
  description: '',
  discountPercentage: 10, 
  validFrom: '',  // New
  validUntil: '',
  usageLimit: null as number | null, // New
  active: true
});

const isDateInvalid = computed(() => {
  if (!formData.value.validFrom || !formData.value.validUntil) return false;
  return new Date(formData.value.validUntil) < new Date(formData.value.validFrom);
});

const isFormValid = computed(() => {
  return (
    formData.value.code.trim() !== '' &&
    formData.value.description.trim() !== '' &&
    formData.value.discountPercentage >= 1 &&
    formData.value.discountPercentage <= 100 &&
    formData.value.validFrom !== '' &&
    formData.value.validUntil !== '' &&
    !isDateInvalid.value &&
    !codeError.value
  );
});

const validateCode = () => {
  const code = formData.value.code.trim();
  if (!code) { codeError.value = ''; return; }
  
  const alphanumericRegex = /^[A-Za-z0-9]+$/;
  if (!alphanumericRegex.test(code)) {
    codeError.value = 'Letters and numbers only';
    return;
  }
  if (code.length < 4 || code.length > 20) {
    codeError.value = '4-20 characters required';
    return;
  }
  codeError.value = '';
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.editData) {
      isEditing.value = true;
      // Handle potential field name mismatches
      const discount = props.editData.discountPercentage || props.editData.discountPercent || 10;
      
      formData.value = { 
        ...props.editData,
        discountPercentage: discount,
        validFrom: props.editData.validFrom ? new Date(props.editData.validFrom).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        validUntil: props.editData.validUntil ? new Date(props.editData.validUntil).toISOString().split('T')[0] : '',
        usageLimit: props.editData.usageLimit || null,
        active: props.editData.active !== undefined ? props.editData.active : true
      };
    } else {
      isEditing.value = false;
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 30);
      
      formData.value = {
        code: '',
        description: '',
        discountPercentage: 10,
        validFrom: today.toISOString().split('T')[0], // Default to Today
        validUntil: nextMonth.toISOString().split('T')[0],
        usageLimit: null,
        active: true
      };
    }
    codeError.value = '';
  }
});

const handleSubmit = () => {
  if (!isFormValid.value) return;
  
  const payload = {
    ...formData.value,
    code: formData.value.code.toUpperCase().trim(),
    discountPercentage: Number(formData.value.discountPercentage),
    usageLimit: formData.value.usageLimit ? Number(formData.value.usageLimit) : null,
    validFrom: new Date(formData.value.validFrom).toISOString(),
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