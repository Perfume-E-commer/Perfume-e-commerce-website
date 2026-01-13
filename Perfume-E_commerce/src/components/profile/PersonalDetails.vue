<template>
  <div class="p-8 animate-fade-in-up">
    
    <div class="flex items-center gap-4 mb-8 border-b border-gray-50 pb-6">
      <div class="w-12 h-12 rounded-2xl bg-[#280559]/5 text-[#280559] flex items-center justify-center text-lg font-bold">
        01
      </div>
      <div>
        <h3 class="text-xl font-serif font-bold text-gray-900">Personal Details</h3>
        <p class="text-gray-400 text-sm mt-1">Update your identity and contact information</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="space-y-2">
        <label class="text-xs font-bold text-[#280559] uppercase tracking-wider ml-1">First Name</label>
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 group-focus-within:text-[#280559] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <input v-model="modelValue.firstName" type="text" placeholder="e.g. Wade" class="w-full bg-gray-50 text-gray-900 text-sm rounded-xl border-transparent focus:border-[#280559] focus:bg-white focus:ring-4 focus:ring-[#280559]/10 pl-11 pr-4 py-3.5 transition-all duration-300 font-medium placeholder-gray-400">
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-bold text-[#280559] uppercase tracking-wider ml-1">Last Name</label>
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 group-focus-within:text-[#280559] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <input v-model="modelValue.lastName" type="text" placeholder="e.g. Warren" class="w-full bg-gray-50 text-gray-900 text-sm rounded-xl border-transparent focus:border-[#280559] focus:bg-white focus:ring-4 focus:ring-[#280559]/10 pl-11 pr-4 py-3.5 transition-all duration-300 font-medium placeholder-gray-400">
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-bold text-[#280559] uppercase tracking-wider ml-1">Phone Number</label>
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 group-focus-within:text-[#280559] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </div>
          <input v-model="modelValue.phoneNumber" type="tel" placeholder="+855 12 345 678" class="w-full bg-gray-50 text-gray-900 text-sm rounded-xl border-transparent focus:border-[#280559] focus:bg-white focus:ring-4 focus:ring-[#280559]/10 pl-11 pr-4 py-3.5 transition-all duration-300 font-medium placeholder-gray-400">
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-xs font-bold text-[#280559] uppercase tracking-wider ml-1">Date of Birth</label>
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 group-focus-within:text-[#280559] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <input v-model="modelValue.dateOfBirth" type="date" class="w-full bg-gray-50 text-gray-900 text-sm rounded-xl border-transparent focus:border-[#280559] focus:bg-white focus:ring-4 focus:ring-[#280559]/10 pl-11 pr-4 py-3.5 transition-all duration-300 font-medium placeholder-gray-400">
        </div>
      </div>
      
       <div class="space-y-2 md:col-span-2">
        <label class="text-xs font-bold text-[#280559] uppercase tracking-wider ml-1">Email Address</label>
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 group-focus-within:text-[#280559] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
          </div>
          <input v-model="modelValue.email" type="email" placeholder="student@example.com" class="w-full bg-gray-50 text-gray-900 text-sm rounded-xl border-transparent focus:border-[#280559] focus:bg-white focus:ring-4 focus:ring-[#280559]/10 pl-11 pr-4 py-3.5 transition-all duration-300 font-medium placeholder-gray-400">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  email: string;
}
defineProps<{ modelValue: PersonalInfo }>();
defineEmits(['update:modelValue']);
</script>

<style scoped>
@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
</style>