<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Main from '@/components/customer/landingpage/Main.vue'
import LimitedEdition from '@/components/customer/landingpage/LimitedEdition.vue'
import OverlayPerfume from '@/components/customer/landingpage/OverlayPerfume.vue'
import ValuePerfume from '@/components/customer/landingpage/ValuePerfume.vue'
import Collection from '@/components/customer/landingpage/Collection.vue'
import Promotion from '@/components/customer/landingpage/Promotion.vue'
import Articles from '@/components/customer/landingpage/Articles.vue'
import ProductListPerfume from '@/components/customer/product/ProductListPerfume.vue'
import { useProductStore } from '@/stores/productStore'
import { onMounted, watch, ref, computed } from 'vue'
import Loading from '@/components/layout/Loading.vue'
import EditionComponent from '@/components/customer/landingpage/EditionComponent.vue'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { products, loading } = storeToRefs(productStore)
const { fetchAllProducts } = productStore

const displayCount = ref(4)
const displayedProducts = computed(() => products.value.slice(0, displayCount.value))
const loadMoreProducts = () => {
  displayCount.value += 4
}
const collapseProducts = () => {
  displayCount.value = 4
}

onMounted(() => {
  fetchAllProducts()
  console.log('perfume list: ', productStore.products)
})
watch(products, () => {
  console.log('Perfume List', productStore.products)
})

const lastedArticles = [
  {
    image: '/Image/HomePage/Green1.png',
    title: 'The smoothing Symphony of Muguet Perfume: Unlocking the secrets of a Fragrant Elixir',
    description:
      'Muguet, with its enchanting aroma and rich history, has been cherished for centuries as a symbol of relaxation, healing, and timeless beauty. In the world of perfumery, lavender plays a key role in creating captivating fragrances loved by many.',
  },
  {
    image: '/Image/HomePage/Dior-Sauvage-Eau-De-Parfum.png',
    title: 'The Art of Curating a Luxury Perfume Collection: A Symphony of Scents and Stories',
    description:
      "A luxury perfume collection is of Fragrances, it is a reflection of one's taste. Personality, and experience. Each bottle holds a unique olfactory journey, crafted with the finest ingredient and artistic mastery.",
  },
  {
    image: '/Image/HomePage/Red1.png',
    title: 'The Timeless Elegance of Archies Perfumes: Unveiling the Queen of Flowers in Fragrance',
    description:
      "Rose, often referred to as the ”Queen of Flowers”. has held as special place in human culture and history for centuries. Beyond it's captivating beauty, this iconic bloom has also inspired perfumes to create some of the most timeless and exquisite fragrance in the world.",
  },
]
const limitedBanners = [
  {
    title: 'The Legacy Collection',
    subtitle: 'Rare releases crafted for uniqueness',
    image: '/Image/HomePage/LimitedEdittion.png',
    featured: true,
  },
  {
    title: 'Midnight Oud',
    subtitle: 'Dark, bold, and exclusive',
    image: '/Image/HomePage/DiorOverlay.png',
  },
  {
    title: 'Velvet Rose',
    subtitle: 'Soft luxury for timeless moments',
    image: '/Image/HomePage/Red1.png',
  },
]
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <header class="bg-white z-100">
      <Navbar />
    </header>
    <main class="flex flex-col items-center justify-center">
      <section class="w-full flex flex-row justify-center items-center bg-white z-30">
        <Main
          image="/Image/HomePage/Main.png"
          title="Elevate Your Spirit with Victory Scented Fragrances!"
          text="waken your confidence and embrace the sweet smell of victory with ScentHaven—discover the fragrance that elevates your presence and defines who you are."
        />
      </section>
      <section>
        <OverlayPerfume
          image="/Image/HomePage/DiorOverlay.png"
          title="Welcome to ScentHaven"
          text='Welcome to ScentHaven Perfumes, where the spirit of victory and triumph come alive through scents that empower and inspire. Our curated collection, aptly named "Victory Scented," is a celebration of success and elegance, designed to unleash your victorious essence. Indulge in the sweet taste of triumph with captivating fragrances that tell the tale of your achievements. At ScentHaven, we believe that every victory deserves a signature scent, and we are dedicated to providing unforgettable fragrances that elevate your spirit and empower your journey.'
        />
      </section>

      <section class="w-full flex flex-row justify-center items-center bg-white z-30">
        <ValuePerfume
          image="/Image/HomePage/Bureberry.png"
          title="Our Values"
          text1="At Local Face, our perfume retail store is built on a foundation of passion and authenticity. We believe in celebrating the individuality of every customer, providing a diverse collection of scents that resonate with their unique personality and style. Our dedicated team of fragrance enthusiasts is committed to creating a welcoming and inclusive environment, where connections are forged, and inspiration thrives. "
          text2="Embracing sustainability and continuous learning, Local Face strives to be more than just a shopping destination; we are a community that inspires and empowers individuals on their fragrance journey."
        />
      </section>

      <section class="w-full bg-white z-30">
        <LimitedEdition :banners="limitedBanners" />
      </section>

      <section class="w-full bg-white z-30">
        <EditionComponent />
      </section>
      <section class="w-full bg-white z-30">
        <h1
          class="text-center luxurious-roman-regular font-bold text-[#280559] text-2xl md:text-4xl lg:text-5xl mb-6"
        >
          Best Selling Products
        </h1>
        <ProductListPerfume v-if="!loading" :details-item="displayedProducts" />
        <div v-else class="text-center text-black luxurious-regular-roman">
          Loading Product.....
        </div>
        <div class="flex justify-center mb-10 gap-4">
          <button
            @click="loadMoreProducts"
            v-if="displayCount < products.length"
            class="px-8 py-3 bg-[#280559] text-white font-semibold luxurious-roman-regular rounded-lg hover:bg-[#1a0438] transition-all duration-300 hover:scale-105"
          >
            See More
          </button>
          <button
            @click="collapseProducts"
            v-if="displayCount > 4"
            class="px-8 py-3 bg-[#280559] text-white font-semibold luxurious-roman-regular rounded-lg transition-all duration-300 hover:scale-105"
          >
            See Less
          </button>
        </div>
      </section>
      <section class="w-full bg-white z-30">
        <Collection />
      </section>
      <section class="w-full bg-white z-30">
        <Promotion
          title="Up to 50% Discount for Popular item if you checkout today"
          description="Discover an exquisite collection of premium perfumes at unbelievable prices during our exclusive Perfume Sale!"
          imageUrl="/Image/HomePage/Rectangle 15.png"
        />
      </section>
      <section class="w-full bg-white z-30">
        <Articles :articles="lastedArticles" />
      </section>
    </main>
    <footer class="bg-gray-50 z-50">
      <Footer />
    </footer>
    <Loading v-if="loading" />
  </div>
</template>
