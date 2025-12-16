<template>
  <div class="flex h-screen bg-gray-100">
    <div class="flex-1 p-6">
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-800">Product Management</h1>
        <ButtonRectangle
          textColor="white"
          btncolor="#280559"
          padding="px-6 py-3"
          rounded="rounded-lg"
        >
          <RouterLink to="/maindashboard/product/add" class="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Add New Product
          </RouterLink>
        </ButtonRectangle>
      </div>

      <!-- Success/Error Messages -->
      <div
        v-if="successMessage"
        class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
      >
        {{ successMessage }}
      </div>
      <div
        v-if="errorMessage"
        class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
      >
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
              <tr v-if="products.length === 0">
                <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                  No products found. Click "Add New Product" to create one.
                </td>
              </tr>
              <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
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
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product.stock }}</div>
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
                  <button
                    @click="editProduct(product.id!)"
                    class="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(product.id!)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- This router-view renders the child routes -->
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ButtonRectangle from '../components/ButtonRectangle.vue'
import { productService } from '@/services/apiProduct'
import type { Product } from '@/types/Product'

const router = useRouter()

const products = ref<Product[]>([])
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

onMounted(async () => {
  await loadProducts()
})

const loadProducts = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    const response = await productService.getAllProducts()
    products.value = response.data
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Failed to load products'
    console.error('Error loading products:', error)
  } finally {
    isLoading.value = false
  }
}

const editProduct = (id: string) => {
  if (id) {
    router.push(`/maindashboard/product/edit/${id}`)
  }
}

const confirmDelete = async (id: string) => {
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
