<template>
  <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
    <div>
      <h3 class="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{{ total_name }}</h3>
      
      <div class="flex items-end gap-3 mt-2">
        <div class="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">
          {{ total_value }}
        </div>

        <div 
          v-if="rate_fluctuation" 
          :class="['flex items-center text-xs font-medium px-2 py-0.5 rounded-full mb-1', rateColorClass]"
        >
          <i v-if="rateIconClass" :class="[rateIconClass, 'mr-1 text-[10px]']"></i>
          <span>{{ rate_fluctuation }}</span>
        </div>
      </div>
    </div>

    <p v-if="sub_text" class="text-gray-400 text-xs mt-4 pt-4 border-t border-gray-50">
      {{ sub_text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  total_name: {
    type: String,
    required: true,
  },
  total_value: {
    type: String,
    required: true,
  },
  rate_fluctuation: {
    type: String,
    default: '', // Optional now
  },
  sub_text: {
    type: String,
    default: '', // Optional footer text
  }
})

const trend = computed(() => {
  const text = props.rate_fluctuation.toLowerCase()
  
  if (text.includes('↑') || text.includes('+') || text.includes('up')) return 'positive'
  if (text.includes('↓') || text.includes('-') || text.includes('down')) return 'negative'
  
  return 'neutral' 
})

const rateColorClass = computed(() => {
  switch (trend.value) {
    case 'positive': return 'bg-emerald-50 text-emerald-700'
    case 'negative': return 'bg-red-50 text-red-700'
    default: return 'bg-gray-100 text-gray-600' 
  }
})

const rateIconClass = computed(() => {
  switch (trend.value) {
    case 'positive': return 'fa-solid fa-arrow-up' 
    case 'negative': return 'fa-solid fa-arrow-down'
    default: return '' 
  }
})
</script>