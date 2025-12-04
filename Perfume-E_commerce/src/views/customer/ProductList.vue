<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Scrolldown from '@/components/layout/Scrolldown.vue'
import MenuFilter from '@/components/customer/product/MenuFilter.vue'
import PanigationProduct from '@/components/customer/product/PanigationProduct.vue'
import SpecailOffers from '@/components/customer/product/SpecailOffers.vue'
import ProductListPerfume from '@/components/customer/product/ProductListPerfume.vue'
import { type Product } from '@/stores/productStore'

// 2. The Fixed Data Array
const productDetails: Product[] = [
  {
    title: 'Sauvage Dior',
    price: 120,
    image: '/Image/Product/Sauvage1.png',
    description:
      'SAUVAGE Dior is a bold, masculine fragrance inspired by vast open landscapes and fresh ozone skies. It blends a strong burst of citrus with ambroxan, elemi resin, and woody notes, creating a confident and instantly recognizable signature scent. Designed for authentic men, it offers a fresh, powerful character. The 1 oz and 3.4 oz bottles are refillable, supporting Dior’s sustainability goals by reducing climate impact, resource use, and waste.',
    variants: [
      { id: 1, size: '120 ml', price: 187.0, image: '/Image/Product/Sauvage1.png' },
      { id: 2, size: '100 ml', price: 150.0, image: '/Image/Product/Sauvage4.png' },
      { id: 3, size: '60 ml', price: 120.0, image: '/Image/Product/Sauvage3.png' },
      { id: 4, size: '30 ml', price: 89.0, image: '/Image/Product/Sauvage2.png' },
    ],

    productStory: {
      intro: {
        title: 'Product Details',
        content:
          'Step into a world of unparalleled opulence with Luxurious Elixir, an exquisite fragrance that weaves an enchanting symphony of gold and luxury. This gilded elixir is a celebration of sophistication, crafted with the finest essences and imbued with the allure of precious golden hues. From the first spritz to the lingering dry-down, Luxurious Elixir promises an intoxicating experience that embodies the essence of lavish indulgence.',
      },

      overture: {
        title: 'The Golden Overture',
        content:
          'Luxurious Elixir opens with a grand flourish of radiant citrus and sun-kissed fruits, reminiscent of golden rays caressing your senses. The opulent heart unfolds with a bouquet of velvety roses and rare blooms, their essence radiating with the allure of gilded petals. As the fragrance settles, a sumptuous blend of warm amber, creamy vanilla, and smooth sandalwood evokes a sense of ultimate luxury and refinement.',
      },

      keyNotes: [
        {
          id: 1,
          type: 'Top Note',
          scent: 'Citrus Accord, Sun-kissed Fruits',
          image: '/Image/Product/Mask group1.png',
        },
        {
          id: 2,
          type: 'Heart Note',
          scent: 'Golden Roses, Rare Blooms',
          image: '/Image/Product/Mask group2.png',
        },
        {
          id: 4,
          type: 'Base Note',
          scent: 'Amber, Vanilla, Sandalwood',
          image: '/Image/Product/Mask group3.png',
        },
      ],

      features: [
        {
          title: 'The Heart of Elegance',
          content:
            'Luxurious Elixir is the embodiment of elegance, drawing you into a world where glamour and prestige unite. With every spritz, the fragrance weaves a tapestry of glistening gold around you, enhancing your allure and capturing the admiration of those around.',
        },
        {
          title: 'The Ultimate Expression of Luxury',
          content:
            'Luxurious Elixir makes an extraordinary gift, an expression of your discerning taste and admiration for the extraordinary. Delight your loved ones with this lavish elixir, a symbol of admiration and adoration.',
        },
      ],
    },
  },
]

const SpecialOffer = [
  {
    image: '/Image/Product/Dior1.png',
    title1: 'Dark Blue Serenity',
    title2: 'Embrace the Tranquil Tides',
    promotion: 'Limited Time Offer 20% OFF on SAUVAGE Dior Perfume!',
    description:
      'Immerse yourself in the calming embrace of Dark Blue Serenity, a captivating fragrance that evokes the essence of water.',
  },
  {
    image: '/Image/Product/chanel1.png',
    title1: 'GOLDEN ANGEL',
    title2: 'Unleash Your Divine Glow',
    promotion: 'Limited Time Offer: 25% OFF on CANEL DE MOISELLE',
    description:
      'Indulge in divine allure of Golden Angle, a fragrance that embodies celestial elegance and radiance.',
  },
]
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <header class="bg-white z-50">
      <Navbar />
    </header>
    <main class="flex flex-col">
      <section>
        <div
          class="flex flex-row items-center mt-30 mb-10 px-10 gap-1 text-base luxurious-roman-regular"
        >
          <a href="/">Home</a>
          <span>/</span>
          <a href="/productlist">Product</a>
        </div>
      </section>
      <h1
        class="text-center luxurious-roman-regular font-bold text-[#280559] text-2xl md:text-4xl lg:text-5xl"
      >
        Best Selling Products
      </h1>
      <section>
        <MenuFilter />
      </section>
      <section>
        <ProductListPerfume :detailsItem="productDetails" />
      </section>
      <section>
        <PanigationProduct />
      </section>
      <section>
        <SpecailOffers :SpecialOffer="SpecialOffer" />
      </section>
    </main>
    <footer class="bg-gray-50 z-50">
      <Footer />
    </footer>
    <Scrolldown />
  </div>
</template>
