<template>
  <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-6 transition-all hover:shadow-md">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-5 flex flex-col gap-6">
        <div>
          <OrderProduct 
            v-if="order.items && order.items.length > 0 && order.items[0]" 
            :item="order.items[0]" 
          />
          <p v-if="order.items.length > 1" class="text-xs text-indigo-600 font-medium mt-3 ml-28">
            + {{ order.items.length - 1 }} other items
          </p>
        </div>

        <div class="w-full h-px bg-gray-100"></div>
        <OrderPayment :method="order.paymentMethod" />
        <div class="w-full h-px bg-gray-100"></div>
        
        <OrderAddress 
          v-if="order.shippingAddress" 
          :address="order.shippingAddress" 
          :email="order.customerEmail"
        />
      </div>

      <div class="lg:col-span-4 flex flex-col">
          <div>
          <h4 class="text-2xl font-serif font-medium text-gray-900 mb-2">Order Detail</h4>
          <p class="text-sm text-gray-500 mb-1">{{ formatDate(order.orderDate) }}</p>
          <p class="text-sm text-gray-900 font-medium mb-1">Order #{{ order.orderId }}</p>
          <p class="text-sm font-medium flex items-center gap-2">
            Status: 
            <span :class="getStatusColor(order.status)">{{ order.status }}</span>
          </p>
        </div>

        <div class="mt-12 relative px-2">
            <div class="absolute top-1.5 left-0 w-full h-1 bg-gray-100 rounded-full z-0"></div>
            <div class="absolute top-1.5 left-0 h-1 bg-indigo-900 rounded-full z-0 transition-all duration-1000" :style="{ width: getProgressWidth(order.status) }"></div>

            <div class="relative z-10 flex justify-between w-full">
                <div class="flex flex-col items-center">
                    <div class="w-4 h-4 rounded-full bg-indigo-900 border-2 border-white shadow-sm ring-1 ring-gray-100"></div>
                    <div class="mt-3 text-center">
                        <p class="font-medium text-xs text-gray-900">Placed</p>
                        <p class="text-gray-400 text-[10px]">{{ formatDateShort(order.placedDate) }}</p>
                    </div>
                </div>
                
                <div class="flex flex-col items-center">
                    <div class="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100 transition-colors duration-500" :class="isStepActive(order.status, 'SHIPPED') ? 'bg-indigo-900' : 'bg-gray-200'"></div>
                    <div class="mt-3 text-center">
                        <p class="font-medium text-xs text-gray-900" :class="!isStepActive(order.status, 'SHIPPED') && 'text-gray-400'">Shipped</p>
                        <p class="text-gray-400 text-[10px]">{{ formatDateShort(order.shippedDate) }}</p>
                    </div>
                </div>

                <div class="flex flex-col items-center">
                    <div class="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100 transition-colors duration-500" :class="isStepActive(order.status, 'DELIVERED') ? 'bg-indigo-900' : 'bg-gray-200'"></div>
                    <div class="mt-3 text-center">
                        <p class="font-medium text-xs text-gray-900" :class="!isStepActive(order.status, 'DELIVERED') && 'text-gray-400'">Arrived</p>
                        <p class="text-gray-400 text-[10px]">{{ formatDateShort(order.estimatedArrivalDate) }}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="lg:col-span-3">
        <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h2 class="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4"> Summary </h2>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span class="font-medium text-gray-900">${{ formatPrice(order.subtotal) }}</span>
            </div>

            <div v-if="order.discountAmount && order.discountAmount > 0" class="flex justify-between text-emerald-600">
              <span>Discount <span v-if="order.promoCode">({{ order.promoCode }})</span></span>
              <span>-${{ formatPrice(order.discountAmount) }}</span>
            </div>

            <div class="flex justify-between text-gray-600">
              <span>Items</span>
              <span class="font-medium text-gray-900">{{ calculateTotalQuantity(order.items) }}</span>
            </div>

            <div class="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span class="font-medium text-gray-900">{{ order.shippingCost === 0 ? 'Free' : '$' + order.shippingCost }}</span>
            </div>

            <div class="pt-3 border-t border-gray-200 flex justify-between items-center mt-2">
              <span class="font-bold text-gray-900">Total</span>
              <span class="font-bold text-xl text-indigo-900">${{ formatPrice(order.total) }}</span>
            </div>
          </div>
        </div>

        <button 
          v-if="['PENDING', 'PLACED'].includes(order.status)"
          @click="$emit('cancel-order', order.id)"
          class="w-full mt-6 bg-white border border-red-100 text-red-600 hover:bg-red-50 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          Cancel Order
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import OrderProduct from './OrderProduct.vue'
import OrderPayment from './OrderPayment.vue'
import OrderAddress from './OrderAddress.vue'

// UPDATED: Flat structure to match Backend OrderItemDto
interface OrderItem {
  productId: string
  name: string
  brand?: string
  variant?: string
  imageUrl?: string
  category?: string
  occasion?: string
  price: number
  quantity: number
}

interface Address {
  fullName: string
  houseNumber: string
  street: string
  village: string
  community: string
  district: string
  city: string
  phoneNumber: string
}

interface Order {
  id: string;
  orderId: string;
  orderDate: string;
  status: string;
  subtotal: number;
  discountAmount?: number; 
  promoCode?: string;     
  totalItems: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  customerEmail?: string; 
  placedDate: string;
  shippedDate?: string;
  estimatedArrivalDate?: string;
  items: OrderItem[];
  shippingAddress?: Address;
}

defineProps<{
  order: Order
}>()

defineEmits(['cancel-order'])

// Helpers
const formatPrice = (price?: number) => (price || 0).toFixed(2)

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatDateShort = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const getStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'SHIPPED':
      return 'text-indigo-600 font-bold'
    case 'DELIVERED':
      return 'text-green-600 font-bold'
    case 'CANCELLED':
      return 'text-red-600 font-bold'
    default:
      return 'text-amber-600 font-bold'
  }
}

const isStepActive = (currentStatus: string, step: string) => {
  const status = currentStatus?.toUpperCase()
  if (step === 'SHIPPED') return ['SHIPPED', 'DELIVERED'].includes(status)
  if (step === 'DELIVERED') return status === 'DELIVERED'
  return false
}

const getProgressWidth = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'PLACED':
      return '0%'
    case 'SHIPPED':
      return '50%'
    case 'DELIVERED':
      return '100%'
    default:
      return '0%'
  }
}

const calculateTotalQuantity = (items: OrderItem[]) => {
  if (!items) return 0;
  return items.reduce((sum, item) => sum + item.quantity, 0);
};
</script>
