<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import userService from '@/services/userService'
import type { Address } from '@/services/userService'
import CheckoutCustomerInfo from './CheckoutCustomerInfo.vue'
import CheckoutAddressSelector from './CheckoutAddressSelector.vue'
import CheckoutOrderSummary from './CheckoutOrderSummary.vue'
import orderService from '@/services/orderService' 
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const savedAddresses = ref<Address[]>([])
const loadingData = ref(false)
const userInfo = ref({ firstName: '', lastName: '', email: '' })

const checkoutData = reactive({
  selectedAddress: null as Address | null,
  paymentMethod: '', 
  isProcessing: false,
})

onMounted(() => {
  cartStore.fetchCart()
  fetchProfileAndAddresses()
})

const fetchProfileAndAddresses = async () => {
  try {
    loadingData.value = true
    const response = await userService.getProfile()
    const data = response.data

    userInfo.value = {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
    }

    savedAddresses.value = data.addresses || []

    const defaultAddr = savedAddresses.value.find((a: Address) => a.isDefault)
    
    if (defaultAddr) {
      checkoutData.selectedAddress = defaultAddr
    } else if (savedAddresses.value.length > 0) {
      checkoutData.selectedAddress = savedAddresses.value[0] || null
    } else {
      checkoutData.selectedAddress = null
    }

  } catch (error) {
    console.error('Failed to fetch user data:', error)
  } finally {
    loadingData.value = false
  }
}

const handleCheckout = async () => {
  if (checkoutData.isProcessing || cartStore.isLoading) return

  if (!checkoutData.selectedAddress) {
    alert('Please select a shipping address.')
    return
  }
  if (!checkoutData.paymentMethod) {
    alert('Please select a payment method.')
    return
  }

  checkoutData.isProcessing = true

  const orderPayload = {
    shippingAddress: checkoutData.selectedAddress,
    paymentMethod: checkoutData.paymentMethod, 
    cartItems: cartStore.cart.items,
  }

  try {
    await orderService.placeOrder(orderPayload)
    alert('Order placed successfully!')
    router.push('/account/orders') 
  } catch (error) {
    console.error('Checkout failed:', error)
    alert('Failed to place order. Please try again.')
  } finally {
    checkoutData.isProcessing = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto py-10 mt-20 px-4 md:px-6">
    <h1
      class="text-3xl lg:text-4xl text-black luxurious-roman-regular text-center mb-10 tracking-widest uppercase"
    >
      CHECKOUT
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr] gap-10 lg:gap-20">
      <div class="checkout-left-panel text-black">
        <form @submit.prevent="handleCheckout">
          <CheckoutCustomerInfo
            :first-name="userInfo.firstName"
            :last-name="userInfo.lastName"
            :email="userInfo.email"
          />

          <CheckoutAddressSelector
            v-model="checkoutData.selectedAddress"
            :addresses="savedAddresses"
            :loading="loadingData"
          />

          <div class="mb-8">
            <h3 class="text-xl luxurious-roman-regular mb-4 text-gray-800">Payment Method</h3>
            <div class="relative">
              <select
                v-model="checkoutData.paymentMethod"
                class="w-full appearance-none bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-[#280559] focus:border-[#280559] block p-4 pr-10 shadow-sm transition-colors cursor-pointer"
                required
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash (Pay on Delivery)</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-[#280559] text-white py-4 rounded-xl mt-2 text-lg font-bold hover:bg-opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-purple-900/10"
            :disabled="checkoutData.isProcessing"
          >
            {{ checkoutData.isProcessing ? 'Processing Order...' : 'Complete Order' }}
          </button>
        </form>
      </div>

      <CheckoutOrderSummary />
    </div>
  </div>
</template>