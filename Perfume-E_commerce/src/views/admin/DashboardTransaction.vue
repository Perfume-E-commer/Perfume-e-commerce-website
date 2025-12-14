<template>
  <div class="p-2 space-y-8">
    <!-- Top Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <Total_inOrder total_name="Total Revenue" total_value="1,240" rate_fluctuation="↑ 14.4%" />
        <Total_inOrder
          total_name="Completed Transactions"
          total_value="980"
          rate_fluctuation="↑ 9.2%"
        />
        <Total_inOrder
          total_name="Pending Transactions"
          total_value="120"
          rate_fluctuation="↓ 2.1%"
        />
        <Total_inOrder
          total_name="Failed Transactions"
          total_value="120"
          rate_fluctuation="↓ 2.1%"
        />
      </div>

      <!-- Chart -->
      <div
        class="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
      >
        <h3 class="text-gray-900 text-xl font-medium mb-2">Payment Method</h3>
        <div class="flex">
          <div>
            <div
              class="flex flex-col justify-around bg-gray-800 p-4 border border-white border-opacity-30 rounded-lg shadow-md max-w-xs mx-auto"
            >
              <div class="flex flex-row items-center justify-between mb-3">
                <input
                  class="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2 mb-3 flex-grow"
                  type="text"
                  name="cardName"
                  id="cardName"
                  placeholder="Full Name"
                />
                <div
                  class="flex items-center justify-center relative w-14 h-9 bg-gray-800 border border-white border-opacity-20 rounded-md"
                >
                  <svg
                    class="text-white fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                  >
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path
                      fill="#ff3d00"
                      d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex flex-col space-y-3">
                <input
                  class="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                />
                <div class="flex flex-row justify-between">
                  <input
                    class="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    placeholder="MM/AA"
                  />
                  <input
                    class="w-full h-10 border-none outline-none text-sm bg-gray-800 text-white font-semibold caret-orange-500 pl-2"
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="pl-6">
            <p class="text-gray-400 text-lg mt-4">
              Status: <span class="text-green-500">Active</span>
            </p>
            <p class="mt-2 text-gray-400 text-lg">
              Transactions: <span class="text-indigo-500">1,250</span>
            </p>
            <p class="mt-2 text-gray-400 text-lg">
              Revenue: <span class="text-indigo-500">$50,000</span>
            </p>
            <span class="mt-2 block">
              <a href="" class="text-indigo-500">View Transactions</a>
            </span>
          </div>
        </div>
        <div class="flex justify-between gap-4 mt-6">
          <ButtonRectangle
            textColor="#280559"
            btncolor="#FFFFFF"
            padding="px-4 py-2 sm:px-6 sm:py-3"
            rounded="rounded-lg"
            class="w-full sm:w-auto"
          >
            <RouterLink
              to="/maindashboard/dashboardaddorder"
              class="flex items-center justify-center gap-2"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1 5.55C11.1 5.13579 10.7642 4.8 10.35 4.8C9.93579 4.8 9.6 5.13579 9.6 5.55H10.35H11.1ZM9.6 15.15C9.6 15.5642 9.93579 15.9 10.35 15.9C10.7642 15.9 11.1 15.5642 11.1 15.15H10.35H9.6ZM15.15 11.1C15.5642 11.1 15.9 10.7642 15.9 10.35C15.9 9.93579 15.5642 9.6 15.15 9.6V10.35V11.1ZM5.55 9.6C5.13579 9.6 4.8 9.93579 4.8 10.35C4.8 10.7642 5.13579 11.1 5.55 11.1V10.35V9.6ZM19.95 10.35H19.2C19.2 15.2377 15.2377 19.2 10.35 19.2V19.95V20.7C16.0661 20.7 20.7 16.0661 20.7 10.35H19.95ZM10.35 19.95V19.2C5.46228 19.2 1.5 15.2377 1.5 10.35H0.75H0C0 16.0661 4.63385 20.7 10.35 20.7V19.95ZM0.75 10.35H1.5C1.5 5.46228 5.46228 1.5 10.35 1.5V0.75V0C4.63385 0 0 4.63385 0 10.35H0.75ZM10.35 0.75V1.5C15.2377 1.5 19.2 5.46228 19.2 10.35H19.95H20.7C20.7 4.63385 16.0661 0 10.35 0V0.75ZM10.35 5.55H9.6L9.6 10.35H10.35H11.1L11.1 5.55H10.35ZM10.35 10.35H9.6V15.15H10.35H11.1V10.35H10.35ZM15.15 10.35V9.6H10.35V10.35V11.1H15.15V10.35ZM10.35 10.35V9.6H5.55V10.35V11.1H10.35V10.35Z"
                  fill="#4B5563"
                />
              </svg>

              <span>Add Card</span>
            </RouterLink>
          </ButtonRectangle>
          <ButtonRectangle
            textColor="#280559"
            btncolor="#FFFFFF"
            padding="px-4 py-2 sm:px-6 sm:py-3"
            rounded="rounded-lg"
            class="w-full sm:w-auto border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300"
          >
            <RouterLink
              to="/maindashboard/dashboardaddorder"
              class="flex items-center justify-center text-red-500 gap-2"
            >
              <span>Deactivate</span>
            </RouterLink>
          </ButtonRectangle>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <NavFilter />
      </div>
      <div>
        <div class="relative overflow-x-auto bg-gray-50 shadow-xl">
          <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-[#E9E7F8]">
              <tr>
                <th scope="col" class="px-6 py-5 font-medium rounded-tl-md rounded-bl-md">
                  Product
                </th>
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
  </div>
</template>

<script>
import Total_inOrder from '@/views/components/Total_inOrder.vue'
import ApexCharts from '../components/ApexCharts.vue'
import ButtonRectangle from '@/views/components/ButtonRectangle.vue'
import NavFilter from '@/views/components/NavFilter.vue'
export default {
  name: 'DashboardTransaction',
  components: { Total_inOrder, ApexCharts, NavFilter, ButtonRectangle },
}
</script>
