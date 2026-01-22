<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Heart } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import type { ProductVariant, StorySection, KeyNote } from '@/types/clientProduct'
import { useCartStore, type AddToCartPayload } from '@/stores/cartStore'
import { useToastStore } from '@/stores/toastStore'
import { useWishlistStore } from '@/stores/wishlistStore'

type ScentNote = {
  type: string
  scent: string
  image: string
}

type ProductStorysType = {
  intro: StorySection
  overture: StorySection
  keyNotes: KeyNote[]
  features: StorySection[]
  scentNotes: ScentNote[]
}

const props = defineProps<{
  id: string | number | undefined
  name: string
  description: string
  image: string
  price: number
  stock: number
  variants: ProductVariant[] | string
  story: ProductStorysType | string | null
  averageRating?: number
  totalReviews?: number
  category?: string
}>()

const parsedVariants = computed<ProductVariant[]>(() => {
  if (!props.variants) return []
  if (typeof props.variants === 'string') {
    try {
      return JSON.parse(props.variants)
    } catch {
      return []
    }
  }
  return props.variants
})

const parsedStory = computed<ProductStorysType | null>(() => {
  if (!props.story) return null
  if (typeof props.story === 'string') {
    try {
      return JSON.parse(props.story)
    } catch {
      return null
    }
  }
  return props.story as ProductStorysType
})

const cartStore = useCartStore()
const toastStore = useToastStore()
const wishlistStore = useWishlistStore()
const router = useRouter()
const quantity = ref<number>(1)
const selectedVariant = ref<ProductVariant | null>(null)
const currentImage = ref<string>('')

const initialize = () => {
  if (parsedVariants.value && parsedVariants.value.length > 0) {
    selectedVariant.value = parsedVariants.value[0] as ProductVariant
    currentImage.value = selectedVariant.value!.imageUrl || props.image
  } else {
    selectedVariant.value = {
      id: 'default',
      size: 'Standard',
      imageUrl: props.image,
      price: props.price || 0,
      stock: props.stock || 0,
    }
    currentImage.value = props.image
  }
}

const handleImagePreview = (imagePath: string) => {
  currentImage.value = imagePath
}

const handleVariantClick = (variant: ProductVariant) => {
  selectedVariant.value = variant
  // Optional: Switch main image when variant is clicked
  // currentImage.value = variant.imageUrl
}

const addToCartHandler = async () => {
  if (!selectedVariant.value || !props.id || quantity.value < 1) {
    toastStore.showToast('Please select a valid product and quantity', 'error')
    return
  }

  const payload: AddToCartPayload = {
    productId: props.id as string,
    size: selectedVariant.value.size,
    quantity: quantity.value,
  }

  try {
    await cartStore.addToCart(payload)
    toastStore.showToast(`${props.name} has been added to your bag!`, 'success')
  } catch (error) {
    console.error('Failed to add to cart:', error)
    toastStore.showToast('Failed to add item to bag. Please try again.', 'error')
  }
}

const isInWishlist = computed(() => {
  return props.id ? wishlistStore.isInWishlist(String(props.id)) : false
})

const handleWishlistToggle = () => {
  if (!props.id) {
    toastStore.showToast('Unable to add to wishlist', 'error')
    return
  }

  const product = {
    id: String(props.id),
    name: props.name,
    price: selectedVariant.value?.price || props.price,
    image: currentImage.value || props.image,
    category: props.category,
    size: selectedVariant.value?.size,
    description: props.description,
  }

  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(String(props.id))
    toastStore.showToast(`${props.name} has been removed from your wishlist`, 'info')
  } else {
    wishlistStore.addToWishlist(product)
    toastStore.showToast(`${props.name} has been added to your wishlist!`, 'success')
  }
}

onMounted(() => {
  initialize()
})

watch(
  () => props.name,
  () => {
    initialize()
  },
)
</script>

<template>
  <div class="container max-w-8xl mx-auto px-4 py-6 md:py-10" v-if="selectedVariant">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-start">
      <div class="flex flex-col lg:flex-row gap-4 w-full">
        <div
          class="flex flex-row lg:flex-col gap-3 order-2 lg:order-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide"
        >
          <img
            v-for="(variant, index) in parsedVariants"
            :key="index"
            :src="variant.imageUrl || image"
            :alt="variant.size"
            @click="handleImagePreview(variant.imageUrl || image)"
            class="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-md border cursor-pointer shrink-0 transition-all duration-300"
            :class="
              currentImage === (variant.imageUrl || image)
                ? 'border-[#280559] opacity-100 ring-1 ring-[#280559]'
                : 'border-transparent opacity-60 hover:opacity-100'
            "
          />
        </div>

        <div
          class="relative w-full order-1 lg:order-2 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center"
        >
          <img
            :src="currentImage"
            :alt="name"
            class="w-full h-auto max-h-125 lg:max-h-150 object-contain mix-blend-multiply transition-opacity duration-300"
          />
        </div>
      </div>

      <div class="flex flex-col gap-6 text-[#280559]">
        <div class="flex flex-col gap-2 luxurious-roman-regular">
          <h1 class="text-3xl md:text-4xl lg:text-5xl uppercase leading-tight">{{ name }}</h1>
          <p class="text-gray-600 leading-relaxed text-sm md:text-base">
            {{ description }}
          </p>
        </div>

        <div class="flex items-center gap-2 text-sm luxurious-roman-regular">
          <div class="flex text-[#280559]">
            {{ '★'.repeat(Math.round(props.averageRating || 0))
            }}{{ '☆'.repeat(5 - Math.round(props.averageRating || 0)) }}
          </div>
          <span class="underline text-gray-500 hover:text-black cursor-pointer"
            >({{ props.totalReviews || 0 }}) Reviews</span
          >
        </div>

        <div class="mt-2">
          <p class="text-sm font-bold mb-3 uppercase tracking-wider text-gray-500">Select Size</p>
          <div class="flex flex-wrap gap-4 md:gap-6">
            <div
              v-for="variant in parsedVariants"
              :key="variant.id"
              @click="handleVariantClick(variant)"
              class="cursor-pointer group flex flex-col items-center gap-2 transition-all duration-200"
              :class="
                selectedVariant?.id === variant.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              "
            >
              <div
                class="relative p-2 rounded-lg"
                :class="selectedVariant?.id === variant.id ? 'bg-gray-100' : ''"
              >
                <img
                  :src="variant.imageUrl || image"
                  :alt="variant.size"
                  class="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <span
                class="text-xs md:text-sm font-medium border-b-2 transition-colors duration-200"
                :class="
                  selectedVariant?.id === variant.id
                    ? 'border-[#280559] text-[#280559]'
                    : 'border-transparent text-gray-500'
                "
              >
                {{ variant.size }}
              </span>
            </div>
          </div>
        </div>

        <div class="text-3xl luxurious-roman-regular text-[#280559] mt-2">
          $ {{ selectedVariant?.price.toFixed(2) }}
        </div>

        <div class="flex flex-col sm:flex-row gap-3 mt-4 w-full lg:max-w-md">
          <button
            @click="addToCartHandler"
            class="flex-1 border border-[#280559] py-3.5 text-[#280559] hover:bg-[#280559] hover:text-white uppercase tracking-widest text-sm rounded-lg luxurious-roman-regular transition-all duration-300"
          >
            Add to Bag
          </button>
          <button
            @click="handleWishlistToggle"
            class="flex-1 py-3.5 flex justify-center items-center gap-2 uppercase rounded-lg luxurious-roman-regular tracking-widest text-sm transition-all duration-300 shadow-md bg-[#280559] text-white hover:bg-opacity-90"
          >
            Wish List
            <Heart class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="parsedStory" class="flex flex-col gap-16 mt-20 md:mt-32">
      <div v-if="parsedStory.intro" class="w-full mx-auto text-center md:text-left">
        <h2 class="luxurious-roman-regular text-2xl md:text-3xl text-[#280559] mb-4">
          {{ parsedStory.intro.title }}
        </h2>
        <p class="text-gray-600 luxurious-roman-regular leading-relaxed text-base md:text-lg">
          {{ parsedStory.intro.content }}
        </p>
      </div>

      <div v-if="parsedStory.overture" class="w-full mx-auto text-center md:text-left">
        <h2 class="luxurious-roman-regular text-2xl md:text-3xl text-[#280559] mb-4">
          {{ parsedStory.overture.title }}
        </h2>
        <p class="text-gray-600 luxurious-roman-regular leading-relaxed text-base md:text-lg">
          {{ parsedStory.overture.content }}
        </p>
      </div>

      <div v-if="parsedStory.scentNotes && parsedStory.scentNotes.length" class="my-6 md:my-10">
        <h2 class="luxurious-roman-regular text-3xl text-[#280559] mb-10 text-center">
          Scent Notes
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 text-center">
          <div
            v-for="note in parsedStory.scentNotes"
            :key="note.type"
            class="flex flex-col items-center gap-4"
          >
            <div class="luxurious-roman-regular text-[#280559]">
              <h3 class="text-xl font-bold">{{ note.type }}</h3>
              <p class="text-md italic">{{ note.scent }}</p>
            </div>
            <img
              :src="note.image"
              class="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>
        </div>
      </div>

      <div v-if="parsedStory.keyNotes && parsedStory.keyNotes.length" class="my-6 md:my-10">
        <h2 class="luxurious-roman-regular text-3xl text-[#280559] mb-10 text-center">Key Notes</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 text-center">
          <div
            v-for="note in parsedStory.keyNotes"
            :key="note.id"
            class="flex flex-col items-center gap-4"
          >
            <div class="luxurious-roman-regular text-[#280559]">
              <h3 class="text-xl font-bold">{{ note.type }}</h3>
              <p class="text-md italic">{{ note.scent }}</p>
            </div>
            <img
              :src="note.image"
              class="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>
        </div>
      </div>

      <div v-for="(feature, idx) in parsedStory.features" :key="idx" class="w-full mx-auto">
        <h2 class="luxurious-roman-regular text-2xl md:text-3xl text-[#280559] mb-4">
          {{ feature.title }}
        </h2>
        <p class="text-gray-600 luxurious-roman-regular leading-relaxed text-base md:text-lg">
          {{ feature.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Utility to hide scrollbar for clean horizontal scrolling */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
