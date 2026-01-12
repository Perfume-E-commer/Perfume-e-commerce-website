<template>
  <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 class="text-lg font-bold text-gray-900 mb-4">Payment Details</h3>
    
    <div id="card-element" class="p-4 border border-gray-300 rounded-lg mb-4 bg-gray-50">
      </div>

    <div v-if="errorMessage" class="text-red-600 text-sm mb-4">
      {{ errorMessage }}
    </div>

    <button
      @click="handlePayment"
      :disabled="isProcessing"
      class="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition flex justify-center items-center"
    >
      <span v-if="isProcessing" class="loader mr-2"></span>
      {{ isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}` }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';
import apiClient from '@/services/apiClient'; // Your Axios instance

const props = defineProps<{
  amount: number; // e.g., 50.00
  email: string;
}>();

const emit = defineEmits(['payment-success', 'payment-error']);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const isProcessing = ref(false);
const errorMessage = ref('');
let stripe: any = null;
let elements: any = null;
let card: any = null;

onMounted(async () => {
  stripe = await stripePromise;
  elements = stripe.elements();
  
  // Create and mount the Card Element
  card = elements.create('card', {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': { color: '#aab7c4' },
      },
    },
  });
  card.mount('#card-element');
});

const handlePayment = async () => {
  isProcessing.value = true;
  errorMessage.value = '';

  try {
    const amountInCents = Math.round(props.amount * 100);
    
    const { data } = await apiClient.post('/payment/create-intent', {
      amount: amountInCents,
      currency: 'usd',
      email: props.email
    });

    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: { email: props.email },
      },
    });

    if (result.error) {
      errorMessage.value = result.error.message;
      emit('payment-error', result.error);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        emit('payment-success', result.paymentIntent);
      }
    }
  } catch (error: any) {
    console.error(error);
    errorMessage.value = "Payment failed. Please try again.";
  } finally {
    isProcessing.value = false;
  }
};
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 1s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>