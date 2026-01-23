<template>
  <div>
    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
      Ordered Items
    </h3>
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
          <tr v-for="item in items" :key="item.id">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    v-if="item.image"
                    :src="item.image"
                    class="h-full w-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center text-gray-400 text-xs"
                  >
                    IMG
                  </div>
                </div>
                <span class="font-medium text-gray-900">{{
                  item.productName || item.name
                }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-center text-gray-500">{{ item.quantity }}</td>
            <td class="px-4 py-3 text-right text-gray-500">
              {{ formatCurrency(item.price) }}
            </td>
            <td class="px-4 py-3 text-right font-medium text-gray-900">
              {{ formatCurrency(item.price * item.quantity) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: any[]
}>()

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val || 0)
</script>