<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Warehouse Overview</h1>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search perfumes..."
            class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg
            class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded-full"
                      :src="product.image"
                      :alt="product.name"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ product.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ product.brand }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.category }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${{ product.price }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.stock }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'bg-green-100 text-green-800': product.stock > 10,
                    'bg-yellow-100 text-yellow-800':
                      product.stock > 0 && product.stock <= 10,
                    'bg-red-100 text-red-800': product.stock === 0,
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ getStockStatus(product.stock) }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="restockProduct(product)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Restock
                </button>
                <button
                  @click="editProduct(product)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Restock Modal -->
    <div
      v-if="showRestockModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-xl font-semibold mb-4">Restock {{ selectedProduct?.name }}</h2>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Current Stock: {{ selectedProduct?.stock || 0 }}</label
          >
          <input
            type="number"
            v-model.number="restockAmount"
            min="1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter amount to add"
          />
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="showRestockModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="confirmRestock"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardWarehouse',
  data() {
    return {
      searchQuery: '',
      showRestockModal: false,
      selectedProduct: null,
      restockAmount: 1,
      // Mock data - in a real app, this would come from an API
      products: [
        {
          id: 1,
          name: 'Chanel No. 5',
          brand: 'Chanel',
          category: 'Women',
          price: 120,
          stock: 25,
          image: 'https://www.mkshopcambodia.com/wp-content/uploads/2022/02/s719260-main-zoom-768x768.jpg',
        },
        {
          id: 2,
          name: 'Sauvage',
          brand: 'Dior',
          category: 'Men',
          price: 95,
          stock: 8,
          image: 'https://perfumeworld.com.bd/images/thumbs/0001193_dior-sauvage-edp_625.webp',
        },
        {
          id: 3,
          name: 'Black Opium',
          brand: 'Gucci',
          category: 'Women',
          price: 85,
          stock: 0,
          image: 'https://fimgs.net/mdimg/perfume-thumbs/375x500.7610.jpg',
        },
        {
          id: 4,
          name: 'Acqua di Gio',
          brand: 'HERMES',
          category: 'Men',
          price: 105,
          stock: 15,
          image: 'https://cdn.vnda.com.br/1200x/dolcevitaperfumes/2022/08/10/9_8_1_164_199.jpg?v=1660135396',
        },
        {
          id: 5,
          name: 'GUERLAIN',
          brand: 'Viktor & Rolf',
          category: 'Women',
          price: 135,
          stock: 5,
          image: 'https://perfumebestbuy.ng/wp-content/uploads/2019/11/Guerlain-Mon-Guerlain-intense-2.jpg',
        },
      ],
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchQuery) return this.products
      const query = this.searchQuery.toLowerCase()
      return this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    },
  },
  methods: {
    getStockStatus(stock) {
      if (stock === 0) return 'Out of Stock'
      if (stock <= 10) return 'Low Stock'
      return 'In Stock'
    },
    restockProduct(product) {
      this.selectedProduct = { ...product }
      this.restockAmount = 1
      this.showRestockModal = true
    },
    confirmRestock() {
      if (this.restockAmount < 1) return
      
      const index = this.products.findIndex(
        (p) => p.id === this.selectedProduct.id
      )
      if (index !== -1) {
        this.products[index].stock += this.restockAmount
      }
      
      this.showRestockModal = false
      // In a real app, you would make an API call here to update the stock
      this.$toast.success('Stock updated successfully!')
    },
    editProduct(product) {
      // In a real app, you would navigate to an edit page or show an edit modal
      this.$toast.info(`Editing ${product.name}`)
    },
  },
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
