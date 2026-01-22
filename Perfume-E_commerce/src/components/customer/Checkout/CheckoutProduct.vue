<script setup lang="ts">
import { reactive, onMounted, computed, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import userService from '@/services/userService'
import type { Address } from '@/services/userService'

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
  payment: string
}

interface PickupFormData {
  email: string
  firstName: string
  lastName: string
  location: string
  phone: string
  payment: string
}

type DeliveryType = 'ship' | 'pickup'

const cartStore = useCartStore()

const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  payment: '',
}

const initialPickupData: PickupFormData = {
  email: '',
  firstName: '',
  lastName: '',
  location: '',
  phone: '',
  payment: '',
}

const checkoutData = reactive<{
  deliveryType: DeliveryType
  formData: CheckoutFormData
  pickupFormData: PickupFormData
  isProcessing: boolean
}>({
  deliveryType: 'ship',
  formData: initialFormData,
  pickupFormData: initialPickupData,
  isProcessing: false,
})

const savedAddresses = ref<Address[]>([])
const loadingAddresses = ref(false)
const showAddressSelector = ref(false)

onMounted(() => {
  cartStore.fetchCart()
  fetchUserAddresses()
})

const fetchUserAddresses = async () => {
  try {
    loadingAddresses.value = true
    const response = await userService.getProfile()
    savedAddresses.value = response.data.addresses || []
  } catch (error) {
    console.error('Failed to fetch addresses:', error)
  } finally {
    loadingAddresses.value = false
  }
}

const estimatedShipping = computed(() => 0.0)
const estimatedTax = computed(() => 0.0)

const total = computed(() => {
  return cartStore.cart.totalPrice + estimatedShipping.value + estimatedTax.value
})

const formatPrice = (value: number): string => {
  if (typeof value !== 'number' || isNaN(value)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

const selectAddress = (address: Address) => {
  checkoutData.formData.firstName = address.fullName.split(' ')[0] || ''
  checkoutData.formData.lastName = address.fullName.split(' ').slice(1).join(' ') || ''
  checkoutData.formData.address = `${address.houseNumber}, ${address.street}, ${address.village}, ${address.district}`
  checkoutData.formData.phone = address.phoneNumber || ''
  showAddressSelector.value = false
}

const handleCheckout = async (): Promise<void> => {
  if (checkoutData.isProcessing || cartStore.isLoading) return

  let requiredFields: string[] = []
  let formPayload: any

  if (checkoutData.deliveryType === 'ship') {
    requiredFields = ['email', 'firstName', 'address', 'phone', 'payment']
    const isFormValid = requiredFields.every(
      (key) => !!checkoutData.formData[key as keyof CheckoutFormData],
    )

    if (!isFormValid) {
      alert('Please fill in all required fields.')
      return
    }

    formPayload = {
      ...checkoutData.formData,
      deliveryType: checkoutData.deliveryType,
      cartItems: cartStore.cart.items,
    }
  } else {
    requiredFields = ['email', 'firstName', 'location', 'phone', 'payment']
    const isFormValid = requiredFields.every(
      (key) => !!checkoutData.pickupFormData[key as keyof PickupFormData],
    )

    if (!isFormValid) {
      alert('Please fill in all required fields.')
      return
    }

    formPayload = {
      ...checkoutData.pickupFormData,
      deliveryType: checkoutData.deliveryType,
      cartItems: cartStore.cart.items,
    }
  }

  checkoutData.isProcessing = true

  try {
    console.log('Final Order Payload:', formPayload)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert('Order placed successfully! Total: ' + formatPrice(total.value))
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
        <div class="mb-8">
          <h3 class="text-xl luxurious-roman-regular mb-4 text-gray-800">Delivery Options</h3>
          <div class="flex space-x-4">
            <button
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

              Pick Up
            </button>
          </div>
        </div>

        <form @submit.prevent="handleCheckout">
          <button
            type="button"
            class="border border-black px-5 py-2 rounded-lg mb-6 text-sm font-medium luxurious-roman-regular"
          >
            Order Checkout
          </button>

          <!-- Shipping Form -->
          <div v-if="checkoutData.deliveryType === 'ship'">
            <!-- Address Selector -->
            <div v-if="savedAddresses.length > 0" class="mb-6">
              <button
                type="button"
                @click="showAddressSelector = !showAddressSelector"
                class="w-full border-2 border-dashed border-gray-300 px-4 py-3 rounded-lg mb-4 text-sm font-medium text-gray-600 hover:border-gray-400 transition luxurious-roman-regular"
              >
                {{ showAddressSelector ? 'Hide Saved Addresses' : '+ Select from Saved Addresses' }}
              </button>

              <div v-if="showAddressSelector" class="mb-6 grid grid-cols-1 gap-3">
                <div
                  v-if="loadingAddresses"
                  class="text-center text-sm text-gray-500 py-4 luxurious-roman-regular"
                >
                  Loading addresses...
                </div>
                <button
                  v-else
                  v-for="(address, index) in savedAddresses"
                  :key="index"
                  type="button"
                  @click="selectAddress(address)"
                  class="text-left p-3 border border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition luxurious-roman-regular text-sm"
                >
                  <p class="font-medium text-gray-900">{{ address.fullName }}</p>
                  <p class="text-gray-600 text-xs mt-1">
                    {{ address.houseNumber }}, {{ address.street }}, {{ address.village }},
                    {{ address.district }}
                  </p>
                  <p class="text-gray-500 text-xs">{{ address.phoneNumber }}</p>
                </button>
              </div>
            </div>

            <input
              type="email"
              placeholder="Email"
              v-model="checkoutData.formData.email"
              class="w-full border rounded-lg border-gray-300 p-3 mb-4 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
              required
            />

            <div class="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                v-model="checkoutData.formData.firstName"
                class="w-full border rounded-lg border-gray-300 p-3 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                v-model="checkoutData.formData.lastName"
                class="w-full border rounded-lg border-gray-300 p-3 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Enter shipping address"
              v-model="checkoutData.formData.address"
              class="w-full border rounded-lg border-gray-300 p-3 mb-4 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              v-model="checkoutData.formData.phone"
              class="w-full border rounded-lg border-gray-300 p-3 mb-4 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
              required
            />

            <input
              type="text"
              placeholder="Payment Information"
              v-model="checkoutData.formData.payment"
              class="w-full border rounded-lg border-gray-300 p-3 mb-4 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
              required
            />
          </div>

          <!-- Pickup Form -->
          <div v-else>
            <div class="mb-4">
              <p class="text-sm text-gray-600 mb-3 luxurious-roman-regular">
                Select a location to pick up your order
              </p>
              <input
                type="text"
                placeholder="Enter address or postal code"
                v-model="checkoutData.pickupFormData.location"
                class="w-full border rounded-lg border-gray-300 p-3 mb-2 placeholder-gray-500 focus:ring-0 focus:border-gray-500 transition luxurious-roman-regular"
                required
              />
              <p class="text-xs text-gray-500 luxurious-roman-regular">
                Using a specific location such as a home address or postcode will get the most
                accurate results.
              </p>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-[#2E0249] text-white py-4 rounded-md mt-6 text-lg font-semibold hover:bg-purple-900 transition disabled:opacity-70 disabled:cursor-not-allowed luxurious-roman-regular"
            :disabled="checkoutData.isProcessing"
          >
            {{ checkoutData.isProcessing ? 'Processing...' : 'Finish Checkout' }}
          </button>
        </form>
      </div>

      <div class="checkout-right-panel">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
