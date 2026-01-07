<template>
  <div class="p-6">
    <div class="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 class="text-2xl font-bold text-gray-800">Promotion Management</h1>
      <button 
        @click="openCreateModal"
        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        + New Coupon
      </button>
    </div>

    <div class="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div class="relative max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search by coupon code..."
        />
      </div>
    </div>

    <div v-if="showForm" class="bg-white p-6 rounded-lg shadow-md mb-8 border border-indigo-100">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">{{ isEditing ? 'Edit Coupon' : 'Create New Coupon' }}</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Coupon Code</label>
            <input 
              v-model="formData.code" 
              type="text" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-indigo-500 focus:ring-indigo-500"
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
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <input 
              v-model="formData.description" 
              type="text" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Summer Sale 20% Off"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Valid Until</label>
            <input 
              v-model="formData.validUntil" 
              type="date" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button 
            type="button" 
            @click="showForm = false"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Saving...' : (isEditing ? 'Update' : 'Create') }}
          </button>
        </div>
      </form>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th class="px-6 py-3">Code</th>
              <th class="px-6 py-3">Discount</th>
              <th class="px-6 py-3">Description</th>
              <th class="px-6 py-3">Expiry</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading && !promotions.length">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">Loading promotions...</td>
            </tr>

            <tr v-else-if="promotions.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">No promotions found.</td>
            </tr>
            
            <tr v-for="promo in promotions" :key="promo.id" class="border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-bold text-gray-900">{{ promo.code }}</td>
              <td class="px-6 py-4">
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {{ promo.discountPercent }}%
                </span>
              </td>
              <td class="px-6 py-4">{{ promo.description }}</td>
              <td class="px-6 py-4 text-gray-900">
                {{ formatDate(promo.validUntil) }}
              </td>
              <td class="px-6 py-4">
                <span 
                  :class="promo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {{ promo.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right flex justify-end gap-2">
                <button 
                  @click="editPromo(promo)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button 
                  @click="toggleStatus(promo)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  {{ promo.isActive ? 'Deactivate' : 'Activate' }}
                </button>
                <button 
                  @click="deletePromo(promo.id!)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="totalPages > 1" class="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <span class="text-sm text-gray-700">
          Page {{ currentPage + 1 }} of {{ totalPages }}
        </span>
        <div class="flex gap-2">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 0"
            class="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage >= totalPages - 1"
            class="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import promotionService, { type Promotion } from '@/services/promotionService';

const promotions = ref<Promotion[]>([]);
const showForm = ref(false);
const isEditing = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');

const currentPage = ref(0);
const pageSize = ref(10);
const totalPages = ref(0);

const formData = ref<Promotion>({
  code: '',
  description: '',
  discountPercent: 10,
  validUntil: '',
  isActive: true
});

const formatDate = (dateStr: string | Date | undefined) => {
  if (!dateStr) return 'No Date';
  return new Date(dateStr).toLocaleDateString();
};

const loadPromotions = async () => {
  isLoading.value = true;
  try {
    const response = await promotionService.getAllPromotions({
      page: currentPage.value,
      size: pageSize.value,
      search: searchQuery.value
    });

    if (response.data && response.data.content) {
      promotions.value = response.data.content;
      totalPages.value = response.data.totalPages || 1;
    } else if (Array.isArray(response.data)) {
      promotions.value = response.data; 
      totalPages.value = 1;
    } else {
      promotions.value = [];
    }
  } catch (error) {
    console.error("Failed to load promotions", error);
    promotions.value = [];
  } finally {
    isLoading.value = false;
  }
};

let searchTimeout: ReturnType<typeof setTimeout>;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 0;
    loadPromotions();
  }, 300);
};

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    loadPromotions();
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  formData.value = { code: '', description: '', discountPercent: 10, validUntil: '', isActive: true };
  showForm.value = true;
};

const editPromo = (promo: Promotion) => {
  isEditing.value = true;
  formData.value = { 
    ...promo, 
    validUntil: promo.validUntil ? new Date(promo.validUntil).toISOString().split('T')[0] : '' 
  };
  showForm.value = true;
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    if (isEditing.value && formData.value.id) {
       await promotionService.updatePromotion(formData.value.id, formData.value);
    } else {
       await promotionService.createPromotion(formData.value);
    }
    
    showForm.value = false;
    await loadPromotions();
  } catch (error) {
    console.error("Failed to save promotion", error);
    alert("Failed to save promotion.");
  } finally {
    isLoading.value = false;
  }
};

const toggleStatus = async (promo: Promotion) => {
  if (!promo.id) return;
  try {
    promo.isActive = !promo.isActive;
    await promotionService.togglePromotion(promo.id);
  } catch (error) {
    promo.isActive = !promo.isActive;
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