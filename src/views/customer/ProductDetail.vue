<script setup lang="ts">
import { computed } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Scrolldown from '@/components/layout/Scrolldown.vue'
import ProductDetailPerfume from '@/components/customer/product/ProductDetailPerfume.vue'
import RatingProduct from '@/components/customer/product/RatingProduct.vue'
import ProductListPerfume from '@/components/customer/product/ProductListPerfume.vue'
import { type Product } from '@/stores/productStore'
import { useRoute } from 'vue-router'

const route = useRoute()

const productTitle = (route.params.id as string) || ''
const productDescrption =
  (route.query.descriptions as string) || (route.params.descriptions as string) || ''
const productImage = (route.query.image as string) || (route.params.image as string) || ''
const productPrice = Number(route.query.price || route.params.price) || 0

// FIX: Make this computed so it updates if the URL updates
const productVariants = computed(() => {
  return (route.query.variants as string) || (route.params.variants as string) || '[]'
})
const productStory = computed(() => {
  return (route.query.story as string) || (route.params.story as string) || '{}'
})

const reviewer = [
  {
    avatar: '/Image/Product/Review1.png',
    name: 'Jack Smith',
    review:
      "Very lovely fragrance. Would recommend to individuals looking for a combination of sweetness and elegance in perfume. I like floral perfume, and this one is lovely, it's not overpowering. Nice, pleasant scent. I am happy with purchase.",
    date: 'June 03, 2023',
  },
  {
    avatar: '/Image/Product/Review2.png',
    name: 'Ashley ',
    review:
      "I like floral perfume, and this one is lovely, it's not overpowering. Nice, pleasant scent. I am happy with purchase.",
    date: 'January 05, 2023',
  },
  {
    avatar: '/Image/Product/Review3.png',
    name: 'John Doe',
    review:
      "I like floral perfume, and this one is lovely, it's not overpowering. Nice, pleasant scent. I am happy with purchase.",
    date: 'October 05, 2022',
  },
]

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
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <header>
      <Navbar />
    </header>

    <main>
      <section>
        <div class="flex flex-row items-center mt-30 mb-10 px-10 gap-1 luxurious-roman-regular">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/productlist">Product</a>
          <span>/</span>
          <span>{{ productTitle }}</span>
        </div>
      </section>

      <section>
        <ProductDetailPerfume
          :title="productTitle"
          :description="productDescrption"
          :image="productImage"
          :price="productPrice"
          :variants="productVariants"
          :story="productStory"
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
        <ProductListPerfume :detailsItem="productDetails" />
      </section>
    </main>

    <footer>
      <Footer />
    </footer>
    <Scrolldown />
  </div>
</template>
