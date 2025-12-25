<template>
  <div class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-gray-900 text-xl font-medium mb-2">Add New Product</h3>
      <a
        href="/maindashboard/dashboardaddproduct"
        class="text-[#6467F2] font-medium inline-flex items-center gap-2 hover:underline"
        ><svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 4.75C9.5 4.33579 9.16421 4 8.75 4C8.33579 4 8 4.33579 8 4.75L8.75 4.75L9.5 4.75ZM8 12.75C8 13.1642 8.33579 13.5 8.75 13.5C9.16421 13.5 9.5 13.1642 9.5 12.75H8.75H8ZM12.75 9.5C13.1642 9.5 13.5 9.16421 13.5 8.75C13.5 8.33579 13.1642 8 12.75 8V8.75V9.5ZM4.75 8C4.33579 8 4 8.33579 4 8.75C4 9.16421 4.33579 9.5 4.75 9.5V8.75V8ZM16.75 8.75H16C16 12.7541 12.7541 16 8.75 16V16.75V17.5C13.5825 17.5 17.5 13.5825 17.5 8.75H16.75ZM8.75 16.75V16C4.74594 16 1.5 12.7541 1.5 8.75H0.75H0C0 13.5825 3.91751 17.5 8.75 17.5V16.75ZM0.75 8.75H1.5C1.5 4.74594 4.74594 1.5 8.75 1.5V0.75V0C3.91751 0 0 3.91751 0 8.75H0.75ZM8.75 0.75V1.5C12.7541 1.5 16 4.74594 16 8.75H16.75H17.5C17.5 3.91751 13.5825 0 8.75 0V0.75ZM8.75 4.75L8 4.75L8 8.75H8.75H9.5L9.5 4.75L8.75 4.75ZM8.75 8.75H8V12.75H8.75H9.5V8.75H8.75ZM12.75 8.75V8H8.75V8.75V9.5H12.75V8.75ZM8.75 8.75V8H4.75V8.75V9.5H8.75V8.75Z"
            fill="#6467F2"
          />
        </svg>
        Add New
      </a>
    </div>
    <p class="text-gray-400 text-lg mb-4">Categories</p>
    <div class="space-y-4">
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
        <div class="flex items-center gap-2">
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 0.75L4.75 4.75L0.75 8.75"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
        <div class="flex items-center gap-2">
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 0.75L4.75 4.75L0.75 8.75"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
        <div class="flex items-center gap-2">
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 0.75L4.75 4.75L0.75 8.75"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </a>
    </div>
    <p class="text-gray-400 pt-6 text-lg mb-4">Product</p>
    <div class="space-y-4">
      <button
        class="flex justify-between items-center px-auto bg-write dark:bg-gray-800 w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
      >
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 gap-2 rounded-lg flex items-center justify-center">
            <img :src="per1" alt="Eau de Parfum Spray" />
          </div>
          <div class="ml-4">
            <h6 class="text-gray-900 text-xs font-medium">Eau de Parfum Spray</h6>
            <h6 class="text-green-700 text-xs">$176.00</h6>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="flex text-white bg-[#3E2C67] rounded-3xl px-3 py-1 items-center gap-2 hover:bg-[#6467F2] transition-colors duration-200"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9 3.95C7.9 3.53579 7.56421 3.2 7.15 3.2C6.73579 3.2 6.4 3.53579 6.4 3.95L7.15 3.95L7.9 3.95ZM6.4 10.35C6.4 10.7642 6.73579 11.1 7.15 11.1C7.56421 11.1 7.9 10.7642 7.9 10.35H7.15H6.4ZM10.35 7.9C10.7642 7.9 11.1 7.56421 11.1 7.15C11.1 6.73579 10.7642 6.4 10.35 6.4V7.15V7.9ZM3.95 6.4C3.53579 6.4 3.2 6.73579 3.2 7.15C3.2 7.56421 3.53579 7.9 3.95 7.9V7.15V6.4ZM13.55 7.15H12.8C12.8 10.2704 10.2704 12.8 7.15 12.8V13.55V14.3C11.0988 14.3 14.3 11.0988 14.3 7.15H13.55ZM7.15 13.55V12.8C4.02959 12.8 1.5 10.2704 1.5 7.15H0.75H0C0 11.0988 3.20116 14.3 7.15 14.3V13.55ZM0.75 7.15H1.5C1.5 4.02959 4.02959 1.5 7.15 1.5V0.75V0C3.20116 0 0 3.20116 0 7.15H0.75ZM7.15 0.75V1.5C10.2704 1.5 12.8 4.02959 12.8 7.15H13.55H14.3C14.3 3.20116 11.0988 0 7.15 0V0.75ZM7.15 3.95L6.4 3.95L6.4 7.15H7.15H7.9L7.9 3.95L7.15 3.95ZM7.15 7.15H6.4V10.35H7.15H7.9V7.15H7.15ZM10.35 7.15V6.4H7.15V7.15V7.9H10.35V7.15ZM7.15 7.15V6.4H3.95V7.15V7.9H7.15V7.15Z"
                fill="white"
              />
            </svg>
            Add
          </button>
        </div>
      </button>
      <button
        class="flex justify-between items-center px-auto bg-write dark:bg-gray-800 w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
      >
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 gap-2 rounded-lg flex items-center justify-center">
            <img :src="per2" alt="CHANCE EAU TENDRE" />
          </div>
          <div class="ml-4">
            <h4 class="text-gray-900 text-xs font-medium">CHANCE EAU TENDRE</h4>
            <h5 class="text-green-700 text-xs">$176.00</h5>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="flex text-white bg-[#3E2C67] rounded-3xl px-3 py-1 items-center gap-2 hover:bg-[#6467F2] transition-colors duration-200"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9 3.95C7.9 3.53579 7.56421 3.2 7.15 3.2C6.73579 3.2 6.4 3.53579 6.4 3.95L7.15 3.95L7.9 3.95ZM6.4 10.35C6.4 10.7642 6.73579 11.1 7.15 11.1C7.56421 11.1 7.9 10.7642 7.9 10.35H7.15H6.4ZM10.35 7.9C10.7642 7.9 11.1 7.56421 11.1 7.15C11.1 6.73579 10.7642 6.4 10.35 6.4V7.15V7.9ZM3.95 6.4C3.53579 6.4 3.2 6.73579 3.2 7.15C3.2 7.56421 3.53579 7.9 3.95 7.9V7.15V6.4ZM13.55 7.15H12.8C12.8 10.2704 10.2704 12.8 7.15 12.8V13.55V14.3C11.0988 14.3 14.3 11.0988 14.3 7.15H13.55ZM7.15 13.55V12.8C4.02959 12.8 1.5 10.2704 1.5 7.15H0.75H0C0 11.0988 3.20116 14.3 7.15 14.3V13.55ZM0.75 7.15H1.5C1.5 4.02959 4.02959 1.5 7.15 1.5V0.75V0C3.20116 0 0 3.20116 0 7.15H0.75ZM7.15 0.75V1.5C10.2704 1.5 12.8 4.02959 12.8 7.15H13.55H14.3C14.3 3.20116 11.0988 0 7.15 0V0.75ZM7.15 3.95L6.4 3.95L6.4 7.15H7.15H7.9L7.9 3.95L7.15 3.95ZM7.15 7.15H6.4V10.35H7.15H7.9V7.15H7.15ZM10.35 7.15V6.4H7.15V7.15V7.9H10.35V7.15ZM7.15 7.15V6.4H3.95V7.15V7.9H7.15V7.15Z"
                fill="white"
              />
            </svg>
            Add
          </button>
        </div>
      </button>
      <button
        class="flex justify-between items-center px-auto bg-write dark:bg-gray-800 w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
      >
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-200 gap-2 rounded-lg flex items-center justify-center">
            <img :src="per3" alt="BLEU DE CHANEL" />
          </div>
          <div class="ml-4">
            <h4 class="text-gray-900 text-xs font-medium">BLEU DE CHANEL</h4>
            <h5 class="text-green-700 text-xs">$132.00</h5>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="flex text-white bg-[#3E2C67] rounded-3xl px-3 py-1 items-center gap-2 hover:bg-[#6467F2] transition-colors duration-200"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9 3.95C7.9 3.53579 7.56421 3.2 7.15 3.2C6.73579 3.2 6.4 3.53579 6.4 3.95L7.15 3.95L7.9 3.95ZM6.4 10.35C6.4 10.7642 6.73579 11.1 7.15 11.1C7.56421 11.1 7.9 10.7642 7.9 10.35H7.15H6.4ZM10.35 7.9C10.7642 7.9 11.1 7.56421 11.1 7.15C11.1 6.73579 10.7642 6.4 10.35 6.4V7.15V7.9ZM3.95 6.4C3.53579 6.4 3.2 6.73579 3.2 7.15C3.2 7.56421 3.53579 7.9 3.95 7.9V7.15V6.4ZM13.55 7.15H12.8C12.8 10.2704 10.2704 12.8 7.15 12.8V13.55V14.3C11.0988 14.3 14.3 11.0988 14.3 7.15H13.55ZM7.15 13.55V12.8C4.02959 12.8 1.5 10.2704 1.5 7.15H0.75H0C0 11.0988 3.20116 14.3 7.15 14.3V13.55ZM0.75 7.15H1.5C1.5 4.02959 4.02959 1.5 7.15 1.5V0.75V0C3.20116 0 0 3.20116 0 7.15H0.75ZM7.15 0.75V1.5C10.2704 1.5 12.8 4.02959 12.8 7.15H13.55H14.3C14.3 3.20116 11.0988 0 7.15 0V0.75ZM7.15 3.95L6.4 3.95L6.4 7.15H7.15H7.9L7.9 3.95L7.15 3.95ZM7.15 7.15H6.4V10.35H7.15H7.9V7.15H7.15ZM10.35 7.15V6.4H7.15V7.15V7.9H10.35V7.15ZM7.15 7.15V6.4H3.95V7.15V7.9H7.15V7.15Z"
                fill="white"
              />
            </svg>
            Add
          </button>
        </div>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Img_men from '@/assets/perfume_men.png'
import Img_women from '@/assets/perfume_women.png'
import Img_exclu from '@/assets/perfume_exlusive.png'
import per1 from '@/assets/perfume1.png'
import per2 from '@/assets/perfume2.png'
import per3 from '@/assets/perfume3.png'
export default defineComponent({
  name: 'ViewCategory',
  data() {
    return {
      Img_men,
      Img_women,
      Img_exclu,
      per1,
      per2,
      per3,
    }
  },
  props: {},
})
</script>
