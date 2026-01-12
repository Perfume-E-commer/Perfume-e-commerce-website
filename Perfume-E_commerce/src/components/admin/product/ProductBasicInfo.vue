<template>
  <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
    <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">
      Basic Information
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Product Name <span class="text-red-500">*</span></label>
        <input 
          :value="modelValue.name"
          @input="update('name', ($event.target as HTMLInputElement).value)"
          type="text" 
          placeholder="e.g. Gucci Bamboo Eau de Parfum"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Brand</label>
        <input 
          :value="modelValue.brand"
          @input="update('brand', ($event.target as HTMLInputElement).value)"
          type="text" 
          placeholder="e.g. Gucci"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select 
          :value="modelValue.category"
          @change="update('category', ($event.target as HTMLSelectElement).value)"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
        >
          <option value="" disabled>Select Category</option>
          <option value="WOMEN">Women</option>
          <option value="MEN">Men</option>
          <option value="UNISEX">Unisex</option>
          <option value="EXCLUSIVE">Exclusive Collection</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Fragrance Family</label>
        <input 
          :value="modelValue.scent"
          @input="update('scent', ($event.target as HTMLInputElement).value)"
          type="text" 
          placeholder="e.g. Floral Woody"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
        <p class="text-xs text-gray-400 mt-1">Primary scent character.</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
        <input 
          :value="modelValue.occasion"
          @input="update('occasion', ($event.target as HTMLInputElement).value)"
          type="text" 
          placeholder="e.g. Daily Wear, Office, Spring"
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Marketing Summary</label>
        <input 
          :value="modelValue.summary"
          @input="update('summary', ($event.target as HTMLInputElement).value)"
          type="text" 
          placeholder="e.g. Strength and confidence meet femininity."
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
        />
      </div>

      <div class="col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
        <textarea 
          :value="modelValue.description"
          @input="update('description', ($event.target as HTMLTextAreaElement).value)"
          rows="4" 
          placeholder="Detailed description of the fragrance..."
          class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
        ></textarea>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: {
    name: string;
    brand: string;
    category: string;
    scent: string;
    occasion: string;
    summary: string;
    description: string;
  }
}>();

const emit = defineEmits(['update:modelValue']);

// Helper to update parent state cleanly
const update = (key: string, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
};
</script>