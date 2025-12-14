<template>
  <div>
    <div class="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Categories Management</h1>
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <ButtonRectangle
          textColor="white"
          btncolor="#280559"
          padding="px-4 py-2 sm:px-6 sm:py-3"
          rounded="rounded-lg"
          class="w-full sm:w-auto"
        >
          <RouterLink
            to="/maindashboard/dashboardaddorder"
            class="flex items-center justify-center gap-2"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="flex-shrink-0"
            >
              <path
                d="M11.6 5.8C11.6 5.24771 11.1523 4.8 10.6 4.8C10.0477 4.8 9.6 5.24771 9.6 5.8H10.6H11.6ZM9.6 15.4C9.6 15.9523 10.0477 16.4 10.6 16.4C11.1523 16.4 11.6 15.9523 11.6 15.4H10.6H9.6ZM15.4 11.6C15.9523 11.6 16.4 11.1523 16.4 10.6C16.4 10.0477 15.9523 9.6 15.4 9.6V10.6V11.6ZM5.8 9.6C5.24771 9.6 4.8 10.0477 4.8 10.6C4.8 11.1523 5.24771 11.6 5.8 11.6V10.6V9.6ZM20.2 10.6H19.2C19.2 15.3496 15.3496 19.2 10.6 19.2V20.2V21.2C16.4542 21.2 21.2 16.4542 21.2 10.6H20.2ZM10.6 20.2V19.2C5.85035 19.2 2 15.3496 2 10.6H1H0C0 16.4542 4.74578 21.2 10.6 21.2V20.2ZM1 10.6H2C2 5.85035 5.85035 2 10.6 2V1V0C4.74578 0 0 4.74578 0 10.6H1ZM10.6 1V2C15.3496 2 19.2 5.85035 19.2 10.6H20.2H21.2C21.2 4.74578 16.4542 0 10.6 0V1ZM10.6 5.8H9.6L9.6 10.6H10.6H11.6L11.6 5.8H10.6ZM10.6 10.6H9.6V15.4H10.6H11.6V10.6H10.6ZM15.4 10.6V9.6H10.6V10.6V11.6H15.4V10.6ZM10.6 10.6V9.6H5.8V10.6V11.6H10.6V10.6Z"
                fill="white"
              />
            </svg>
            <span>Add Order</span>
          </RouterLink>
        </ButtonRectangle>
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
            <span>More Action</span>
            <svg
              width="4"
              height="13"
              viewBox="0 0 4 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="flex-shrink-0"
            >
              <path
                d="M1.59922 9.60078C1.17487 9.60078 0.767906 9.76935 0.467848 10.0694C0.16779 10.3695 -0.000781298 10.7764 -0.000781298 11.2008C-0.000781298 11.6251 0.16779 12.0321 0.467848 12.3322C0.767906 12.6322 1.17487 12.8008 1.59922 12.8008C2.02357 12.8008 2.43053 12.6322 2.73059 12.3322C3.03065 12.0321 3.19922 11.6251 3.19922 11.2008C3.19922 10.7764 3.03065 10.3695 2.73059 10.0694C2.43053 9.76935 2.02357 9.60078 1.59922 9.60078ZM1.59922 4.80078C1.17487 4.80078 0.767906 4.96935 0.467848 5.26941C0.16779 5.56947 -0.000781298 5.97643 -0.000781298 6.40078C-0.000781298 6.82513 0.16779 7.23209 0.467848 7.53215C0.767906 7.83221 1.17487 8.00078 1.59922 8.00078C2.02357 8.00078 2.43053 7.83221 2.73059 7.53215C3.03065 7.23209 3.19922 6.82513 3.19922 6.40078C3.19922 5.97643 3.03065 5.56947 2.73059 5.26941C2.43053 4.96935 2.02357 4.80078 1.59922 4.80078ZM-0.000781298 1.60078C-0.000781298 1.17643 0.16779 0.769468 0.467848 0.469411C0.767906 0.169353 1.17487 0.000781059 1.59922 0.000781059C2.02357 0.000781059 2.43053 0.169353 2.73059 0.469411C3.03065 0.769468 3.19922 1.17643 3.19922 1.60078C3.19922 2.02513 3.03065 2.43209 2.73059 2.73215C2.43053 3.03221 2.02357 3.20078 1.59922 3.20078C1.17487 3.20078 0.767906 3.03221 0.467848 2.73215C0.16779 2.43209 -0.000781298 2.02513 -0.000781298 1.60078Z"
                fill="#023337"
              />
            </svg>
          </RouterLink>
        </ButtonRectangle>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <a
        href="/dashboardaddproduct"
        class="flex justify-between items-center px-auto bg-write dark:bg-gray-800 w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
      >
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 gap-2 rounded-lg flex items-center justify-center">
            <img :src="Img_men" alt="Men Perfume" />
          </div>
          <div class="ml-4">
            <h4 class="text-gray-900 font-medium">Men</h4>
          </div>
        </div>
      </a>
      <a
        href="/dashboardaddproduct"
        class="flex justify-between items-center px-auto bg-write dark:bg-gray-800 w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
      >
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 gap-2 rounded-lg flex items-center justify-center">
            <img :src="Img_women" alt="Women Perfume" />
          </div>
          <div class="ml-4">
            <h4 class="text-gray-900 font-medium">Women</h4>
          </div>
        </div>
      </a>
      <a
        href="/dashboardaddproduct"
        class="flex justify-between items-center px-auto bg-write dark:bg-gray-800 w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
      >
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 gap-2 rounded-lg flex items-center justify-center">
            <img :src="Img_exclu" alt="Exclusive Perfume" />
          </div>
          <div class="ml-4">
            <h4 class="text-gray-900 font-medium">Exclusive</h4>
          </div>
        </div>
      </a>
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
<script lang="ts">
import { defineComponent } from 'vue'
import ButtonRectangle from '@/views/components/ButtonRectangle.vue'
import Total_inOrder from '../components/Total_inOrder.vue'
import NavFilter from '../components/NavFilter.vue'
import Img_men from '@/assets/perfume_men.png'
import Img_women from '@/assets/perfume_women.png'
import Img_exclu from '@/assets/perfume_exlusive.png'
export default defineComponent({
  name: 'DashboardCategories',
  data() {
    return {
      Img_men,
      Img_women,
      Img_exclu,
    }
  },
  components: {
    ButtonRectangle,
    Total_inOrder,
    NavFilter,
  },
})
</script>
