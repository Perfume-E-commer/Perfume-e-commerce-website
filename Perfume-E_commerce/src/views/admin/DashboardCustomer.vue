<template>
  <div class="p-2 space-y-8">
    <!-- Top Section -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  gap-4">
        <Total_inOrder total_name="Total Orders" total_value="1,240" rate_fluctuation="↑ 14.4%" />
        <Total_inOrder total_name="Completed Orders" total_value="980" rate_fluctuation="↑ 9.2%" />
        <Total_inOrder total_name="Cancelled Orders" total_value="120" rate_fluctuation="↓ 2.1%" />
      </div>

      <!-- Chart -->
      <div
        class="lg:col-span-3 bg-white rounded-xl shadow-sm p-2 hover:shadow-md transition-shadow"
      >
        <ApexCharts :height="'500'" />
      </div>
    </div>
    <div>
      <div class="relative overflow-x-auto bg-gray-50 shadow-xl">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-sm text-body bg-[#E9E7F8]">
            <tr>
              <th scope="col" class="px-6 py-5 font-medium rounded-tl-md rounded-bl-md">Product</th>
              <th scope="col" class="px-6 py-5 font-medium">Total Order</th>
              <th scope="col" class="px-6 py-5 font-medium">Status</th>
              <th scope="col" class="px-6 py-5 font-medium rounded-br-md rounded-tr-md">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                scope="row"
                class="px-6 py-4 space-x-2 flex items-center font-medium text-heading whitespace-nowrap bg-neutral-secondary-soft"
              >
                <div>
                  <img
                    src="/Image/HomePage/BlueChanel.png"
                    class="h-10 w-9 rounded-lg bg-gray-400"
                    alt=""
                  />
                </div>
                <div>Apple MacBook Pro 17</div>
              </th>
              <td class="px-6 py-4">101</td>
              <td class="px-6 py-4 bg-neutral-secondary-soft text-[#21C45D]">
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
                  <div>Stock</div>
                </div>
              </td>
              <td class="px-6 py-4">$2999</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="px-6 py-4 space-x-2 flex items-center font-medium text-heading whitespace-nowrap bg-neutral-secondary-soft"
              >
                <div>
                  <img
                    src="/Image/HomePage/BlueChanel.png"
                    class="h-10 w-9 rounded-lg bg-gray-400"
                    alt=""
                  />
                </div>
                <div>Apple MacBook Pro 17</div>
              </th>
              <td class="px-6 py-4">101</td>
              <td class="px-6 py-4 bg-neutral-secondary-soft text-[#F87171]">
                <div class="flex items-center space-x-2">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="4" cy="4" r="4" fill="#F87171" />
                  </svg>
                  <div>Stock out</div>
                </div>
              </td>
              <td class="px-6 py-4">$2999</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="px-6 py-4 space-x-2 flex items-center font-medium text-heading whitespace-nowrap bg-neutral-secondary-soft"
              >
                <div>
                  <img
                    src="/Image/HomePage/BlueChanel.png"
                    class="h-10 w-9 rounded-lg bg-gray-400"
                    alt=""
                  />
                </div>
                <div>Apple MacBook Pro 17</div>
              </th>
              <td class="px-6 py-4">101</td>
              <td class="px-6 py-4 bg-neutral-secondary-soft text-[#21C45D]">
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
                  <div>Stock</div>
                </div>
              </td>
              <td class="px-6 py-4">$2999</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="px-6 py-4 space-x-2 flex items-center font-medium text-heading whitespace-nowrap bg-neutral-secondary-soft"
              >
                <div>
                  <img
                    src="/Image/HomePage/BlueChanel.png"
                    class="h-10 w-9 rounded-lg bg-gray-400"
                    alt=""
                  />
                </div>
                <div>Apple MacBook Pro 17</div>
              </th>
              <td class="px-6 py-4">101</td>
              <td class="px-6 py-4 bg-neutral-secondary-soft text-[#21C45D]">
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
                  <div>Stock</div>
                </div>
              </td>
              <td class="px-6 py-4">$2999</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="px-6 py-4 space-x-2 flex items-center font-medium text-heading whitespace-nowrap bg-neutral-secondary-soft"
              >
                <div>
                  <img
                    src="/Image/HomePage/BlueChanel.png"
                    class="h-10 w-9 rounded-lg bg-gray-400"
                    alt=""
                  />
                </div>
                <div>Apple MacBook Pro 17</div>
              </th>
              <td class="px-6 py-4">101</td>
              <td class="px-6 py-4 bg-neutral-secondary-soft text-[#21C45D]">
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
                  <div>Stock</div>
                </div>
              </td>
              <td class="px-6 py-4">$2999</td>
            </tr>
            <tr>
              <th
                scope="row"
                class="px-6 py-4 space-x-2 flex items-center font-medium text-heading whitespace-nowrap bg-neutral-secondary-soft"
              >
                <div>
                  <img
                    src="/Image/HomePage/BlueChanel.png"
                    class="h-10 w-9 rounded-lg bg-gray-400"
                    alt=""
                  />
                </div>
                <div>Apple MacBook Pro 17</div>
              </th>
              <td class="px-6 py-4">101</td>
              <td class="px-6 py-4 bg-neutral-secondary-soft text-[#21C45D]">
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
                  <div>Stock</div>
                </div>
              </td>
              <td class="px-6 py-4">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Total_inOrder from '@/views/components/Total_inOrder.vue'
import ApexCharts from '../components/ApexCharts.vue'
export default {
  name: 'DashboardCustomer',
  components: { Total_inOrder, ApexCharts },
}
</script>
