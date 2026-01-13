<template>
  <div class="p-8 animate-fade-in-up" style="animation-delay: 0.2s;">
    
    <div class="flex justify-between items-center mb-8 border-b border-gray-50 pb-6">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-[#280559]/5 text-[#280559] flex items-center justify-center text-lg font-bold">
          03
        </div>
        <div>
          <h3 class="text-xl font-serif font-bold text-gray-900">Payment Methods</h3>
          <p class="text-gray-400 text-sm mt-1">Securely manage your credit cards</p>
        </div>
      </div>
      <button v-if="!showForm" @click="showForm = true" class="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-50 text-[#280559] font-bold text-sm hover:bg-[#280559] hover:text-white transition-all duration-300">
        <svg class="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg> Add New
      </button>
    </div>

    <div class="transition-all duration-300">
      <div v-if="!showForm" class="space-y-4">
        <div v-for="(card, index) in creditCards" :key="index" class="group relative p-6 border border-gray-100 rounded-2xl bg-white hover:border-[#280559] hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 flex items-center justify-between">
          <div class="flex items-center gap-5">
            <div class="w-16 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-sm flex items-center justify-center text-white/90 relative overflow-hidden">
               <div class="absolute -top-4 -left-4 w-10 h-10 bg-white/10 rounded-full blur-md"></div>
               <svg class="w-6 h-6 opacity-80 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
            </div>
            <div>
               <p class="font-bold text-gray-900 text-base font-mono tracking-widest">•••• •••• •••• {{ card.cardNumber.slice(-4) }}</p>
               <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">{{ card.cardHolderName }}</p>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-right hidden sm:block">
               <p class="text-[10px] text-gray-300 font-bold uppercase tracking-wider">Expires</p>
               <p class="text-sm font-bold text-gray-700 font-mono">{{ card.expirationDate }}</p>
            </div>
            <button @click="$emit('delete-card', card)" class="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-all duration-200" title="Remove Card">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
        <div v-if="creditCards.length === 0" class="text-center py-10 px-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50">
          <p class="text-gray-500 font-medium text-sm">No payment methods saved.</p>
        </div>
      </div>

      <div v-else class="bg-gray-50 rounded-2xl p-8 border border-gray-200 animate-slide-down">
         <h4 class="text-sm font-bold text-[#280559] mb-6 uppercase tracking-wide flex items-center gap-2">
           <span class="w-2 h-2 bg-[#280559] rounded-full"></span> Card Details
         </h4>
         <div class="space-y-5 mb-8">
            <input v-model="newCard.cardHolderName" placeholder="AS IT APPEARS ON CARD" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-bold tracking-wide">
            <div class="relative">
              <input v-model="newCard.cardNumber" placeholder="0000 0000 0000 0000" maxlength="19" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-mono">
            </div>
            <div class="grid grid-cols-2 gap-5">
               <input v-model="newCard.expirationDate" placeholder="MM/YY" maxlength="5" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-mono text-center">
               <input v-model="newCard.cvv" placeholder="123" maxlength="4" type="password" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-mono text-center">
            </div>
         </div>
         <div class="flex gap-4">
           <button @click="handleAdd" class="bg-[#280559] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-900/10 hover:bg-[#1e0342] hover:shadow-xl transition-all transform hover:-translate-y-0.5">Save Card</button>
           <button @click="cancelForm" class="text-gray-500 px-6 py-3 text-sm font-bold hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CreditCard } from '@/services/userService'; 
defineProps<{ creditCards: CreditCard[] }>();
const emit = defineEmits(['add-card', 'delete-card']);
const showForm = ref(false);
const emptyCard = { cardHolderName: '', cardNumber: '', expirationDate: '', cvv: '' };
const newCard = ref<CreditCard>({ ...emptyCard });
const handleAdd = () => { if (!newCard.value.cardNumber) return; emit('add-card', { ...newCard.value }); cancelForm(); };
const cancelForm = () => { newCard.value = { ...emptyCard }; showForm.value = false; };
</script>

<style scoped>
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
.animate-slide-down { animation: slideDown 0.3s ease-out forwards; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
</style>