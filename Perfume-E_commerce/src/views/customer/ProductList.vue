<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Scrolldown from '@/components/layout/Scrolldown.vue'
import MenuFilter from '@/components/customer/product/MenuFilter.vue'
import PanigationProduct from '@/components/customer/product/PanigationProduct.vue'
import SpecailOffers from '@/components/customer/product/SpecailOffers.vue'
import ProductListPerfume from '@/components/customer/product/ProductListPerfume.vue'
import { useProductStore } from '@/stores/productStore'
import { onMounted, watch } from 'vue'
import Loading from '@/components/layout/Loading.vue'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { products, loading } = storeToRefs(productStore)
const { fetchAllProducts } = productStore

onMounted(() => {
  fetchAllProducts()
  console.log('perfume list: ', productStore.products)
})
watch(products, () => {
  console.log('Perfume List', productStore.products)
})

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
      <section class="bg-white">
        <div
          class="flex flex-row items-center mt-30 mb-10 px-10 gap-1 text-base luxurious-roman-regular"
        >
          <a href="/">Home</a>
          <span>/</span>
          <a href="/productlist">Product</a>
        </div>
      </section>
      <h1
        class="text-center bg-white luxurious-roman-regular font-bold text-[#280559] text-2xl md:text-4xl lg:text-5xl"
      >
        Best Selling Products
      </h1>
      <section class="bg-white">
        <MenuFilter />
      </section>
      <section v-if="!loading" class="bg-white">
        <ProductListPerfume :details-item="products" />
      </section>
      <section>
        <PanigationProduct />
      </section>
      <section class="bg-white">
        <SpecailOffers :SpecialOffer="SpecialOffer" />
      </section>
    </main>
    <footer class="bg-gray-50 z-50">
      <Footer />
    </footer>
    <Scrolldown />
    <Loading v-if="loading" />
  </div>
</template>
