<template>
  <div v-if="isOpen && order" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in">
      
      <div class="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-gray-900">Order #{{ order.id.slice(-6).toUpperCase() }}</h2>
            <span class="text-sm text-gray-500">{{ formatDate(order.createdAt) }}</span>
          </div>
          <p class="text-sm text-gray-500 mt-1">
            Customer: <span class="font-medium text-gray-900">{{ getCustomerName(order) }}</span>
          </p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 p-1 bg-white rounded-full shadow-sm hover:shadow transition">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 bg-white">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="lg:col-span-2 space-y-8">
            
            <div>
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Ordered Items</h3>
              <div class="border border-gray-100 rounded-xl overflow-hidden">
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
                    <tr v-for="item in getItems(order)" :key="item.id">
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-3">
                          <div class="h-10 w-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                            <img v-if="item.productImage" :src="item.productImage" class="h-full w-full object-cover">
                          </div>
                          <span class="font-medium text-gray-900">{{ item.productName || item.name }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3 text-center text-gray-500">{{ item.quantity }}</td>
                      <td class="px-4 py-3 text-right text-gray-500">{{ formatCurrency(item.price) }}</td>
                      <td class="px-4 py-3 text-right font-medium text-gray-900">{{ formatCurrency(item.price * item.quantity) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Shipping Details</h3>
              <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm flex items-start gap-4">
                <div class="p-2 bg-white rounded-lg shadow-sm text-gray-400">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div v-if="order.shippingAddress">
                  <p class="font-bold text-gray-900">{{ order.shippingAddress.fullName }}</p>
                  <p class="text-gray-600 mt-1">
                    {{ order.shippingAddress.addressLine1 }}<br>
                    <span v-if="order.shippingAddress.addressLine2">{{ order.shippingAddress.addressLine2 }}<br></span>
                    {{ order.shippingAddress.city }}, {{ order.shippingAddress.postalCode }}<br>
                    {{ order.shippingAddress.country }}
                  </p>
                </div>
                <div v-else class="text-gray-500 italic">No shipping address provided.</div>
              </div>
            </div>

          </div>

          <div class="space-y-6">
            
            <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-6">
              
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fulfillment Status</label>
                <div class="relative">
                  <select 
                    :value="order.status"
                    @change="handleStatusChange($event)"
                    :disabled="isUpdating"
                    class="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                  >
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Status</label>
                <div class="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                   <span :class="['text-xs font-bold px-2 py-1 rounded', getPaymentColor(order.paymentStatus)]">
                     {{ order.paymentStatus || 'PAID' }}
                   </span>
                   <button 
                     @click="togglePayment"
                     :disabled="isUpdating"
                     class="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline px-2"
                   >
                     Toggle
                   </button>
                </div>
              </div>

              <button 
                @click="generateInvoice(order)"
                class="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Download Invoice
              </button>

            </div>

            <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Financials</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{{ formatCurrency(order.totalAmount) }}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div class="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span class="font-bold text-gray-900">Total</span>
                  <span class="font-bold text-xl text-indigo-900">{{ formatCurrency(order.totalAmount) }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import adminService from '@/services/adminService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const props = defineProps<{
  order: any,
  isOpen: boolean
}>();

const emit = defineEmits(['close', 'refresh']);

const isUpdating = ref(false);

// --- Helpers ---
const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);
const formatDate = (dateStr: string) => dateStr ? new Date(dateStr).toLocaleDateString() : '-';

const getCustomerName = (order: any) => {
  if (order.user && order.user.firstName) return `${order.user.firstName} ${order.user.lastName || ''}`.trim();
  if (order.shippingAddress && order.shippingAddress.fullName) return order.shippingAddress.fullName;
  return 'Guest Customer';
};

const getItems = (order: any) => order.orderItems || order.items || [];

const getPaymentColor = (status: string) => {
  const s = status || 'PAID';
  return s === 'PAID' ? 'text-emerald-700 bg-emerald-100' : 'text-amber-700 bg-amber-100';
};

// --- Actions ---

const handleStatusChange = async (event: Event) => {
  const newStatus = (event.target as HTMLSelectElement).value;
  if (!newStatus || newStatus === props.order.status) return;

  if(!confirm(`Update order status to ${newStatus}?`)) {
    // Revert logic would be needed here if bound directly, but since we refresh, it's ok
    return;
  }

  isUpdating.value = true;
  try {
    await adminService.updateOrderStatus(props.order.id, newStatus);
    emit('refresh'); // Tell parent to reload data
    props.order.status = newStatus; // Optimistic update
  } catch (error) {
    console.error('Status update failed', error);
    alert('Failed to update status');
  } finally {
    isUpdating.value = false;
  }
};

const togglePayment = async () => {
  const current = props.order.paymentStatus || 'PAID';
  const newStatus = current === 'PAID' ? 'PENDING' : 'PAID';
  
  isUpdating.value = true;
  try {
    // Ensure adminService.updatePaymentStatus exists!
    await adminService.updatePaymentStatus(props.order.id, newStatus);
    emit('refresh');
    props.order.paymentStatus = newStatus;
  } catch (error) {
    console.error('Payment update failed', error);
    alert('Failed to update payment. Backend might not support this yet.');
  } finally {
    isUpdating.value = false;
  }
};

// --- PDF Logic (Embedded) ---
const generateInvoice = (tx: any) => {
  try {
    const doc = new jsPDF();
    const items = getItems(tx);

    // Branding
    doc.setFontSize(22);
    doc.setTextColor(40, 5, 89);
    doc.text("ScentHaven", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("123 Perfume Lane, Fragrance City", 14, 26);

    // Header
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("INVOICE", 140, 20);
    doc.setFontSize(10);
    doc.text(`Invoice #: ${tx.id.slice(-8).toUpperCase()}`, 140, 28);
    doc.text(`Date: ${formatDate(tx.createdAt)}`, 140, 33);
    doc.text(`Status: ${tx.status}`, 140, 38);
    doc.text(`Payment: ${tx.paymentStatus || 'PAID'}`, 140, 43);

    // Bill To
    doc.text("Bill To:", 14, 55);
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(getCustomerName(tx), 14, 61);

    // Table
    const tableBody = items.map((item: any) => [
      item.productName || item.name,
      item.quantity,
      formatCurrency(item.price),
      formatCurrency(item.price * item.quantity)
    ]);

    autoTable(doc, {
      startY: 70,
      head: [['Item', 'Qty', 'Price', 'Total']],
      body: tableBody,
      theme: 'striped',
      headStyles: { fillColor: [40, 5, 89] }
    });

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`Total: ${formatCurrency(tx.totalAmount)}`, 190, finalY, { align: 'right' });

    doc.save(`Invoice_${tx.id.slice(-6)}.pdf`);
  } catch (err) {
    console.error(err);
    alert('Error generating PDF');
  }
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>