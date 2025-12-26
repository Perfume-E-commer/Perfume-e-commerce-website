<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-hidden bg-white">
    <header class="bg-white z-50">
      <Navbar />
    </header>
    <div class="pt-24 px-6 text-sm text-gray-600 flex items-center mt-10 gap-1">
      <RouterLink
        to="/"
        class="luxurious-roman-regular text-gray-600 hover:text-[#280559] hover:underline cursor-pointer"
      >
        Home
      </RouterLink>
      <span>/</span>
      <RouterLink
        to="/aboutus"
        class="luxurious-roman-regular text-gray-800 hover:text-[#280559] hover:underline cursor-pointer"
      >
        About Us
      </RouterLink>
    </div>
    <section
      class="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center mt-8 rounded-xl overflow-hidden"
      style="background-image: url('/Image/AboutPage/DR.D_candid_shot 1.png')"
    >
      <div class="absolute inset-0 backdrop-blur-md bg-white/30"></div>
      <div class="relative z-10 text-center px-10 py-12 max-w-3xl">
        <h1
          class="luxurious-roman-regular font-bold text-4xl lg:text-5xl xl:text-6xl text-[#280559] leading-tight mb-4"
        >
          About Us
        </h1>
        <p class="luxurious-roman-regular text-black font-light text-lg lg:text-xl leading-relaxed">
          At Scent Haven, we believe that perfumes are more than just scents. They are expressions
          of individuality and style. Our passion for exquisite fragrances inspires us to curate
          collections that capture personality and elegance.
        </p>
      </div>
    </section>
    <section class="w-full py-20 bg-white flex justify-center px-6">
      <div class="max-w-3xl text-center text-black space-y-6">
        <h2
          class="luxurious-roman-regular font-bold text-3xl lg:text-4xl xl:text-5xl text-[#280559] leading-tight"
        >
          Our Story
        </h2>
        <p class="luxurious-roman-regular font-light text-back text-lg lg:text-xl leading-relaxed">
          Scent Haven Perfumes was founded by a group of fragrance enthusiasts with a shared vision
          to create a haven for perfume lovers seeking authentic, locally inspired fragrances.
          Inspired by cultural richness across the world, our journey is rooted in celebrating
          tradition, elegance, and artistry.
        </p>
      </div>
    </section>
    <section class="w-full">
      <img
        src="/Image/AboutPage/top of the brand 1.png"
        alt="Perfume Banner"
        class="w-full object-cover"
      />
    </section>
    <section class="w-full py-20 bg-white flex flex-col items-center px-6">
      <h2
        class="luxurious-roman-regular font-bold text-3xl lg:text-4xl xl:text-5xl text-center text-[#280559] leading-tight mb-10"
      >
        What Makes Us Unique
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
        <div class="space-y-4">
          <h3 class="luxurious-roman-regular font-bold text-xl lg:text-2xl text-[#280559]">
            Personalized Service
          </h3>
          <p class="luxurious-roman-regular font-light text-black text-lg leading-relaxed">
            We understand that choosing the perfect scent is a deeply personal experience. Our team
            of fragrance experts is always ready to assist you in finding a fragrance that
            complements your personality and style. Whether you’re exploring new scents or seeking
            to rediscover an old favorite, we’re here to guide you every step of the way.
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="luxurious-roman-regular font-bold text-xl lg:text-2xl text-[#280559]">
            High Quality Ingredients
          </h3>
          <p class="luxurious-roman-regular font-light text-black text-lg leading-relaxed">
            We believe that the key to an extraordinary scent lies in the quality of ingredients.
            That's why we collaborate with expert perfumes who source the finest and ethically
            sourced materials from around the world. We never compromise on the quality of our
            products, ensuring along lasting and luxurious experience.
          </p>
        </div>
        <div class="space-y-4">
          <h3 class="luxurious-roman-regular font-bold text-xl lg:text-2xl text-[#280559]">
            Locally Inspired
          </h3>
          <p class="luxurious-roman-regular font-light text-black text-lg leading-relaxed">
            Our perfumes are meticulously crafted to reflex the culture heritage, traditions, and
            landscapes of various regions. From the vibrant streets of Marrakech to the serene
            cheery blossom gardens of Kyoto, each fragrance tells a unique story that resonates with
            its origin.
          </p>
        </div>
      </div>
    </section>
    <div class="w-full text-left self-start px-5 mb-10">
      <p class="luxurious-roman-regular font-light text-black text-lg leading-relaxed mt-10">
        Join us on this olfactory adventure as we celebrate the diverse tapestry of scents from
        around the world. Discover the captivating aromas that embrace the essence of local cultures
        and connect with the beauty of our shared humanity.
      </p>
      <p class="luxurious-roman-regular font-light text-black text-lg mt-4">
        Thank you for being a part of our journey.
      </p>
      <p class="luxurious-roman-regular font-light text-black text-lg mt-4">
        With love and gratitude,
      </p>
      <p class="luxurious-roman-regular font-light text-black text-lg mt-4">The Scent Haven Team</p>
    </div>

    <footer class="bg-gray-50 z-50">
      <Footer />
    </footer>
  </div>
</template>
