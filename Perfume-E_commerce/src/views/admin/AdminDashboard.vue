<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />

    <div class="flex-1 p-6 sm:ml-64 mt-14">
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
      <!-- Charts Section -->
      <!-- <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <h3 class="text-gray-900 text-xl font-medium mb-4">Sales Overview</h3>
        <ApexCharts />
      </div> -->
      <!-- Charts Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-gray-900 text-xl font-semibold">Sales Overview</h3>
          <div class="flex items-center space-x-2 text-sm text-gray-600">
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
        <ApexCharts />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from '../layout/Sidebar.vue'
import TotalSaleOrder from '../components/TotalSale&Order.vue'
import PendingCanceled from '../components/Pending&Canceled.vue'
import ApexCharts from '../components/ApexCharts.vue'
</script>
