<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Heart } from 'lucide-vue-next'

interface ProductVariant {
  id: number | string
  size: string
  image: string
  price: number
}

interface StorySection {
  title: string
  content: string
}

interface KeyNote {
  id: number
  type: string
  scent: string
  image: string
}

interface ProductStory {
  intro: StorySection
  overture: StorySection
  keyNotes: KeyNote[]
  features: StorySection[]
}

const props = defineProps<{
  title: string
  description: string
  image: string
  price: number
  variants: ProductVariant[] | string
  story: ProductStory | string
}>()

// Parse variants if passed as JSON string
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

const parsedStory = computed<ProductStory>(() => {
  if (!props.story) return null
  if (typeof props.story === 'string') {
    try {
      return JSON.parse(props.story)
    } catch {
      return null
    }
  }
  return props.story as ProductStory
})

const selectedVariant = ref<ProductVariant | null>(null)
const currentImage = ref<string>('')

// Initialize logic
const initialize = () => {
  if (parsedVariants.value && parsedVariants.value.length > 0) {
    selectedVariant.value = parsedVariants.value[0] as ProductVariant
    // 2. Set the initial image to the PROP (from ProductList), not the variant
    currentImage.value = props.image || selectedVariant.value.image
  } else {
    selectedVariant.value = {
      id: 'default',
      size: 'Standard',
      image: props.image || '',
      price: props.price || 0,
    }
    currentImage.value = props.image || ''
  }
}

const handleImagePreview = (imagePath: string) => {
  currentImage.value = imagePath
}

// 3. Create a handler to update both the selection and the image on click
const handleVariantClick = (variant: ProductVariant) => {
  selectedVariant.value = variant
}

onMounted(() => {
  initialize()
})

watch(
  () => props.title,
  () => {
    initialize()
  },
)
</script>

<template>
  <div class="container max-w-8xl mx-auto px-4 py-10" v-if="selectedVariant">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div class="flex flex-row">
        <div class="flex flex-col gap-4">
          <img
            v-for="(variant, index) in parsedVariants"
            :key="index"
            :src="variant.image"
            :alt="variant.size"
            @click="handleImagePreview(variant.image)"
            class="w-30 h-30 object-contain transition-opacity duration-300 hover:border-2 border-[#280559] cursor-pointer"
            :class="selectedVariant === variant ? 'border-2 border-[#280559]' : ''"
          />
        </div>

        <img
          :src="currentImage"
          :alt="title"
          class="w-full max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] object-contain transition-opacity duration-300"
        />
      </div>

      <div class="flex flex-col gap-6 text-[#280559]">
        <div class="flex flex-col gap-2 luxurious-roman-regular">
          <h1 class="text-3xl md:text-5xl uppercase mb-4">{{ title }}</h1>
          <p class="text-gray-600 leading-relaxed text-sm md:text-base">
            {{ description }}
          </p>
        </div>

        <div class="flex items-center gap-2 text-sm luxurious-roman-regular">
          <div class="flex text-[#280559]">★★★★★</div>
          <span class="underline text-gray-500 hover:text-black cursor-pointer">(90) Reviews</span>
        </div>

        <div class="mt-4">
          <div class="flex flex-wrap gap-6">
            <div
              v-for="variant in parsedVariants"
              :key="variant.id"
              @click="handleVariantClick(variant)"
              class="cursor-pointer group flex flex-col items-center gap-2"
            >
              <div class="relative">
                <img
                  :src="variant.image"
                  :alt="variant.size"
                  class="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  v-if="selectedVariant?.id === variant.id"
                  class="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#280559]"
                ></div>
              </div>

              <span
                class="text-sm font-medium"
                :class="selectedVariant?.id === variant.id ? 'text-[#280559]' : 'text-gray-400'"
              >
                {{ variant.size }}
              </span>
            </div>
          </div>
        </div>

        <div class="text-2xl luxurious-roman-regular text-[#280559] mt-2">
          $ {{ selectedVariant?.price.toFixed(2) }}
        </div>

        <div class="flex flex-col gap-3 max-w-sm mt-4">
          <button
            class="border border-[#280559] py-3 text-[#280559] hover:bg-gray-50 uppercase tracking-widest text-sm rounded-[10px] luxurious-roman-regular transition"
          >
            Add to Bag
          </button>
          <button
            class="bg-[#280559] text-white py-3 hover:bg-opacity-90 flex justify-center items-center gap-2 uppercase rounded-[10px] luxurious-roman-regular tracking-widest text-sm transition"
          >
            Wish List <Heart class="w-5 h-5" stroke-width="1.5" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="parsedStory" class="flex flex-col gap-16 mt-20">
      <div v-if="parsedStory.intro">
        <h2 class="luxurious-roman-regular text-3xl text-[#280559] mb-4">
          {{ parsedStory.intro.title }}
        </h2>
        <p class="text-gray-600 leading-relaxed text-lg">{{ parsedStory.intro.content }}</p>
      </div>

      <div v-if="parsedStory.overture">
        <h2 class="luxurious-roman-regular text-3xl text-[#280559] mb-4">
          {{ parsedStory.overture.title }}
        </h2>
        <p class="text-gray-600 leading-relaxed text-lg">{{ parsedStory.overture.content }}</p>
      </div>

      <div v-if="parsedStory.keyNotes && parsedStory.keyNotes.length" class="my-10">
        <h2 class="luxurious-roman-regular text-3xl text-[#280559] mb-10 text-center">Key Notes</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
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
              class="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-white"
            />
          </div>
        </div>
      </div>

      <div v-for="(feature, idx) in parsedStory.features" :key="idx">
        <h2 class="luxurious-roman-regular text-3xl text-[#280559] mb-4">{{ feature.title }}</h2>
        <p class="text-gray-600 leading-relaxed text-lg">{{ feature.content }}</p>
      </div>
    </div>
  </div>
</template>
