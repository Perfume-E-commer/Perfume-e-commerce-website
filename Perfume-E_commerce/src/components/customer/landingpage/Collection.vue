<template>
  <!-- Best Selling Product Section -->
  <div class="container mx-auto px-4 py-8">
    <!-- Title -->
    <h1
      class="text-center luxurious-roman-regular font-bold text-[#280559] text-2xl md:text-4xl lg:text-5xl mb-6"
    >
      Best Selling Product
    </h1>
    <div class="grid grid-cols-1 gap-4 sm:gap-6 mt-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div class="overflow-hidden rounded-lg">
          <img
            src="/Image/HomePage/channel1.png"
            alt="Chanel N°5"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div class="overflow-hidden rounded-lg">
          <img
            src="/Image/HomePage/MissDior1.png"
            alt="Miss Dior"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <!-- Row 2: Desktop/Tablet shows 3 items side-by-side, Mobile stacks them -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div class="overflow-hidden rounded-lg">
          <img
            src="/Image/HomePage/OMBREE1.png"
            alt="Ombree"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div class="overflow-hidden rounded-lg">
          <img
            src="/Image/HomePage/DIOR_Dioramour1.png"
            alt="Dioramour"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div class="overflow-hidden rounded-lg">
          <img
            src="/Image/HomePage/BluePerfume1.png"
            alt="Bleu de Chanel"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  </div>
</template>
