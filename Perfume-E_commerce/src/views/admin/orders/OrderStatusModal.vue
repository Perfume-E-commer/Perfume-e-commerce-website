<template>
  <div v-if="isOpen && order" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in">
      <div class="p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Update Order Status</h3>
        <p class="text-sm text-gray-600 mb-4">
          Order #{{ order.id.slice(-6).toUpperCase() }} is currently 
          <span class="font-bold">{{ order.status }}</span>.
        </p>
        
        <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">New Status</label>
        <select 
          v-model="internalStatus" 
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none mb-6"
        >
          <option disabled value="">Select Status</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SHIPPED">Shipped (Notify User)</option>
          <option value="DELIVERED">Delivered (Notify User)</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <div class="flex gap-3 justify-end">
            <button @click="$emit('close')" class="px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg">Cancel</button>
            <button 
              @click="handleUpdate" 
              :disabled="!internalStatus || internalStatus === order.status || isUpdating"
              class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
            >
              <span v-if="isUpdating" class="animate-spin h-3 w-3 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
              Update Status
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  order: any,
  isOpen: boolean,
  isUpdating: boolean
}>()

const emit = defineEmits(['close', 'confirm'])

const internalStatus = ref('')

// Reset status when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal && props.order) {
    internalStatus.value = props.order.status
  }
})

const handleUpdate = () => {
  emit('confirm', internalStatus.value)
}
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