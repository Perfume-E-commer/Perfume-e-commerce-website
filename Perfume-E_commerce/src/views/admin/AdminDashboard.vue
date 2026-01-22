<template>
  <div class="p-6 min-h-screen bg-gray-50/50 space-y-8 animate-fade-in">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Welcome back, Admin!</h1>
        <p class="text-sm text-gray-500 mt-1">{{ currentDate }}</p>
      </div>

      <div class="flex gap-3">
        <router-link
          to="/admin/products"
          class="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm flex items-center"
        >
          <svg
            class="w-4 h-4 mr-2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          Manage Products
        </router-link>

        <router-link
          to="/admin/promotions"
          class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Promotion
        </router-link>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="animate-spin h-10 w-10 border-2 border-indigo-600 border-t-transparent rounded-full"
      ></div>
    </div>

    <div v-else class="space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link
          to="/admin/orders"
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition"
        >
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Orders (30d)
            </p>
            <p class="text-2xl font-bold text-gray-900 mt-2">{{ dashboardData.totalOrders30d }}</p>
          </div>
          <div class="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </router-link>

        <router-link
          to="/admin/orders"
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition"
        >
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Revenue (30d)</p>
            <p class="text-2xl font-bold text-gray-900 mt-2">
              {{ formatCurrency(dashboardData.revenue30d) }}
            </p>
          </div>
          <div class="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </router-link>

        <router-link
          to="/admin/inventory"
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition group"
        >
          <div>
            <p
              class="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-red-500 transition-colors"
            >
              Low Stock Alerts
            </p>
            <p class="text-2xl font-bold text-gray-900 mt-2">{{ lowStockItems.length }}</p>
          </div>
          <div class="p-3 bg-red-50 text-red-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </router-link>

        <router-link
          to="/admin/customers"
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition"
        >
          <div>
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Customers</p>
            <p class="text-2xl font-bold text-gray-900 mt-2">{{ dashboardData.activeCustomers }}</p>
          </div>
          <div class="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </router-link>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
        <div class="bg-white p-6 lg:col-span-3 rounded-xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold text-gray-900">Sales Overview (Last 30 Days)</h2>
          </div>

          <div
            v-if="!dashboardData.salesChart || dashboardData.salesChart.length === 0"
            class="h-96 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-lg bg-gray-50/50"
          >
            <p>No sales data available yet.</p>
          </div>

          <div v-else class="w-full">
            <ApexCharts height="380" :data="chartComputed.revenue" :labels="chartComputed.dates" />
          </div>
        </div>

        <div
          class="bg-white rounded-xl lg:col-span-1 shadow-sm border border-gray-100 overflow-hidden h-fit"
        >
          <div class="p-4 border-b border-gray-100 bg-red-50 flex justify-between items-center">
            <h3 class="font-bold text-red-800 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Low Stock
            </h3>
          </div>

          <div class="p-4 space-y-3 max-h-[450px] overflow-y-auto custom-scrollbar">
            <div v-if="lowStockItems.length === 0" class="text-center text-gray-400 text-xs py-4">
              All items well stocked.
            </div>

            <div
              v-else
              v-for="(item, index) in lowStockItems"
              :key="index"
              class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
            >
              <div
                class="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200"
              >
                <img :src="item.imageUrl" :alt="item.name" class="w-full h-full object-cover" />
              </div>

              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</p>

                <p v-if="item.lowVariant" class="text-xs text-red-600 font-medium">
                  Variant <b>{{ item.lowVariant.size }}</b
                  >: Only {{ item.lowVariant.stock }} left
                </p>

                <p v-else class="text-xs text-gray-500">
                  Stock: <span class="text-red-600 font-bold">{{ item.stock }}</span>
                  <span class="text-gray-300">/</span>
                  Limit: {{ item.limit }}
                </p>
              </div>

              <router-link
                :to="`/admin/products/edit/${item.id}`"
                class="p-1.5 text-gray-400 hover:text-indigo-600 bg-white border border-gray-100 shadow-sm rounded-md transition-all"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div class="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 class="font-bold text-gray-800">Recent Orders</h3>
            <router-link
              to="/admin/orders"
              class="text-indigo-600 text-xs font-bold hover:underline"
              >View All</router-link
            >
          </div>

          <div
            v-if="dashboardData.recentOrders.length === 0"
            class="p-8 text-center text-gray-400 text-sm italic"
          >
            No recent orders found.
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th class="px-5 py-3">Order #</th>
                  <th class="px-5 py-3">Customer</th>
                  <th class="px-5 py-3">Total</th>
                  <th class="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="order in dashboardData.recentOrders.slice(0, 5)"
                  :key="order.id"
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 font-mono text-indigo-600 font-bold text-xs">
                    {{ order.orderNumber }}
                  </td>
                  <td class="px-5 py-3 text-gray-900 font-medium">{{ order.customerName }}</td>
                  <td class="px-5 py-3 text-gray-600">{{ formatCurrency(order.total) }}</td>
                  <td class="px-5 py-3 text-right">
                    <span
                      class="px-2 py-1 rounded text-[10px] font-bold uppercase"
                      :class="{
                        'bg-green-100 text-green-700':
                          order.status === 'CONFIRMED' || order.status === 'DELIVERED',
                        'bg-blue-100 text-blue-700': order.status === 'SHIPPED',
                        'bg-yellow-100 text-yellow-700': order.status === 'PENDING',
                        'bg-red-100 text-red-700': order.status === 'CANCELLED',
                        'bg-gray-100 text-gray-600': ![
                          'CONFIRMED',
                          'DELIVERED',
                          'SHIPPED',
                          'PENDING',
                          'CANCELLED',
                        ].includes(order.status),
                      }"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div
              class="p-4 border-b border-gray-100 bg-indigo-50 flex justify-between items-center"
            >
              <h3 class="font-bold text-indigo-800">Active Discounts</h3>
            </div>
            <div class="p-4 space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              <div
                v-if="activePromotions.length === 0"
                class="text-center text-gray-400 text-xs py-4"
              >
                No products currently on discount.
              </div>

              <div
                v-for="product in activePromotions.slice(0, 5)"
                :key="product.id"
                @click="router.push(`/admin/products/edit/${product.id}`)"
                class="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 transition-colors p-2 -mx-2 rounded-lg group"
              >
                <div
                  class="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200 group-hover:border-indigo-200 transition-colors"
                >
                  <img
                    :src="product.imageUrl"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors"
                  >
                    {{ product.name }}
                  </p>
                  <div class="flex items-center gap-2 text-xs">
                    <span class="font-bold text-indigo-700">{{
                      formatCurrency(product.discountedPrice)
                    }}</span>
                    <span class="text-gray-400 line-through">{{
                      formatCurrency(product.price)
                    }}</span>
                  </div>
                </div>

                <span
                  class="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded whitespace-nowrap"
                >
                  {{ calculateDiscount(product.price, product.discountedPrice) }}% OFF
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import adminService, { type AdminDashboardResponse } from '../../services/adminService'
import ApexCharts from '../components/ApexCharts.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoading = ref(true)
const dashboardData = ref<AdminDashboardResponse>({
  totalOrders30d: 0,
  revenue30d: 0,
  lowStockCount: 0,
  activeCustomers: 0,
  salesChart: [],
  recentOrders: [],
  lowStockItems: [],
  activePromotions: [],
})

const products = ref<any[]>([])

const activePromotions = computed(() => {
  if (!products.value) return []
  return products.value.filter(
    (p) => p.discountedPrice && p.discountedPrice > 0 && p.discountedPrice < p.price,
  )
})

const calculateDiscount = (price: number, discounted: number) => {
  if (!price || !discounted) return 0
  return Math.round(((price - discounted) / price) * 100)
}

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const chartComputed = computed(() => {
  const rawData = dashboardData.value.salesChart || []
  return {
    dates: rawData.map((item: any) => item.date),
    revenue: rawData.map((item: any) => item.revenue),
  }
})

const lowStockItems = computed(() => {
  if (!products.value) return []
  const alerts: any[] = []

  products.value.forEach((p) => {
    const threshold = p.minStockLevel || 5

    if (p.variants && p.variants.length > 0) {
      p.variants.forEach((v: any) => {
        const vThreshold = v.minStock || threshold
        if (v.stock <= vThreshold) {
          alerts.push({
            id: p.id,
            name: p.name,
            imageUrl: v.imageUrl || p.imageUrl,
            lowVariant: v,
          })
        }
      })
    } else if (p.stock <= threshold) {
      alerts.push({
        id: p.id,
        name: p.name,
        imageUrl: p.imageUrl,
        stock: p.stock,
        limit: threshold,
      })
    }
  })
  return alerts
})

const loadDashboard = async () => {
  isLoading.value = true
  try {
    const [statsRes, productsRes] = await Promise.all([
      adminService.getDashboardStats(),
      adminService.getAllProducts(0, 100),
    ])

    if (statsRes && statsRes.data) {
      dashboardData.value = statsRes.data
    }
    if (productsRes && productsRes.data && productsRes.data.content) {
      products.value = productsRes.data.content
    }
  } catch (error) {
    console.error('Failed to load dashboard data', error)
  } finally {
    isLoading.value = false
  }
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

const formatDate = (dateString: string) => {
  if (!dateString || dateString === 'N/A') return 'No Expiry'
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

onMounted(() => {
  loadDashboard()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c7c7c7;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
