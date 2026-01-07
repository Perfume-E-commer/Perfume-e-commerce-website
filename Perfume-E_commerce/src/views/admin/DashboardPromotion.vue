<template>
  <div class="p-6">
    <div class="mb-8 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">Promotion Management</h1>
      <button 
        @click="showForm = !showForm"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        {{ showForm ? 'Cancel' : '+ New Coupon' }}
      </button>
    </div>

    <div v-if="showForm" class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Edit Coupon' : 'Create New Coupon' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Coupon Code</label>
            <input 
              v-model="formData.code" 
              type="text" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              placeholder="e.g. SUMMER20"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Discount Percentage (%)</label>
            <input 
              v-model.number="formData.discountPercent" 
              type="number" 
              min="1" max="100"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <input 
              v-model="formData.description" 
              type="text" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              placeholder="Summer Sale 20% Off"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Valid Until</label>
            <input 
              v-model="formData.validUntil" 
              type="date" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button 
            type="submit" 
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
          </button>
        </div>
      </form>
    </div>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th class="px-6 py-3">Code</th>
            <th class="px-6 py-3">Discount</th>
            <th class="px-6 py-3">Expiry</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="promotions.length === 0">
            <td colspan="5" class="px-6 py-4 text-center">No promotions found.</td>
          </tr>
          
          <tr v-for="promo in promotions" :key="promo.id" class="border-b hover:bg-gray-50">
            <td class="px-6 py-4 font-bold text-gray-900">{{ promo.code }}</td>
            <td class="px-6 py-4">{{ promo.discountPercent }}%</td>
            <td class="px-6 py-4">{{ formatDate(promo.validUntil) }}</td>
            <td class="px-6 py-4">
              <span 
                :class="promo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                class="px-2 py-1 rounded-full text-xs font-semibold"
              >
                {{ promo.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-6 py-4 flex gap-2">
              <button 
                @click="toggleStatus(promo)"
                class="text-blue-600 hover:text-blue-900"
              >
                {{ promo.isActive ? 'Deactivate' : 'Activate' }}
              </button>
              
              <button 
                @click="deletePromo(promo.id!)"
                class="text-red-600 hover:text-red-900 ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import promotionService, { type Promotion } from '@/services/promotionService';

// State
const promotions = ref<Promotion[]>([]);
const showForm = ref(false);
const isEditing = ref(false);
const isLoading = ref(false);

const formData = ref<Promotion>({
  code: '',
  description: '',
  discountPercent: 10,
  validUntil: '',
  isActive: true
});

// Format Date
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

// Load Data
const loadPromotions = async () => {
  try {
    const response = await promotionService.getAllPromotions();
    promotions.value = response.data;
  } catch (error) {
    console.error("Failed to load promotions", error);
  }
};

// Handle Submit
const handleSubmit = async () => {
  isLoading.value = true;
  try {
    if (isEditing.value && formData.value.id) {
       await promotionService.updatePromotion(formData.value.id, formData.value);
    } else {
       await promotionService.createPromotion(formData.value);
    }
    
    // Reset and Refresh
    showForm.value = false;
    formData.value = { code: '', description: '', discountPercent: 10, validUntil: '', isActive: true };
    await loadPromotions();
    alert("Promotion saved successfully!");
  } catch (error) {
    console.error("Failed to save promotion", error);
    alert("Failed to save promotion. Check console.");
  } finally {
    isLoading.value = false;
  }
};

// Actions
const toggleStatus = async (promo: Promotion) => {
  if (!promo.id) return;
  try {
    await promotionService.togglePromotion(promo.id);
    await loadPromotions();
  } catch (error) {
    console.error("Failed to toggle status", error);
  }
};

const deletePromo = async (id: string) => {
  if(!confirm("Are you sure you want to delete this coupon?")) return;
  try {
    await promotionService.deletePromotion(id);
    await loadPromotions();
  } catch (error) {
    console.error("Failed to delete", error);
  }
};

onMounted(() => {
  loadPromotions();
});
</script>