<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-100 uppercase tracking-wider text-xs">
          <tr>
            <th class="px-6 py-4">Order #</th>
            <th class="px-6 py-4">Customer</th>
            <th class="px-6 py-4">Date</th>
            <th class="px-6 py-4">Items</th>
            <th class="px-6 py-4 text-right">Total</th>
            <th class="px-6 py-4 text-center">Payment</th>
            <th class="px-6 py-4 text-center">Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="isLoading">
            <td colspan="8" class="px-6 py-8 text-center text-gray-500">Loading transactions...</td>
          </tr>
          <tr v-else-if="transactions.length === 0">
            <td colspan="8" class="px-6 py-8 text-center text-gray-500">No transactions found matching filters.</td>
          </tr>

          <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-gray-50 transition group">
            <td class="px-6 py-4 font-mono text-indigo-600 font-medium">
              #{{ tx.id.slice(-6).toUpperCase() }}
            </td>
            <td class="px-6 py-4">
              <div class="flex flex-col">
                <span class="font-medium text-gray-900">{{ tx.user?.firstName }} {{ tx.user?.lastName }}</span>
                <span class="text-xs text-gray-500">{{ tx.email || tx.user?.email || 'Guest' }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-gray-500">
              {{ formatDate(tx.createdAt) }}
            </td>
            <td class="px-6 py-4 text-gray-500 max-w-xs truncate">
              <span v-if="tx.orderItems?.length > 0">
                {{ tx.orderItems[0].productName }}
                <span v-if="tx.orderItems.length > 1" class="text-xs bg-gray-100 rounded px-1 ml-1">+{{ tx.orderItems.length - 1 }} more</span>
              </span>
              <span v-else>-</span>
            </td>
            <td class="px-6 py-4 text-right font-bold text-gray-900">
              {{ formatCurrency(tx.totalAmount) }}
            </td>
            <td class="px-6 py-4 text-center">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {{ tx.paymentMethod || 'Credit Card' }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <span :class="['px-2.5 py-1 rounded-full text-xs font-bold border', getStatusClasses(tx.status)]">
                {{ tx.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2">
                <button 
                  @click="$emit('view', tx)"
                  class="text-indigo-600 hover:text-indigo-900 text-xs font-medium hover:underline"
                >
                  View
                </button>
                <button 
                  @click="generateInvoice(tx)"
                  class="text-gray-500 hover:text-gray-700 text-xs font-medium hover:underline flex items-center"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  PDF
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const props = defineProps<{
  transactions: any[],
  isLoading: boolean
}>();

defineEmits(['view']);

// Helpers
const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
const getStatusClasses = (status: string) => {
  switch (status) {
    case 'CONFIRMED': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'SHIPPED': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'DELIVERED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'CANCELLED': return 'bg-red-50 text-red-700 border-red-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

// 📄 PDF Generation Logic (Client-side Invoice)
const generateInvoice = (tx: any) => {
  const doc = new jsPDF();

  // Branding
  doc.setFontSize(22);
  doc.setTextColor(40, 5, 89); // Your brand purple
  doc.text("ScentHaven", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("123 Perfume Lane, Fragrance City", 14, 26);
  doc.text("support@scenthaven.com", 14, 31);

  // Invoice Header
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text("INVOICE", 140, 20);
  
  doc.setFontSize(10);
  doc.text(`Invoice #: ${tx.id.slice(-8).toUpperCase()}`, 140, 28);
  doc.text(`Date: ${new Date(tx.createdAt).toLocaleDateString()}`, 140, 33);
  doc.text(`Status: ${tx.status}`, 140, 38);

  // Bill To
  doc.text("Bill To:", 14, 45);
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text(tx.user?.firstName ? `${tx.user.firstName} ${tx.user.lastName}` : (tx.email || 'Guest Customer'), 14, 51);
  doc.setFontSize(10);
  doc.setTextColor(100);
  if (tx.shippingAddress) {
    doc.text(`${tx.shippingAddress.addressLine1}, ${tx.shippingAddress.city}`, 14, 56);
    doc.text(tx.shippingAddress.country, 14, 61);
  }

  // Items Table
  const tableBody = tx.orderItems?.map((item: any) => [
    item.productName,
    item.quantity,
    formatCurrency(item.price),
    formatCurrency(item.price * item.quantity)
  ]) || [];

  autoTable(doc, {
    startY: 70,
    head: [['Item Description', 'Qty', 'Unit Price', 'Amount']],
    body: tableBody,
    theme: 'striped',
    headStyles: { fillColor: [40, 5, 89] },
    columnStyles: {
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' }
    }
  });

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.text(`Subtotal:`, 140, finalY);
  doc.text(`${formatCurrency(tx.totalAmount)}`, 190, finalY, { align: 'right' });
  
  doc.setFontSize(12);
  doc.setTextColor(40, 5, 89);
  doc.text(`Total Due:`, 140, finalY + 10);
  doc.text(`${formatCurrency(tx.totalAmount)}`, 190, finalY + 10, { align: 'right' });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("Thank you for your business!", 105, 280, { align: 'center' });

  // Save
  doc.save(`Invoice_${tx.id.slice(-6)}.pdf`);
};
</script>