<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
      
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-gray-900">
              {{ order.orderNumber || 'Order #' + order.id.slice(-6).toUpperCase() }}
            </h2>
            <span class="text-sm text-gray-500">
              {{ formatDate(order.createdAt) }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-1 flex items-center gap-2">
            Status: 
            <span :class="getStatusBadge(order.status).class">
              {{ getStatusBadge(order.status).label }}
            </span>
          </p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 p-2 bg-white rounded-full shadow-sm hover:shadow transition">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 bg-white">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="lg:col-span-2 space-y-8">
            
            <div>
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Ordered Items</h3>
              <div class="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <table class="w-full text-sm text-left">
                  <thead class="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                      <th class="px-4 py-3">Product</th>
                      <th class="px-4 py-3 text-center">Qty</th>
                      <th class="px-4 py-3 text-right">Price</th>
                      <th class="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="item in order.items" :key="item.productId">
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-3">
                          <div class="h-10 w-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-300 font-bold text-xs">
                            {{ item.productName.charAt(0) }}
                          </div>
                          <span class="font-medium text-gray-900">{{ item.productName }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center text-gray-500">{{ item.quantity }}</td>
                      <td class="px-4 py-3 text-right text-gray-500">${{ item.price.toFixed(2) }}</td>
                      <td class="px-4 py-3 text-right font-medium text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Payment Summary</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${{ (order.totalAmount + (order.discountAmount || 0)).toFixed(2) }}</span>
                </div>
                <div v-if="order.discountAmount > 0" class="flex justify-between text-emerald-600">
                  <span>Discount ({{ order.promoCodeUsed }})</span>
                  <span>-${{ order.discountAmount.toFixed(2) }}</span>
                </div>
                <div class="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span class="font-bold text-gray-900">Total Paid</span>
                  <span class="font-bold text-xl text-indigo-900">${{ order.totalAmount.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            
            <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Customer Details</h3>
              
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Name</p>
                    <p class="font-medium text-gray-900">{{ order.shippingAddress?.fullName || 'N/A' }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Email</p>
                    <p class="font-medium text-gray-900 break-all">{{ order.userEmail || 'No email provided' }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Phone</p>
                    <p class="font-medium text-gray-900">{{ order.shippingAddress?.phoneNumber || 'N/A' }}</p>
                  </div>
                </div>

                <div class="flex items-start gap-3 border-t border-gray-100 pt-4">
                  <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Shipping Address</p>
                    <div class="font-medium text-gray-900 text-sm mt-1">
                      {{ order.shippingAddress?.street }}<br>
                      {{ order.shippingAddress?.city }}, {{ order.shippingAddress?.zipCode }}<br>
                      <span class="text-xs text-gray-500 uppercase tracking-wide border border-gray-200 px-1 rounded">{{ order.shippingAddress?.type || 'HOME' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
               <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Management</h3>
               
               <div>
                 <label class="block text-xs font-medium text-gray-700 mb-1">Update Status</label>
                 <select 
                   :value="order.status" 
                   @change="$emit('update-status', order.id, ($event.target as HTMLSelectElement).value)"
                   class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                 >
                   <option value="PENDING">🕒 Pending</option>
                   <option value="CONFIRMED">✅ Confirmed</option>
                   <option value="SHIPPED">🚚 Shipped</option>
                   <option value="DELIVERED">📦 Delivered</option>
                   <option value="CANCELLED">❌ Cancelled</option>
                 </select>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  show: boolean,
  order: any
}>()

const emit = defineEmits(['close', 'update-status'])

// Helper: Formatter
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const getStatusBadge = (status: string) => {
  const map: any = {
    'PENDING': { label: 'Pending', class: 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold border border-amber-200' },
    'CONFIRMED': { label: 'Confirmed', class: 'text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs font-bold border border-blue-200' },
    'SHIPPED': { label: 'Shipped', class: 'text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs font-bold border border-indigo-200' },
    'DELIVERED': { label: 'Delivered', class: 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold border border-emerald-200' },
    'CANCELLED': { label: 'Cancelled', class: 'text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs font-bold border border-red-200' },
  }
  return map[status] || { label: status, class: 'text-gray-600 bg-gray-100' }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
</style>