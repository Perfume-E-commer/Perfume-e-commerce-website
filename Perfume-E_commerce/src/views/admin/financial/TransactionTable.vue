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
                <span class="font-medium text-gray-900">
                  {{ getCustomerName(tx) }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ getCustomerEmail(tx) }}
                </span>
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

// --- Helpers for Display & Safety ---

// 1. Robust Name Finder
const getCustomerName = (tx: any) => {
  // Try User Object first
  if (tx.user && tx.user.firstName) {
    return `${tx.user.firstName} ${tx.user.lastName || ''}`.trim();
  }
  // Try Shipping Address Name
  if (tx.shippingAddress && tx.shippingAddress.fullName) {
    return tx.shippingAddress.fullName;
  }
  // Fallback
  return 'Guest Customer';
};

// 2. Robust Email Finder
const getCustomerEmail = (tx: any) => {
  if (tx.email) return tx.email;
  if (tx.user && tx.user.email) return tx.user.email;
  return 'No Email'; // Or return '' to hide
};

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0);

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

// --- PDF Logic (Crash Proof) ---
const generateInvoice = (tx: any) => {
  try {
    const doc = new jsPDF();

    // Branding
    doc.setFontSize(22);
    doc.setTextColor(40, 5, 89);
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
    doc.text(`Invoice #: ${tx.id ? tx.id.slice(-8).toUpperCase() : 'UNKNOWN'}`, 140, 28);
    doc.text(`Date: ${formatDate(tx.createdAt)}`, 140, 33);
    doc.text(`Status: ${tx.status || 'N/A'}`, 140, 38);

    // Bill To (Using Safe Helpers)
    doc.text("Bill To:", 14, 45);
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(getCustomerName(tx), 14, 51);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    // Safety check for shipping address
    if (tx.shippingAddress) {
      const line1 = tx.shippingAddress.addressLine1 || '';
      const city = tx.shippingAddress.city || '';
      const country = tx.shippingAddress.country || '';
      doc.text(`${line1}, ${city}`, 14, 56);
      doc.text(country, 14, 61);
    } else {
      doc.text("No shipping address provided", 14, 56);
    }

    // Items Table
    const tableBody = (tx.orderItems || []).map((item: any) => [
      item.productName || 'Unknown Item',
      item.quantity || 0,
      formatCurrency(item.price),
      formatCurrency((item.price || 0) * (item.quantity || 0))
    ]);

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
    const safeId = tx.id ? tx.id.slice(-6) : 'invoice';
    doc.save(`Invoice_${safeId}.pdf`);
  
  } catch (err) {
    console.error("PDF Generation Error:", err);
    alert("Could not generate PDF. Missing order data.");
  }
};
</script>