<template>
  <div class="w-full flex flex-col justify-center items-center p-4 mt-20">
    <div class="w-full max-w-sm md:max-w-lg flex flex-col items-center gap-5 md:gap-10 p-4 md:p-10">
      <img src="/Image/Successful/Food.png" alt="logo checkout" class="w-8/12 object-contain" />

      <div class="flex flex-col text-black gap-6 md:gap-10">
        <h1 class="text-2xl md:text-3xl text-center luxurious-roman-regular font-bold">
          Successful
        </h1>
        <p
          class="w-full md:w-80 text-xs md:text-sm text-black text-center luxurious-roman-regular font-light"
        >
          Your order will be delivered shortly. Thank you for choosing our services.
        </p>
      </div>

      <router-link
        class="w-full text-center text-sm text-white luxurious-roman-regular py-4 bg-[#280559]"
        to="/"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>
