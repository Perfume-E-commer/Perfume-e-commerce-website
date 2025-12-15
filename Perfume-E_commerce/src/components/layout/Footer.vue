<script setup lang="ts"></script>

<template>
  <footer class="w-full px-6 pb-10 bg-gray-100/50">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between pt-20 gap-20">
      <!-- Newsletter -->
      <div class="w-full md:w-1/3 text-black flex flex-col gap-4">
        <img src="/Logo.png" alt="Logo" class="w-[180px] md:w-[220px]" />

        <h1 class="luxurious-roman-regular font-medium text-xl md:text-2xl">
          Subscribe to Our Newsletter
        </h1>

        <p class="luxurious-roman-regular text-sm md:text-base font-light max-w-xs">
          Receive Updates on New Arrivals and Special Promotions
        </p>

        <div class="flex flex-row mt-1 w-full max-w-sm">
          <input
            type="email"
            placeholder="Enter your email"
            class="w-full bg-gray-200 luxurious-roman-regular rounded-l-lg outline-0 px-4 py-2"
          />
          <button class="bg-[#280559] text-white rounded-r-lg luxurious-roman-regular px-4 py-2">
            Submit
          </button>
        </div>
        <div class="flex flex-row gap-5">
          <div
            class="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook text-white"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
            </svg>
          </div>
          <div
            class="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram text-white"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M16.5 7.5v.01" />
            </svg>
          </div>
          <div
            class="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram text-white"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
            </svg>
          </div>
          <div
            class="w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok text-white"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-3 text-black lg:grid-cols-4 gap-20">
        <div class="flex flex-col">
          <h1 class="text-lg luxurious-roman-regular font-medium mb-2">Category</h1>
          <div class="text-sm luxurious-roman-regular font-light space-y-1">
            <p>Men</p>
            <p>Women</p>
            <p>All Fragrance</p>
          </div>
        </div>

        <div class="flex flex-col">
          <h1 class="text-lg luxurious-roman-regular font-bold mb-2">Shopping</h1>
          <div class="text-sm luxurious-roman-regular font-light space-y-1">
            <p>Payments</p>
            <p>Delivery options</p>
            <p>Buyer protection</p>
          </div>
        </div>

        <div class="flex flex-col">
          <h1 class="text-lg luxurious-roman-regular font-bold mb-2">Customer Care</h1>
          <div class="text-sm luxurious-roman-regular font-light space-y-1">
            <p>Help Center</p>
            <p>Terms & Conditions</p>
            <p>Privacy & refund</p>
            <p>Survey & feedback</p>
          </div>
        </div>

        <div class="flex flex-col">
          <h1 class="text-lg luxurious-roman-regular font-bold mb-2">Page</h1>
          <div class="text-sm luxurious-roman-regular font-light space-y-1">
            <p>About Us</p>
            <p>Shop</p>
            <p>Contact</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="max-w-7xl mx-auto border-t text-black border-gray-300 mt-10 pt-6 text-center md:text-base luxurious-roman-regular font-light"
    >
      &copy; 2025 ScentHaven Perfumes. All rights reserved.
    </div>
  </footer>
</template>
