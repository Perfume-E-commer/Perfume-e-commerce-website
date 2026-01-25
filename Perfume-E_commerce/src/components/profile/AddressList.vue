<template>
  <div class="p-8 animate-fade-in-up" style="animation-delay: 0.1s">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-2xl bg-[#280559]/5 text-[#280559] flex items-center justify-center text-lg font-bold"
        >
          02
        </div>
        <div>
          <h3 class="text-xl font-serif font-bold text-gray-900">Address Book</h3>
          <p class="text-gray-400 text-sm mt-1">Manage your shipping destinations</p>
        </div>
      </div>

      <button
        v-if="!showForm"
        @click="showForm = true"
        class="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-50 text-[#280559] font-bold text-sm hover:bg-[#280559] hover:text-white transition-all duration-300"
      >
        <svg
          class="w-4 h-4 transition-transform group-hover:rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New
      </button>
    </div>

    <div class="transition-all duration-300">
      <div v-if="!showForm" class="grid grid-cols-1 gap-4">
        <div
          v-for="(addr, index) in addresses"
          :key="index"
          class="relative p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#280559]/30 hover:shadow-md transition-all duration-300 group"
        >

          <div class="flex items-start gap-4">
            <div
              class="shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#280559] shadow-sm mt-1"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <div class="grow">
              <div class="flex items-center gap-3 mb-1">
                <h4 class="font-bold text-gray-900 text-base">{{ addr.fullName }}</h4>
                
              </div>

              <p class="text-sm text-gray-600 leading-relaxed mb-3">
                <span class="block">#{{ addr.houseNumber }}, {{ addr.street }}</span>
                <span class="block">{{ addr.village }}, {{ addr.district }}</span>
                <span class="block text-gray-500 text-xs mt-1"
                  >{{ addr.community }}, {{ addr.city }} -
                  <span class="font-mono">{{ addr.zipCode }}</span></span
                >
              </p>

              <div class="flex items-center justify-between border-t border-gray-200/60 pt-3 mt-3">
                <div class="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {{ addr.phoneNumber }}
                </div>

                <button
                  @click="$emit('delete-address', addr)"
                  class="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                  title="Remove Address"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="addresses.length === 0"
          class="text-center py-10 px-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50"
        >
          <p class="text-gray-500 font-medium text-sm">No addresses saved yet.</p>
          <button
            @click="showForm = true"
            class="mt-2 text-[#280559] font-bold text-sm hover:underline"
          >
            Add one now
          </button>
        </div>
      </div>

      <div v-else class="bg-gray-50 rounded-2xl p-8 border border-gray-200 animate-slide-down">
         <h4 class="text-sm font-bold text-[#280559] mb-6 uppercase tracking-wide flex items-center gap-2">
            <span class="w-2 h-2 bg-[#280559] rounded-full"></span> New Shipping Details
         </h4>
         <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
           <input v-model="newAddress.fullName" placeholder="Receiver Name" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
           <input v-model="newAddress.phoneNumber" placeholder="Phone Number" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
           <input v-model="newAddress.houseNumber" placeholder="House No." class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
           <input v-model="newAddress.street" placeholder="Street" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
           <input v-model="newAddress.village" placeholder="Village (Phum)" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
           <input v-model="newAddress.district" placeholder="District (Sangkat)" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
           <input v-model="newAddress.community" placeholder="Community (Khan)" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
           <div class="flex gap-4">
              <input v-model="newAddress.city" placeholder="City / Province" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
              <input v-model="newAddress.zipCode" placeholder="Zip" class="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#280559]/20 focus:border-[#280559] outline-none transition-all duration-300 placeholder-gray-400 font-medium">
           </div>
         </div>
         <div class="flex gap-4">
           <button @click="handleAdd" class="bg-[#280559] text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-900/10 hover:bg-[#1e0342] hover:shadow-xl transition-all transform hover:-translate-y-0.5">Save Address</button>
           <button @click="cancelForm" class="text-gray-500 px-6 py-3 text-sm font-bold hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Address } from '@/services/userService'

const props = defineProps<{
  addresses: Address[]
}>()

const emit = defineEmits(['add-address', 'delete-address'])

const showForm = ref(false)

const emptyAddress: Address = {
  fullName: '',
  phoneNumber: '',
  houseNumber: '',
  street: '',
  village: '',
  community: '',
  district: '',
  city: '',
  zipCode: '',
}

const newAddress = ref<Address>({ ...emptyAddress })

const handleAdd = () => {
  if (!newAddress.value.fullName || !newAddress.value.houseNumber || !newAddress.value.city) {
    alert('Please fill in the required fields (Name, House No, City)')
    return
  }
  emit('add-address', { ...newAddress.value })
  cancelForm()
}

const cancelForm = () => {
  newAddress.value = { ...emptyAddress }
  showForm.value = false
}
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-down {
  animation: slideDown 0.3s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}
</style>
