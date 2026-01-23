<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
  >
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in"
    >
      <!-- Modal Header -->
      <ModalHeader
        :order="order"
        @close="$emit('close')"
      />

      <!-- Modal Content -->
      <div class="flex-1 overflow-y-auto p-6 bg-white">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Items & Shipping -->
          <div class="lg:col-span-2 space-y-8">
            <OrderItems :items="getItems(order)" />
            <ShippingDetails 
              :address="order.shippingAddress"
              :email="getCustomerEmail(order)"
            />
          </div>

          <!-- Right Column: Actions & Financials -->
          <div class="space-y-6">
            <OrderActions
              :order="order"
              :is-updating="isUpdating"
              @update-status="handleStatusChange"
              @toggle-payment="togglePayment"
              @download-invoice="downloadInvoice"
            />
            
            <OrderFinancials :order="order" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalHeader from './ModalHeader.vue'
import OrderItems from './OrderItems.vue'
import ShippingDetails from './ShippingDetails.vue'
import OrderActions from './OrderActions.vue'
import OrderFinancials from './OrderFinancials.vue'
import { generateInvoice } from '../../../utils/invoiceGenerator'

const props = defineProps<{
  order: any
  show: boolean
}>()

const emit = defineEmits(['close', 'refresh', 'update-status', 'toggle-payment'])
const isUpdating = ref(false)

// Helper methods
const getItems = (order: any) => order.orderItems || order.items || []

const getCustomerEmail = (order: any) => {
  if (order.email) return order.email
  if (order.userEmail) return order.userEmail
  if (order.user && order.user.email) return order.user.email
  if (order.user && order.user.username && order.user.username.includes('@'))
    return order.user.username
  return 'No Email'
}

// Actions
const downloadInvoice = () => {
  if (!props.order) return
  try {
    generateInvoice(props.order)
  } catch (e) {
    console.error('Invoice Error:', e)
    alert('Failed to generate invoice. Please try again.')
  }
}

const handleStatusChange = async (event: Event) => {
  const newStatus = (event.target as HTMLSelectElement).value
  if (!newStatus || !props.order || newStatus === props.order.status) return

  if (!confirm(`Update order status to ${newStatus}?`)) return

  isUpdating.value = true
  try {
    emit('update-status', props.order.id, newStatus)
  } finally {
    isUpdating.value = false
  }
}

const togglePayment = async () => {
  if (!props.order) return

  const current = props.order.paymentStatus || 'PAID'
  const newStatus = current === 'PAID' ? 'PENDING' : 'PAID'

  const canToggle = (order: any) => {
    const method = order.paymentMethod || 'Credit Card'
    return method.toLowerCase().includes('cash')
  }

  if (!canToggle(props.order) && newStatus === 'PENDING') {
    alert("You cannot mark a Credit Card order as Unpaid.")
    return
  }

  if (!confirm(`Update payment status to ${newStatus === 'PENDING' ? 'Unpaid' : 'Paid'}?`)) {
    return
  }

  isUpdating.value = true
  try {
    emit('toggle-payment', props.order.id, newStatus)
  } finally {
    isUpdating.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>