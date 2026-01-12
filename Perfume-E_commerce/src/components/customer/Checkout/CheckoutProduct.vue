<script setup lang="ts">
import { reactive, onMounted, computed, ref } from 'vue'
import { useCartStore } from '../../../stores/cartStore'
import { useRouter } from 'vue-router'
import StripePayment from '../../payment/StripePayment.vue'
import apiClient from '../../../services/apiClient' 

const router = useRouter()
const cartStore = useCartStore()

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  zipCode: string
  phone: string
}
type DeliveryType = 'ship' | 'pickup'
type PaymentMethod = 'COD' | 'CARD'

// Initial State
const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zipCode: '',
  phone: '',
}

const checkoutData = reactive<{
  deliveryType: DeliveryType
  paymentMethod: PaymentMethod
  formData: CheckoutFormData
  isProcessing: boolean
}>({
  deliveryType: 'ship',
  paymentMethod: 'COD', // Default
  formData: initialFormData,
  isProcessing: false,
})

onMounted(() => {
  cartStore.fetchCart()
})

const estimatedShipping = computed(() => checkoutData.deliveryType === 'ship' ? 5.00 : 0.00)
const estimatedTax = computed(() => cartStore.cart.totalPrice * 0.10) 

const total = computed(() => {
  return cartStore.cart.totalPrice + estimatedShipping.value + estimatedTax.value
})

const isFormValid = computed(() => {
  const { email, firstName, lastName, address, phone } = checkoutData.formData
  return email && firstName && lastName && address && phone
})

const formatPrice = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const placeOrder = async (paymentStatus: string, transactionId: string | null = null) => {
  checkoutData.isProcessing = true
  try {
    const orderPayload = {
      userId: 'USER_ID_FROM_AUTH_STORE', 
      userEmail: checkoutData.formData.email,
      shippingAddress: {
        fullName: `${checkoutData.formData.firstName} ${checkoutData.formData.lastName}`,
        street: checkoutData.formData.address,
        city: checkoutData.formData.city || 'Phnom Penh',
        zipCode: checkoutData.formData.zipCode || '12000',
        phoneNumber: checkoutData.formData.phone,
        type: "HOME"
      },
      items: cartStore.cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        size: item.size
      })),
      paymentMethod: checkoutData.paymentMethod,
      paymentStatus: paymentStatus, 
      transactionId: transactionId,
      totalAmount: total.value
    }

    await apiClient.post('/orders/place', orderPayload) 

    cartStore.clearCart() 
    router.push('/successful')
    
  } catch (error) {
    console.error('Order placement failed:', error)
    alert('Failed to place order. Please try again.')
  } finally {
    checkoutData.isProcessing = false
  }
}

const handleCODCheckout = () => {
  if (!isFormValid.value) {
    alert('Please fill in all required fields.')
    return
  }
  placeOrder('PENDING')
}

const handleStripeSuccess = (paymentIntent: any) => {
  console.log("Stripe Payment Success:", paymentIntent)
  placeOrder('PAID', paymentIntent.id)
}

const handleStripeError = (error: any) => {
  console.error("Stripe Error:", error)
  alert("Payment processing failed: " + error.message)
}
</script>

<template>
  <div class="max-w-6xl mx-auto py-10 mt-20 px-4 md:px-6">
    <h1 class="text-3xl lg:text-4xl text-black luxurious-roman-regular text-center mb-10 tracking-widest uppercase">
      CHECKOUT
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr] gap-10 lg:gap-20">
      <div class="checkout-left-panel text-black">
        
        <div class="mb-8">
          <h3 class="text-xl luxurious-roman-regular mb-4 text-gray-800">Delivery Options</h3>
          <div class="flex space-x-4">
            <button
              class="px-8 py-3 border rounded-lg font-medium text-sm flex items-center transition"
              :class="checkoutData.deliveryType === 'ship' ? 'border-black bg-gray-50' : 'border-gray-300'"
              @click="checkoutData.deliveryType = 'ship'"
            >
              Ship
            </button>
            <button
              class="px-8 py-3 border rounded-lg font-medium text-sm flex items-center transition"
              :class="checkoutData.deliveryType === 'pickup' ? 'border-black bg-gray-50' : 'border-gray-300'"
              @click="checkoutData.deliveryType = 'pickup'"
            >
              Pick Up
            </button>
          </div>
        </div>

        <form @submit.prevent>
          <h3 class="text-xl luxurious-roman-regular mb-4 text-gray-800">Contact & Shipping</h3>
          
          <input
            type="email"
            placeholder="Email"
            v-model="checkoutData.formData.email"
            class="w-full border rounded-lg border-gray-300 p-3 mb-4 focus:border-black outline-none transition"
            required
          />

          <div class="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              v-model="checkoutData.formData.firstName"
              class="w-full border rounded-lg border-gray-300 p-3 focus:border-black outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              v-model="checkoutData.formData.lastName"
              class="w-full border rounded-lg border-gray-300 p-3 focus:border-black outline-none transition"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Address (Street, House No.)"
            v-model="checkoutData.formData.address"
            class="w-full border rounded-lg border-gray-300 p-3 mb-4 focus:border-black outline-none transition"
            required
          />

           <div class="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="City"
              v-model="checkoutData.formData.city"
              class="w-full border rounded-lg border-gray-300 p-3 focus:border-black outline-none transition"
            />
            <input
              type="text"
              placeholder="Zip Code"
              v-model="checkoutData.formData.zipCode"
              class="w-full border rounded-lg border-gray-300 p-3 focus:border-black outline-none transition"
            />
          </div>

          <input
            type="tel"
            placeholder="Phone Number"
            v-model="checkoutData.formData.phone"
            class="w-full border rounded-lg border-gray-300 p-3 mb-8 focus:border-black outline-none transition"
            required
          />

          <h3 class="text-xl luxurious-roman-regular mb-4 text-gray-800">Payment Method</h3>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div 
              @click="checkoutData.paymentMethod = 'COD'"
              class="cursor-pointer border rounded-lg p-4 flex items-center justify-center gap-2 transition"
              :class="checkoutData.paymentMethod === 'COD' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-300'"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span class="font-medium">Cash on Delivery</span>
            </div>
            <div 
              @click="checkoutData.paymentMethod = 'CARD'"
              class="cursor-pointer border rounded-lg p-4 flex items-center justify-center gap-2 transition"
              :class="checkoutData.paymentMethod === 'CARD' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-300'"
            >
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              <span class="font-medium text-indigo-700">Credit Card</span>
            </div>
          </div>

          <button
            v-if="checkoutData.paymentMethod === 'COD'"
            @click="handleCODCheckout"
            type="button"
            class="w-full bg-[#2E0249] text-white py-4 rounded-md text-lg font-semibold hover:bg-purple-900 transition disabled:opacity-70"
            :disabled="checkoutData.isProcessing"
          >
            {{ checkoutData.isProcessing ? 'Processing...' : 'Place Order (COD)' }}
          </button>

          <div v-else-if="checkoutData.paymentMethod === 'CARD'" class="animate-fade-in">
             <div v-if="!isFormValid" class="bg-yellow-50 text-yellow-800 p-4 rounded-lg text-sm mb-4 border border-yellow-200">
                Please fill in all shipping details above to unlock the card payment form.
             </div>
             
             <StripePayment 
                v-else
                :amount="total"
                :email="checkoutData.formData.email"
                @payment-success="handleStripeSuccess"
                @payment-error="handleStripeError"
             />
          </div>

        </form>
      </div>

      <div class="checkout-right-panel">
        <div class="order-summary-wrapper sticky top-24">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl luxurious-roman-regular text-gray-800">In Your Bag</h2>
            <router-link to="/cart" class="text-sm hover:underline text-gray-600">Edit</router-link>
          </div>

          <div class="text-sm space-y-2 pb-4 border-b border-gray-100">
            <div class="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span class="font-medium">{{ formatPrice(cartStore.cart.totalPrice) }}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span class="font-medium">{{ formatPrice(estimatedShipping) }}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Tax (10%)</span>
              <span class="font-medium">{{ formatPrice(estimatedTax) }}</span>
            </div>
          </div>

          <div class="flex justify-between pt-4">
            <strong class="text-lg">Total</strong>
            <strong class="text-xl font-bold text-gray-900">{{ formatPrice(total) }}</strong>
          </div>

          <div class="mt-6 space-y-4 max-h-96 overflow-y-auto pr-2">
            <div v-for="item in cartStore.cart.items" :key="item.productId" class="flex items-start gap-4">
               <div class="w-16 h-20 bg-gray-100 rounded overflow-hidden shrink-0 border border-gray-200">
                  <img :src="item.imageUrl" class="w-full h-full object-cover">
               </div>
               <div>
                  <p class="font-bold text-sm text-gray-900">{{ item.productName }}</p>
                  <p class="text-xs text-gray-500">Size: {{ item.size }} | Qty: {{ item.quantity }}</p>
                  <p class="text-xs font-semibold mt-1">{{ formatPrice(item.price * item.quantity) }}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>