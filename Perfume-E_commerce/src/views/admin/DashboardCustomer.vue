<template>
  <div class="p-6 space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 class="text-2xl font-bold text-gray-800">Customer Management</h1>
      
      <div class="flex gap-4">
        <div class="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100">
          <span class="text-xs text-indigo-500 font-semibold uppercase">Total Users</span>
          <div class="text-xl font-bold text-indigo-700">{{ totalElements }}</div>
        </div>
      </div>
    </div>

    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
      <div class="relative w-full sm:max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
          placeholder="Search by name or email..."
        />
      </div>
      
      <button @click="loadCustomers" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
        Refresh List
      </button>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th class="px-6 py-3">Customer</th>
              <th class="px-6 py-3">Contact</th>
              <th class="px-6 py-3">Role</th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="4" class="px-6 py-12 text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </td>
            </tr>

            <tr v-else-if="users.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                No customers found matching "{{ searchQuery }}".
              </td>
            </tr>

            <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                    {{ user.firstName?.charAt(0) || 'U' }}
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                    <div class="text-xs text-gray-400">ID: {{ (user.id || '').toString().slice(-6) }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="text-gray-900">{{ user.email }}</span>
                  <span class="text-gray-400 text-xs">{{ user.phoneNumber || 'No phone' }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="role in user.roles" 
                    :key="role.id"
                    :class="role.name === 'ROLE_ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'"
                    class="px-2 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ role.name.replace('ROLE_', '') }}
                  </span>
                  <span v-if="!user.roles || user.roles.length === 0" class="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    USER
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-gray-400 hover:text-indigo-600 font-medium transition-colors">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <p class="text-sm text-gray-700">
            Page <span class="font-medium">{{ currentPage + 1 }}</span> of <span class="font-medium">{{ totalPages }}</span>
          </p>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 0"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage >= totalPages - 1"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import customerService, { type User } from '@/services/customerService';

// State
const users = ref<User[]>([]);
const isLoading = ref(false);
const searchQuery = ref('');
const currentPage = ref(0);
const pageSize = ref(10);
const totalPages = ref(0);
const totalElements = ref(0);

// Actions
const loadCustomers = async () => {
  isLoading.value = true;
  try {
    const response = await customerService.getCustomers({
      page: currentPage.value,
      size: pageSize.value,
      search: searchQuery.value
    });

    // Handle standard Page or VIA_DTO format
    const data = response.data;
    users.value = data.content;
    
    // Check nested page object (VIA_DTO) or direct
    if (data.page) {
      totalPages.value = data.page.totalPages;
      totalElements.value = data.page.totalElements;
    } else {
      totalPages.value = data.totalPages;
      totalElements.value = data.totalElements;
    }
  } catch (error) {
    console.error("Failed to load customers", error);
  } finally {
    isLoading.value = false;
  }
};

let searchTimeout: ReturnType<typeof setTimeout>;
const handleSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 0;
    loadCustomers();
  }, 300);
};

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage;
    loadCustomers();
  }
};

onMounted(() => {
  loadCustomers();
});
</script>