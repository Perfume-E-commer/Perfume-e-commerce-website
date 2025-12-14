<template>
  <div>
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Total Sales Card -->
      <TotalSaleOrder
        total_name="Total Sales"
        total_value="$25.6K"
        total_text="Sales"
        rate_fluctuation="↑ 12.3%"
        previous_value="$22.8K"
        :detailLink="'/dashboardaddproduct'"
      />

      <!-- Total Orders Card -->
      <TotalSaleOrder
        total_name="Total Orders"
        total_value="1.2K"
        total_text="Orders"
        rate_fluctuation="↑ 6.7%"
        previous_value="1.1K"
        :detailLink="'/dashboardaddproduct'"
      />
      <!-- Total Customers Card -->
      <!-- <TotalSaleOrder
          total_name="Total Customers"
          total_value="8.4K"
          total_text="Customers"
          rate_fluctuation="↑ 8.2%"
          previous_value="7.7K"
          :detailLink="'/dashboardaddproduct'"
        /> -->

      <!-- Pending & Canceled Card -->
      <PendingCanceled
        total_name="Pending & Canceled"
        :pending_count="423"
        :pending_users="120"
        :canceled_count="76"
        canceled_percentage="↓ 5.4%"
        :detailLink="'/dashboardaddproduct'"
      />
    </div>
    <div class="w-full mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          class="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow h-fit self-start"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h3 class="text-gray-900 text-xl font-semibold">Sales Overview</h3>

            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span class="flex items-center">
                <span class="w-3 h-3 bg-indigo-600 rounded-full mr-2"></span>
                This Week
              </span>
              <span class="flex items-center">
                <span class="w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
                Last Week
              </span>
            </div>
          </div>

          <div class="mb-6">
            <ValueBoxReportWeek
              :items="[
                { name: 'Sales Overview', value: '54k' },
                { name: 'Total Products', value: '12.4k' },
                { name: 'Stock Products', value: '8.4k' },
                { name: 'Out of Stock', value: '32.5k' },
                { name: 'Revenue', value: '32.5k' },
              ]"
            />
          </div>

          <!-- Chart (NO STRETCH) -->
          <div class="w-full">
            <ApexCharts height="250" />
          </div>
        </div>

        <!-- Category Section -->
        <div class="bg-white rounded-2xl shadow-sm p-2 hover:shadow-md transition-shadow">
          <viewCategory />
        </div>
      </div>
    </div>
    <div class="w-full mx-auto pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div
          class="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 lg:-mt-60 hover:shadow-md transition-shadow h-fit self-start"
        >
          <div class="lg:col-span-3">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h3 class="text-gray-900 text-xl font-semibold">Sales Overview</h3>

              <div class="relative inline-block">
                <!-- button sorting or filtering -->
                <ButtonRectangle @click="toggleDropdown" :style="{ hover: 'shadow-xl' }">
                  Filter
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 6.45898H2.5C2.15833 6.45898 1.875 6.17565 1.875 5.83398C1.875 5.49232 2.15833 5.20898 2.5 5.20898H17.5C17.8417 5.20898 18.125 5.49232 18.125 5.83398C18.125 6.17565 17.8417 6.45898 17.5 6.45898Z"
                      fill="white"
                    />
                    <path
                      d="M15 10.625H5C4.65833 10.625 4.375 10.3417 4.375 10C4.375 9.65833 4.65833 9.375 5 9.375H15C15.3417 9.375 15.625 9.65833 15.625 10C15.625 10.3417 15.3417 10.625 15 10.625Z"
                      fill="white"
                    />
                    <path
                      d="M11.6654 14.791H8.33203C7.99036 14.791 7.70703 14.5077 7.70703 14.166C7.70703 13.8243 7.99036 13.541 8.33203 13.541H11.6654C12.007 13.541 12.2904 13.8243 12.2904 14.166C12.2904 14.5077 12.007 14.791 11.6654 14.791Z"
                      fill="white"
                    />
                  </svg>
                </ButtonRectangle>
                <div
                  v-if="selectedFilter"
                  class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <ul>
                    <li
                      v-for="filter in filters"
                      :key="filter"
                      @click="selectFilter(filter)"
                      class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {{ filter }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <viewTableBestSelling />
          </div>
          <div class="flex justify-end mt-4">
            <ButtonDetail :detailLink="detailLink" />
          </div>
        </div>

        <!-- Category Section -->

        <div
          class="bg-white p-6 lg:col-span-2 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="lg:col-span-2">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h3 class="text-gray-900 text-xl font-semibold">Transaction</h3>

              <div class="relative inline-block">
                <!-- button sorting or filtering -->
                <ButtonRectangle @click="toggleDropdown" :style="{ hover: 'shadow-xl' }">
                  Filter
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 6.45898H2.5C2.15833 6.45898 1.875 6.17565 1.875 5.83398C1.875 5.49232 2.15833 5.20898 2.5 5.20898H17.5C17.8417 5.20898 18.125 5.49232 18.125 5.83398C18.125 6.17565 17.8417 6.45898 17.5 6.45898Z"
                      fill="white"
                    />
                    <path
                      d="M15 10.625H5C4.65833 10.625 4.375 10.3417 4.375 10C4.375 9.65833 4.65833 9.375 5 9.375H15C15.3417 9.375 15.625 9.65833 15.625 10C15.625 10.3417 15.3417 10.625 15 10.625Z"
                      fill="white"
                    />
                    <path
                      d="M11.6654 14.791H8.33203C7.99036 14.791 7.70703 14.5077 7.70703 14.166C7.70703 13.8243 7.99036 13.541 8.33203 13.541H11.6654C12.007 13.541 12.2904 13.8243 12.2904 14.166C12.2904 14.5077 12.007 14.791 11.6654 14.791Z"
                      fill="white"
                    />
                  </svg>
                </ButtonRectangle>
                <div
                  v-if="selectedFilter"
                  class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <ul>
                    <li
                      v-for="filter in filters"
                      :key="filter"
                      @click="selectFilter(filter)"
                      class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {{ filter }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <viewTranslation />
          </div>
          <div class="flex justify-end mt-4">
            <ButtonDetail :detailLink="detailLink" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TotalSaleOrder from '../components/TotalSale&Order.vue'
import PendingCanceled from '../components/Pending&Canceled.vue'
import ApexCharts from '../components/ApexCharts.vue'
import ValueBoxReportWeek from '../components/ValueBoxReportWeek.vue'
import viewCategory from '../components/viewCategory.vue'
import viewTableBestSelling from '../components/viewTableBestSelling.vue'
import viewTranslation from '../components/viewTranslation.vue'
import ButtonRectangle from '../components/ButtonRectangle.vue'
import ButtonDetail from '../components/ButtonDetail.vue'
import { getHoverColor } from 'chart.js/helpers'
import { ref } from 'vue'

const selectedFilter = ref('')
const filters = ['Product', 'Today', 'This Week', 'This Month', 'This Year']
function toggleDropdown() {
  if (selectedFilter.value) {
    selectedFilter.value = ''
  } else {
    selectedFilter.value = 'This Week' // Default selection when opening
  }
}
// const filters = ['Today', 'This Week', 'This Month', 'This Year']
// const selectedFilter = ref('This Week')
function selectFilter(filter: string) {
  selectedFilter.value = filter
  // Implement filtering logic here
}

const detailLink = '/dashboardaddproduct'
</script>
