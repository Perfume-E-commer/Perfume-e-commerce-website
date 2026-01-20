<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { Package, Calendar, MapPin, Phone, Mail, CreditCard, Truck } from 'lucide-vue-next'
import orderService, { type Order } from '@/services/orderService'

const loading = ref(true)
const activeTab = ref<'active' | 'history'>('active')
const orders = ref<Order[]>([])

onMounted(async () => {
  try {
    const data = await orderService.getMyOrders()
    orders.value = data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loading.value = false
  }
})

const activeOrders = computed(() => {
  return orders.value.filter(o => 
    ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY'].includes(o.status)
  )
})

const pastOrders = computed(() => {
  return orders.value.filter(o => 
    ['DELIVERED', 'CANCELLED', 'RETURNED', 'FAILED'].includes(o.status)
  )
})

const currentList = computed(() => activeTab.value === 'active' ? activeOrders.value : pastOrders.value)

// --- Helpers ---
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// Progress Bar Logic
const getProgressWidth = (status: string) => {
  if (status === 'PENDING' || status === 'CONFIRMED' || status === 'PROCESSING') return '15%'
  if (status === 'SHIPPED' || status === 'OUT_FOR_DELIVERY') return '50%'
  if (status === 'DELIVERED') return '100%'
  return '0%'
}

const isStepActive = (step: string, currentStatus: string) => {
  const steps = ['PLACED', 'SHIPPED', 'DELIVERED']
  
  let normalizedStatus = 'PLACED'
  if (['SHIPPED', 'OUT_FOR_DELIVERY'].includes(currentStatus)) normalizedStatus = 'SHIPPED'
  if (currentStatus === 'DELIVERED') normalizedStatus = 'DELIVERED'

  return steps.indexOf(step) <= steps.indexOf(normalizedStatus)
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar />

    <main class="flex-grow container mx-auto px-4 py-8 max-w-6xl">
      <div class="mb-8">
        <h1 class="text-3xl font-serif text-[#280559] mb-2">My Orders</h1>
        <p class="text-gray-500">Track your current orders and view your purchase history.</p>
      </div>

      <div class="flex border-b border-gray-200 mb-8">
        <button
          @click="activeTab = 'active'"
          class="pb-3 px-6 text-sm font-medium transition-colors relative"
          :class="activeTab === 'active' ? 'text-[#280559]' : 'text-gray-500 hover:text-gray-700'"
        >
          Active Orders
          <span v-if="activeOrders.length" class="ml-2 bg-[#280559] text-white text-xs px-2 py-0.5 rounded-full">
            {{ activeOrders.length }}
          </span>
          <div v-if="activeTab === 'active'" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#280559]"></div>
        </button>

        <button
          @click="activeTab = 'history'"
          class="pb-3 px-6 text-sm font-medium transition-colors relative"
          :class="activeTab === 'history' ? 'text-[#280559]' : 'text-gray-500 hover:text-gray-700'"
        >
          Order History
          <div v-if="activeTab === 'history'" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#280559]"></div>
        </button>
      </div>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#280559]"></div>
      </div>

      <div v-else-if="currentList.length === 0" class="text-center py-20 bg-white rounded-lg border border-gray-100 shadow-sm">
        <Package class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900">No {{ activeTab }} orders found</h3>
        <router-link to="/shop" class="text-[#280559] font-medium hover:underline mt-4 inline-block">
          Start Shopping
        </router-link>
      </div>

      <div v-else>
        <div 
          v-for="order in currentList" 
          :key="order.id" 
          class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 transition-all hover:shadow-md"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div class="lg:col-span-7 flex flex-col gap-6">
              
              <div class="flex flex-col gap-6">
                <div v-for="item in order.items" :key="item.productId" class="flex gap-6 items-start">
                  <div class="w-24 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                    <img 
                      :src="item.imageUrl || 'https://via.placeholder.com/150'" 
                      :alt="item.name" 
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-grow">
                    <h3 class="text-lg font-serif font-bold text-gray-900 leading-tight mb-1">
                      {{ item.name }}
                    </h3>
                    <p class="text-sm text-gray-500 mb-2">
                      <span v-if="item.brand">{{ item.brand }}</span>
                      <span v-if="item.variant" class="mx-1">• {{ item.variant }}</span>
                    </p>
                    <div class="flex items-center gap-2 mt-2">
                      <span class="font-bold text-gray-900">${{ item.price.toFixed(2) }}</span>
                      <span class="text-xs text-gray-400">x {{ item.quantity }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full h-px bg-gray-100"></div>

              <div>
                <p class="text-xs font-semibold text-gray-900 mb-2">Payment Information</p>
                <div class="flex items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded-lg border border-gray-200 w-fit">
                  <CreditCard class="w-5 h-5 text-green-700" />
                  <span>{{ order.paymentMethod || 'Online Payment' }}</span>
                </div>
              </div>

              <div class="w-full h-px bg-gray-100"></div>

              <div v-if="order.shippingAddress" class="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm flex items-start gap-4">
                <div class="p-2 bg-white rounded-lg shadow-sm text-gray-400">
                  <MapPin class="w-5 h-5" />
                </div>
                <div>
                  <p class="font-bold text-gray-900">{{ order.shippingAddress.fullName }}</p>
                  <p class="text-gray-600 mt-1">
                    {{ order.shippingAddress.houseNumber ? `#${order.shippingAddress.houseNumber},` : '' }} 
                    {{ order.shippingAddress.street }}<br>
                    {{ order.shippingAddress.community }}, {{ order.shippingAddress.district }}<br>
                    {{ order.shippingAddress.city }}
                  </p>
                  <p v-if="order.shippingAddress.phoneNumber" class="text-gray-500 mt-2 text-xs flex items-center gap-1">
                    <Phone class="w-3 h-3" /> {{ order.shippingAddress.phoneNumber }}
                  </p>
                </div>
              </div>

            </div>

            <div class="lg:col-span-5 flex flex-col">
              
              <div>
                <h4 class="text-2xl font-serif font-medium text-gray-900 mb-2">Order Detail</h4>
                <p class="text-sm text-gray-500 mb-1">
                  {{ formatDate(order.placedDate || order.orderDate) }}
                </p>
                <p class="text-sm text-gray-900 font-medium mb-1">
                  Order #{{ order.orderId }}
                </p>
                <p class="text-sm font-medium flex items-center gap-2">
                  Status: 
                  <span class="text-indigo-600 font-bold uppercase">{{ order.status.replace(/_/g, ' ') }}</span>
                </p>
              </div>

              <div class="mt-12 relative px-2 mb-8">
                <div class="absolute top-1.5 left-0 w-full h-1 bg-gray-100 rounded-full z-0"></div>
                <div 
                  class="absolute top-1.5 left-0 h-1 bg-indigo-900 rounded-full z-0 transition-all duration-1000" 
                  :style="{ width: getProgressWidth(order.status) }"
                ></div>

                <div class="relative z-10 flex justify-between w-full">
                  <div class="flex flex-col items-center">
                    <div 
                      class="w-4 h-4 rounded-full border-2 shadow-sm ring-1 ring-gray-100 transition-colors duration-500"
                      :class="isStepActive('PLACED', order.status) ? 'bg-indigo-900 border-white' : 'bg-white border-gray-300'"
                    ></div>
                    <div class="mt-3 text-center">
                      <p class="font-medium text-xs text-gray-900">Placed</p>
                      <p class="text-gray-400 text-[10px]">{{ formatDate(order.placedDate) }}</p>
                    </div>
                  </div>

                  <div class="flex flex-col items-center">
                    <div 
                      class="w-4 h-4 rounded-full border-2 shadow-sm ring-1 ring-gray-100 transition-colors duration-500"
                      :class="isStepActive('SHIPPED', order.status) ? 'bg-indigo-900 border-white' : 'bg-gray-200 border-white'"
                    ></div>
                    <div class="mt-3 text-center">
                      <p class="font-medium text-xs" :class="isStepActive('SHIPPED', order.status) ? 'text-gray-900' : 'text-gray-400'">Shipped</p>
                      <p v-if="order.shippedDate" class="text-gray-400 text-[10px]">{{ formatDate(order.shippedDate) }}</p>
                    </div>
                  </div>

                  <div class="flex flex-col items-center">
                    <div 
                      class="w-4 h-4 rounded-full border-2 shadow-sm ring-1 ring-gray-100 transition-colors duration-500"
                      :class="isStepActive('DELIVERED', order.status) ? 'bg-indigo-900 border-white' : 'bg-gray-200 border-white'"
                    ></div>
                    <div class="mt-3 text-center">
                      <p class="font-medium text-xs" :class="isStepActive('DELIVERED', order.status) ? 'text-gray-900' : 'text-gray-400'">Arrived</p>
                      <p v-if="order.estimatedArrivalDate" class="text-gray-400 text-[10px]">{{ formatDate(order.estimatedArrivalDate) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-xl p-5 border border-gray-200 mt-auto">
                <h2 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">Summary</h2>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span class="font-medium text-gray-900">${{ order.subtotal.toFixed(2) }}</span>
                  </div>
                  
                  <div class="flex justify-between text-gray-600">
                    <span>Items</span>
                    <span class="font-medium text-gray-900">{{ order.totalItems }}</span>
                  </div>
                  
                  <div class="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span class="font-medium text-gray-900">
                      {{ order.shippingCost > 0 ? '$' + order.shippingCost.toFixed(2) : 'Free' }}
                    </span>
                  </div>

                  <div class="pt-3 border-t border-gray-200 flex justify-between items-center mt-2">
                    <span class="font-bold text-gray-900">Total</span>
                    <span class="font-bold text-xl text-indigo-900">${{ order.total.toFixed(2) }}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>