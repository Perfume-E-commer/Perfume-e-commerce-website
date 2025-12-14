<template>
  <div class="relative overflow-x-auto shadow-xs rounded-base">
    <table class="w-full text-left text-sm rtl:text-right text-body">
      <thead
        class="text-xs text-body text-gray-500 bg-neutral-secondary-soft border-b rounded-base border-default"
      >
        <tr>
          <th scope="col" class="px-2 py-2">No</th>
          <th scope="col" class="px-2 py-2">Id Customers</th>
          <th scope="col" class="px-2 py-2">order Date</th>
          <th scope="col" class="px-2 py-2">status</th>
          <th scope="col" class="px-2 py-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="px-2 py-2 font-medium text-heading whitespace-nowrap">1.</th>
          <td class="px-2 py-2">C001</td>
          <td class="px-2 py-2">01 Oct | 11:29 am</td>
          <td class="px-2 py-2">
            <div class="flex items-center space-x-2">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#21C45D" />
              </svg>
              <div>Paid</div>
            </div>
          </td>
          <td class="px-2 py-2">$231</td>
        </tr>
        <tr>
          <th scope="row" class="px-2 py-2 font-medium text-heading whitespace-nowrap">2.</th>
          <td class="px-2 py-2">C002</td>
          <td class="px-2 py-2">01 Oct | 11:29 am</td>
          <td class="px-2 py-2">
            <div class="flex items-center space-x-2">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#F0D411" />
              </svg>
              <div>Paiding</div>
            </div>
          </td>
          <td class="px-2 py-2">$423</td>
        </tr>
        <tr>
          <th scope="row" class="px-2 py-2 font-medium text-heading whitespace-nowrap">3.</th>
          <td class="px-2 py-2">C003</td>
          <td class="px-2 py-2">01 Oct | 11:29 am</td>
          <td class="px-2 py-2">
            <div class="flex items-center space-x-2">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#21C45D" />
              </svg>
              <div>Paid</div>
            </div>
          </td>
          <td class="px-2 py-2">$99</td>
        </tr>
        <tr>
          <th scope="row" class="px-2 py-2 font-medium text-heading whitespace-nowrap">3.</th>
          <td class="px-2 py-2">C003</td>
          <td class="px-2 py-2">01 Oct | 11:29 am</td>
          <td class="px-2 py-2">
            <div class="flex items-center space-x-2">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#21C45D" />
              </svg>
              <div>Paid</div>
            </div>
          </td>
          <td class="px-2 py-2">$99</td>
        </tr>
        <tr>
          <th scope="row" class="px-2 py-2 font-medium text-heading whitespace-nowrap">3.</th>
          <td class="px-2 py-2">C003</td>
          <td class="px-2 py-2">01 Oct | 11:29 am</td>
          <td class="px-2 py-2">
            <div class="flex items-center space-x-2">
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="4" r="4" fill="#21C45D" />
              </svg>
              <div>Paid</div>
            </div>
          </td>
          <td class="px-2 py-2">$99</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
</script>
