<script setup lang="ts">
import { computed, onMounted } from 'vue'
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

// 2. FIND the product in the store using that ID (prefer currentProduct)
const selectedProduct = computed<Product | undefined>(() => {
  if (currentProduct.value) return currentProduct.value
  const id = productId.value
  return (
    products.value.find((p) => String(p.id) === id || p.name === id || (p as any).title === id) ||
    undefined
  )
})

// 3. Map the data safely. If products aren't loaded yet, provide defaults.
const productTitle = computed(() => selectedProduct.value?.name || '')
// const productDescription = computed(() => selectedProduct.value?.descriptions || '')
// const productImage = computed(() => selectedProduct.value?.image || '')
// const productPrice = computed(() => selectedProduct.value?.price || 0)
// const productStock = computed(() => {
//   return variants.reduce((sum, v) => sum + (v.stock || 0), 0)
// })

// const variants = selectedProduct.value?.variants || []

// No JSON.parse needed anymore, just grab the array/object directly
// const productVariants = computed(() => selectedProduct.value?.variants || [])
// const productStory = computed(() => selectedProduct.value?.productStorys || null)

// Get other products for "Discover More"
// `products` is a ref from the storeToRefs call

const reviewer = [
  {
    avatar: '/Image/Product/Review1.png',
    name: 'Jack Smith',
    review: 'Very lovely fragrance...',
    date: 'June 03, 2023',
  },
  {
    avatar: '/Image/Product/Review2.png',
    name: 'Ashley ',
    review: 'I like floral perfume...',
    date: 'January 05, 2023',
  },
  {
    avatar: '/Image/Product/Review3.png',
    name: 'John Doe',
    review: 'I like floral perfume...',
    date: 'October 05, 2022',
  },
]
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden bg-white">
    <header>
      <Navbar />
    </header>

    <main>
      <section>
        <div class="flex flex-row text-black items-center mt-30 px-5 gap-1 luxurious-roman-regular">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/productlist">Product</a>
          <span>/</span>
          <span>{{ productTitle }}</span>
        </div>
      </section>

      <section v-if="!loading">
        <ProductDetailPerfume
          :id="selectedProduct?.id"
          :name="selectedProduct?.name || ''"
          :description="selectedProduct?.descriptions || ''"
          :image="selectedProduct?.image || ''"
          :price="selectedProduct?.price || 0"
          :variants="selectedProduct?.variants || []"
          :story="selectedProduct?.productStorys || null"
          :stock="selectedProduct?.variants?.reduce((sum, v) => sum + (v.stock || 0), 0) || 0"
        />
      </section>

      <section>
        <RatingProduct :reviewer="reviewer" />
      </section>

      <section>
        <h1
          class="text-center luxurious-roman-regular font-bold text-[#280559] text-3xl md:text-4xl lg:text-5xl mt-10 mb-10"
        >
          Discover More
        </h1>

        <ProductListPerfume v-if="products && products.length > 0" :details-item="products" />
      </section>
    </main>

    <footer>
      <Footer />
    </footer>
    <Scrolldown />
    <Loading v-if="loading" />
  </div>
</template>
