<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 animate-fade-in">
    
    <div class="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <h3 class="font-bold text-gray-800">{{ title }}</h3>
        <span class="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold shadow-sm">
          {{ promotions.length }}
        </span>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs">
          <tr>
            <th class="px-6 py-3">Promo Code</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3 text-center">Discount</th>
            <th class="px-6 py-3">Expiry Date</th>
            <th class="px-6 py-3 text-center">Status</th>
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          
          <tr v-if="promotions.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-gray-400 italic">
              No promotions found in this section.
            </td>
          </tr>

          <tr v-for="promo in promotions" :key="promo.id" class="hover:bg-gray-50 transition group">
            
            <td class="px-6 py-4">
              <span class="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded text-xs select-all">
                {{ promo.code }}
              </span>
            </td>

            <td class="px-6 py-4 text-gray-600 font-medium">
              {{ promo.description }}
            </td>

            <td class="px-6 py-4 text-center">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {{ promo.discountPercent }}% OFF
              </span>
            </td>

            <td class="px-6 py-4">
              <div :class="isExpired(promo.validUntil) ? 'text-red-600' : 'text-gray-600'">
                <span class="font-medium">{{ formatDate(promo.validUntil) }}</span>
                <span v-if="isExpired(promo.validUntil)" class="block text-[10px] font-bold uppercase tracking-wide mt-0.5">
                  Expired
                </span>
              </div>
            </td>

            <td class="px-6 py-4 text-center">
              <button 
                @click="$emit('toggle-status', promo)"
                :class="[
                  'px-3 py-1 rounded-full text-xs font-bold border transition-all duration-200',
                  promo.active 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                    : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                ]"
              >
                {{ promo.active ? 'Active' : 'Inactive' }}
              </button>
            </td>

            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  @click="$emit('edit', promo)"
                  class="text-indigo-600 hover:text-indigo-900 text-xs font-bold bg-white border border-gray-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition shadow-sm"
                >
                  Edit
                </button>
                <button 
                  @click="$emit('delete', promo.id)"
                  class="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1.5 rounded hover:bg-red-50 transition"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string,
  promotions: any[]
}>();

defineEmits(['toggle-status', 'edit', 'delete']);

// Helpers for presentation logic
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const isExpired = (dateStr: string) => {
  if (!dateStr) return false;
  const expiry = new Date(dateStr).setHours(23, 59, 59, 999);
  const now = new Date().getTime();
  return now > expiry;
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>