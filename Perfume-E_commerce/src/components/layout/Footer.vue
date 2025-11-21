<script setup lang="ts"></script>

<template>
  <footer class="w-full px-6 pb-10">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between pt-20 gap-20">
      <!-- Newsletter -->
      <div class="w-full md:w-1/3 flex flex-col gap-4">
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
            class="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer"
          ></div>
          <div
            class="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer"
          ></div>
          <div
            class="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer"
          ></div>
          <div
            class="w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer"
          ></div>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-20">
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
      class="max-w-7xl mx-auto border-t border-gray-300 mt-10 pt-6 text-center md:text-base luxurious-roman-regular font-light"
    >
      &copy; 2025 ScentHaven Perfumes. All rights reserved.
    </div>
  </footer>
</template>
