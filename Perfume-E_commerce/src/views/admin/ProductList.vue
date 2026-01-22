<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Products Management</h1>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <ButtonRectangle
          textColor="white"
          btncolor="#280559"
          padding="px-4 py-2 sm:px-6 sm:py-3"
          rounded="rounded-lg"
          class="w-full sm:w-auto"
        >
          <RouterLink to="/admin/products/add" class="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Product</span>
          </RouterLink>
        </ButtonRectangle>
      </div>
    </div>

    <!-- ✨ UPDATED: Added Search Bar with Low Stock Filter Button -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4">
      <div class="relative max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search products by name..."
        />
      </div>

      <div class="flex gap-2">
        <button
          @click="toggleLowStockFilter"
          :class="
            showLowStockOnly
              ? 'bg-red-100 text-red-700 border-red-300'
              : 'bg-white text-gray-700 border-gray-300'
          "
          class="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none transition-colors"
        >
          ⚠️ Low Stock Only
        </button>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div
      v-if="successMessage"
      class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
    >
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {{ errorMessage }}
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>

    <!-- Products Table -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Brand
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="displayedProducts.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                No products found.
                {{
                  showLowStockOnly
                    ? 'Try turning off "Low Stock Only" filter.'
                    : 'Click "Add New Product" to create one.'
                }}
              </td>
            </tr>
            <tr v-for="product in displayedProducts" :key="product.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="product.imageUrl || 'https://via.placeholder.com/50'"
                  :alt="product.name"
                  class="h-12 w-12 rounded object-cover"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ product.brand }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                >
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${{ product.price }}</div>
              </td>
              <!-- ✨ UPDATED: Stock cell with low stock warning -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span
                    :class="{
                      'text-red-600 font-bold': product.stock < 10,
                      'text-gray-900': product.stock >= 10,
                    }"
                  >
                    {{ product.stock }}
                  </span>

                  <span
                    v-if="product.stock < 10"
                    class="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full"
                  >
                    Low
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  ]"
                >
                  {{ product.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <router-link
                  :to="`/admin/products/edit/${product.id}`"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </router-link>
                <button @click="confirmDelete(product.id)" class="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- ✨ UPDATED: Added Pagination Footer -->
        <div
          class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        >
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ currentPage * pageSize + 1 }}</span>
                to
                <span class="font-medium">{{
                  Math.min((currentPage + 1) * pageSize, totalElements)
                }}</span>
                of
                <span class="font-medium">{{ totalElements }}</span>
                results
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  @click="changePage(currentPage - 1)"
                  :disabled="currentPage === 0"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <span
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  Page {{ currentPage + 1 }} of {{ totalPages }}
                </span>

                <button
                  @click="changePage(currentPage + 1)"
                  :disabled="currentPage >= totalPages - 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ButtonRectangle from '../components/ButtonRectangle.vue'
import { productService } from '../../services/apiProduct'
import { adminService } from '../../services/adminService'
import type { Product } from '../../types/adminProduct'

const router = useRouter()

const products = ref<Product[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const currentPage = ref(0)
const pageSize = ref(10)
const totalPages = ref(0)
const searchQuery = ref('')
const totalElements = ref(0)

const showLowStockOnly = ref(false)

onMounted(async () => {
  await loadProducts()
})

let searchTimeout: ReturnType<typeof setTimeout>
const handleSearch = (event?: Event) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 0
    loadProducts()
  }, 300)
}

const displayedProducts = computed(() => {
  if (showLowStockOnly.value) {
    return products.value.filter((product) => product.stock < 10)
  }
  return products.value
})

const loadProducts = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const params: { page?: number; size?: number; search?: string } = {
      page: currentPage.value,
      size: pageSize.value,
      search: searchQuery.value,
    }

    const response = await adminService.getProducts(params as any)

    products.value = Array.isArray(response.data) ? response.data : response.data.content || []

    if (response.data.page) {
      totalElements.value = response.data.page.totalElements || 0
      totalPages.value = response.data.page.totalPages || 0
      currentPage.value = response.data.page.number || 0
    } else if (response.data.totalElements !== undefined) {
      totalElements.value = response.data.totalElements || 0
      totalPages.value = response.data.totalPages || 0
      currentPage.value = response.data.number || 0
    } else {
      totalElements.value = products.value.length
      totalPages.value = 1
      currentPage.value = 0
    }
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to load products'
    console.error('Error loading products:', error)
  } finally {
    isLoading.value = false
  }
}

const changePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage
    loadProducts()
  }
}

const toggleLowStockFilter = () => {
  showLowStockOnly.value = !showLowStockOnly.value
}

const editProduct = (id: string | undefined) => {
  if (!id) {
    console.error('Product ID is missing')
    return
  }
  router.push(`/maindashboard/product/edit/${id}`)
}

const confirmDelete = async (id: string | undefined) => {
  if (!id) return

  if (!confirm('Are you sure you want to delete this product?')) {
    return
  }

  try {
    isLoading.value = true
    await productService.deleteProduct(id)
    successMessage.value = 'Product deleted successfully!'
    await loadProducts()

    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to delete product'
    console.error('Error deleting product:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
