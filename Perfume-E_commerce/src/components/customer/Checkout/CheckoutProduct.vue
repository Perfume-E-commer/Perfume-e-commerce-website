<script setup lang="ts">
<<<<<<< HEAD
import { reactive, onMounted, computed, ref } from 'vue'
import { useCartStore } from '../../../stores/cartStore'
import { useRouter } from 'vue-router'
import StripePayment from '../../payment/StripePayment.vue'
import apiClient from '../../../services/apiClient' 

const router = useRouter()
const cartStore = useCartStore()

=======
import { reactive, onMounted, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

// --- Assuming types are imported or defined as below ---
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
<<<<<<< HEAD
  city: string
  zipCode: string
  phone: string
}
type DeliveryType = 'ship' | 'pickup'
type PaymentMethod = 'COD' | 'CARD'

// Initial State
=======
  phone: string
  payment: string
}
type DeliveryType = 'ship' | 'pickup'
// ----------------------------------------------------

const cartStore = useCartStore()

// Initial State Definition
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
<<<<<<< HEAD
  city: '',
  zipCode: '',
  phone: '',
=======
  phone: '',
  payment: '',
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
}

const checkoutData = reactive<{
  deliveryType: DeliveryType
<<<<<<< HEAD
  paymentMethod: PaymentMethod
=======
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
  formData: CheckoutFormData
  isProcessing: boolean
}>({
  deliveryType: 'ship',
<<<<<<< HEAD
  paymentMethod: 'COD', // Default
=======
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
  formData: initialFormData,
  isProcessing: false,
})

onMounted(() => {
  cartStore.fetchCart()
})

<<<<<<< HEAD
const estimatedShipping = computed(() => checkoutData.deliveryType === 'ship' ? 5.00 : 0.00)
const estimatedTax = computed(() => cartStore.cart.totalPrice * 0.10) 
=======
// --- Computed Properties for Order Summary ---
const estimatedShipping = computed(() => 0.0)
const estimatedTax = computed(() => 0.0)
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7

const total = computed(() => {
  return cartStore.cart.totalPrice + estimatedShipping.value + estimatedTax.value
})

<<<<<<< HEAD
const isFormValid = computed(() => {
  const { email, firstName, lastName, address, phone } = checkoutData.formData
  return email && firstName && lastName && address && phone
})

=======
// --- Utility Functions ---
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
const formatPrice = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
<<<<<<< HEAD
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
=======
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// --- Final Checkout Handler ---
const handleCheckout = async (): Promise<void> => {
  if (checkoutData.isProcessing || cartStore.isLoading) return

  const requiredFields: (keyof CheckoutFormData)[] = [
    'email',
    'firstName',
    'address',
    'phone',
    'payment',
  ]
  const isFormValid = requiredFields.every((key) => !!checkoutData.formData[key])

  if (!isFormValid) {
    alert('Please fill in all required fields.')
    return
  }

  checkoutData.isProcessing = true

  try {
    console.log('Final Order Payload:', {
      ...checkoutData.formData,
      deliveryType: checkoutData.deliveryType,
      cartItems: cartStore.cart.items,
    })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert('Order placed successfully! Total: ' + formatPrice(total.value))
  } catch (error) {
    console.error('Checkout failed:', error)
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
    alert('Failed to place order. Please try again.')
  } finally {
    checkoutData.isProcessing = false
  }
}
<<<<<<< HEAD

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
=======
</script>
<template>
  <div class="max-w-6xl mx-auto py-10 mt-20 px-4 md:px-6">
    <h1
      class="text-3xl lg:text-4xl text-black luxurious-roman-regular text-center mb-10 tracking-widest uppercase"
    >
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
      CHECKOUT
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr] gap-10 lg:gap-20">
      <div class="checkout-left-panel text-black">
<<<<<<< HEAD
        
=======
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
        <div class="mb-8">
          <h3 class="text-xl luxurious-roman-regular mb-4 text-gray-800">Delivery Options</h3>
          <div class="flex space-x-4">
            <button
<<<<<<< HEAD
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
=======
              class="px-8 py-3 border transition duration-150 ease-in-out rounded-lg font-medium text-sm flex items-center luxurious-roman-regular"
              :class="{
                'border-black shadow-[0_0_0_1px_black]': checkoutData.deliveryType === 'ship',
                'border-gray-300 hover:border-black': checkoutData.deliveryType !== 'ship',
              }"
              @click="checkoutData.deliveryType = 'ship'"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2"
              >
                <path
                  d="M18 18.5C17.6022 18.5 17.2206 18.342 16.9393 18.0607C16.658 17.7794 16.5 17.3978 16.5 17C16.5 16.6022 16.658 16.2206 16.9393 15.9393C17.2206 15.658 17.6022 15.5 18 15.5C18.3978 15.5 18.7794 15.658 19.0607 15.9393C19.342 16.2206 19.5 16.6022 19.5 17C19.5 17.3978 19.342 17.7794 19.0607 18.0607C18.7794 18.342 18.3978 18.5 18 18.5ZM19.5 9.5L21.46 12H17V9.5M6 18.5C5.60218 18.5 5.22064 18.342 4.93934 18.0607C4.65804 17.7794 4.5 17.3978 4.5 17C4.5 16.6022 4.65804 16.2206 4.93934 15.9393C5.22064 15.658 5.60218 15.5 6 15.5C6.39782 15.5 6.77936 15.658 7.06066 15.9393C7.34196 16.2206 7.5 16.6022 7.5 17C7.5 17.3978 7.34196 17.7794 7.06066 18.0607C6.77936 18.342 6.39782 18.5 6 18.5ZM20 8H17V4H3C1.89 4 1 4.89 1 6V17H3C3 17.7956 3.31607 18.5587 3.87868 19.1213C4.44129 19.6839 5.20435 20 6 20C6.79565 20 7.55871 19.6839 8.12132 19.1213C8.68393 18.5587 9 17.7956 9 17H15C15 17.7956 15.3161 18.5587 15.8787 19.1213C16.4413 19.6839 17.2044 20 18 20C18.7956 20 19.5587 19.6839 20.1213 19.1213C20.6839 18.5587 21 17.7956 21 17H23V12L20 8Z"
                  fill="black"
                />
              </svg>

              Ship
            </button>

            <button
              class="px-8 py-3 border transition duration-150 ease-in-out rounded-lg font-medium text-sm flex items-center luxurious-roman-regular"
              :class="{
                'border-black shadow-[0_0_0_1px_black]': checkoutData.deliveryType === 'pickup',
                'border-gray-300 hover:border-black': checkoutData.deliveryType !== 'pickup',
              }"
              @click="checkoutData.deliveryType = 'pickup'"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2"
              >
                <path
                  d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z"
                  fill="black"
                />
              </svg>

>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
              Pick Up
            </button>
          </div>
        </div>

<<<<<<< HEAD
        <form @submit.prevent>
          <h3 class="text-xl luxurious-roman-regular mb-4 text-gray-800">Contact & Shipping</h3>
          
=======
        <form @submit.prevent="handleCheckout">
          <button
            type="button"
            class="border border-black px-5 py-2 rounded-lg mb-6 text-sm font-medium luxurious-roman-regular"
          >
            Order Checkout
          </button>

>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
          <input
            type="email"
            placeholder="Email"
            v-model="checkoutData.formData.email"
<<<<<<< HEAD
            class="w-full border rounded-lg border-gray-300 p-3 mb-4 focus:border-black outline-none transition"
=======
            class="w-full border rounded-lg border-gray-300 p-3 mb-4 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
            required
          />

          <div class="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              v-model="checkoutData.formData.firstName"
<<<<<<< HEAD
              class="w-full border rounded-lg border-gray-300 p-3 focus:border-black outline-none transition"
=======
              class="w-full border rounded-lg border-gray-300 p-3 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              v-model="checkoutData.formData.lastName"
<<<<<<< HEAD
              class="w-full border rounded-lg border-gray-300 p-3 focus:border-black outline-none transition"
=======
              class="w-full border rounded-lg border-gray-300 p-3 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
              required
            />
          </div>

          <input
            type="text"
<<<<<<< HEAD
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

=======
            placeholder="Select your address"
            v-model="checkoutData.formData.address"
            class="w-full border rounded-lg border-gray-300 p-3 mb-4 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
            required
          />

>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
          <input
            type="tel"
            placeholder="Phone Number"
            v-model="checkoutData.formData.phone"
<<<<<<< HEAD
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

=======
            class="w-full border rounded-lg border-gray-300 p-3 mb-4 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
            required
          />

          <input
            type="text"
            placeholder="Select Payment"
            v-model="checkoutData.formData.payment"
            class="w-full border rounded-lg border-gray-300 p-3 mb-4 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
            required
          />

          <button
            type="submit"
            class="w-full bg-[#2E0249] text-white py-4 rounded-md mt-6 text-lg font-semibold hover:bg-purple-900 transition disabled:opacity-70 disabled:cursor-not-allowed luxurious-roman-regular"
            :disabled="checkoutData.isProcessing"
          >
            {{ checkoutData.isProcessing ? 'Processing...' : 'Finish Checkout' }}
          </button>
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
        </form>
      </div>

      <div class="checkout-right-panel">
<<<<<<< HEAD
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
=======
        <div class="order-summary-wrapper">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl luxurious-roman-regular text-gray-800">In Your Bag</h2>
            <a href="/cart" class="text-sm luxurious-roman-regular hover:underline text-gray-600"
              >Edit</a
            >
          </div>

          <div class="text-sm luxurious-roman-regular space-y-2 pb-4">
            <div class="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span class="font-medium luxurious-roman-regular">{{
                formatPrice(cartStore.cart.totalPrice)
              }}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Estimated Shipping</span>
              <span class="font-medium luxurious-roman-regular">{{
                formatPrice(estimatedShipping)
              }}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Estimated Tax</span>
              <span class="font-medium luxurious-roman-regular">{{
                formatPrice(estimatedTax)
              }}</span>
            </div>
          </div>

          <div class="flex justify-between pt-4 border-t border-gray-200">
            <strong class="text-lg luxurious-roman-regular">Total</strong>
            <strong class="text-xl font-bold text-gray-900 luxurious-roman-regular"
              >${{ total.toFixed(2) }}</strong
            >
          </div>

          <div class="mt-6 pt-6 border-t border-gray-100 space-y-4">
            <div
              v-if="cartStore.isLoading"
              class="text-center text-sm text-gray-500 py-4 luxurious-roman-regular"
            >
              Loading items...
            </div>
            <div
              v-else-if="cartStore.cart.items.length === 0"
              class="text-center text-sm text-gray-500 py-4 luxurious-roman-regular"
            >
              Your cart is empty.
            </div>

            <div
              v-else
              v-for="item in cartStore.cart.items"
              :key="item.productId"
              class="flex items-start pb-4 border-b border-gray-100 last:border-b-0"
            >
              <div class="w-12 h-16 mr-4 shrink-0 bg-gray-100 border border-gray-200">
                <img
                  :src="item.imageUrl"
                  :alt="item.productName"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div class="flex-1">
                <p class="font-medium text-sm text-gray-800 leading-snug luxurious-roman-regular">
                  {{ item.productName }}
                </p>
                <p class="text-xs text-gray-600 mt-0.5 luxurious-roman-regular">
                  Size: {{ item.size }}
                </p>
                <p class="text-xs text-gray-600 luxurious-roman-regular">
                  QTY: {{ item.quantity }}
                </p>
              </div>
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<<<<<<< HEAD

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
=======
>>>>>>> c7e271fe7116ed2c91ea358234c845daeb9013f7
