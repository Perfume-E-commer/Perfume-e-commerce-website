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
const { fetchProducts, updateFilters, updateSort } = productStore

onMounted(() => {
  fetchProducts(0, 12)
  console.log('perfume list: ', productStore.products)
})

watch(products, () => {
  console.log('Perfume List', productStore.products)
})

const handleFilterChange = (filters: Record<string, any>) => {
  console.log('Filters applied:', filters)
  updateFilters(filters)
  fetchProducts(0, 4) 
}

const handleSortChange = (sortOption: string) => {
  console.log('Sort applied:', sortOption)
  updateSort(sortOption)
  fetchProducts(0, 4)
}

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
        <MenuFilter @filterChange="handleFilterChange" @sortChange="handleSortChange" />
      </section>
      <section v-if="!loading" class="bg-white">
        <div v-if="products.length === 0" class="flex flex-col items-center justify-center py-20">
          <svg
            class="w-24 h-24 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            ></path>
          </svg>
          <h3 class="text-2xl font-bold text-gray-800 mb-2">No Products Available</h3>
          <p class="text-gray-600 text-center max-w-md luxurious-roman-regular">
            The products matching your filters are not yet arrived to the store. Please try
            different filters or check back soon!
          </p>
        </div>
        <ProductListPerfume v-else :details-item="products" />
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
