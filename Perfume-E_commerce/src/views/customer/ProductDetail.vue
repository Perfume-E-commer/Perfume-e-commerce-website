<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types/clientProduct'

import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Scrolldown from '@/components/layout/Scrolldown.vue'
import ProductDetailPerfume from '@/components/customer/product/ProductDetailPerfume.vue'
import RatingProduct from '@/components/customer/product/RatingProduct.vue'
import ProductListPerfume from '@/components/customer/product/ProductListPerfume.vue'
import Loading from '@/components/layout/Loading.vue'

const route = useRoute()
const productStore = useProductStore()
const { products, currentProduct, loading } = storeToRefs(productStore)

const productId = computed(() => String(route.params.id || ''))

onMounted(async () => {
  const id = productId.value

  if (id) {
    await productStore.fetchProductById(id)
  }

  if (!products.value || products.value.length === 0) {
    await productStore.fetchProducts(0, 12)
  }
})

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

const displayCount = ref(4)
const shuffledProducts = ref<Product[]>([])

watch(
  products,
  (newProducts) => {
    if (!newProducts || newProducts.length === 0) return

    shuffledProducts.value = shuffleArray(
      newProducts.filter((p) => String(p.id) !== productId.value),
    )
  },
  { immediate: true },
)

const displayedProducts = computed(() => shuffledProducts.value.slice(0, displayCount.value))

const selectedProduct = computed<Product | undefined>(() => {
  if (currentProduct.value) return currentProduct.value

  const id = productId.value
  return products.value.find((p) => String(p.id) === id)
})

const productTitle = computed(() => selectedProduct.value?.name || '')
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden bg-white">
    <header>
      <Navbar />
    </header>

    <main>
      <!-- Breadcrumb -->
      <section>
        <div class="flex flex-row text-black items-center mt-30 px-5 gap-1 luxurious-roman-regular">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/productlist">Product</a>
          <span>/</span>
          <span>{{ productTitle }}</span>
        </div>
      </section>

      <!-- Product Detail -->
      <section v-if="!loading && selectedProduct">
        <ProductDetailPerfume
          :id="selectedProduct.id"
          :name="selectedProduct.name"
          :description="selectedProduct.descriptions || ''"
          :image="selectedProduct.image || ''"
          :price="selectedProduct.price || 0"
          :variants="selectedProduct.variants || []"
          :story="selectedProduct.productStorys || null"
          :stock="selectedProduct.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0"
          :average-rating="selectedProduct.averageRating || 0"
          :total-reviews="selectedProduct.totalReviews || 0"
        />
      </section>

      <section>
        <RatingProduct :product-id="selectedProduct?.id" />
      </section>

      <section>
        <h1
          class="text-center luxurious-roman-regular font-bold text-[#280559] text-3xl md:text-4xl lg:text-5xl mt-10 mb-10"
        >
          Discover More
        </h1>

        <ProductListPerfume v-if="displayedProducts.length > 0" :details-item="displayedProducts" />
      </section>
    </main>

    <footer>
      <Footer />
    </footer>

    <Scrolldown />
    <Loading v-if="loading" />
  </div>
</template>
