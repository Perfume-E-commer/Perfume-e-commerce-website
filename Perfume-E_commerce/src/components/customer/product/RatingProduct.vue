<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { ref, computed, onMounted, watch } from 'vue'
import PopupFormReview from './PopupFormReview.vue'
import productService from '@/services/productService'
import { useAuthStore } from '@/stores/authStore'

interface Rating {
  userId: string
  userName: string
  stars: number
  comment: string
  createdAt: string
}

interface Props {
  productId?: string | number
}

const props = defineProps<Props>()

const showReviewPopup = ref(false)
const isSubmitting = ref(false)
const submitMessage = ref<{ type: 'success' | 'error'; text: string } | null>(null)
const reviews = ref<Rating[]>([])
const loadingReviews = ref(false)
const averageRating = ref(0)
const totalReviews = computed(() => reviews.value.length)
const fetchError = ref<string | null>(null)
const reviewsToShow = ref(3)

// Computed property for displayed reviews
const displayedReviews = computed(() => {
  return reviews.value.slice(0, reviewsToShow.value)
})

const hasMoreReviews = computed(() => {
  return reviews.value.length > reviewsToShow.value
})

const handleLoadMore = () => {
  reviewsToShow.value = reviews.value.length // Show all remaining reviews
}

const handleShowLess = () => {
  reviewsToShow.value = 3 // Back to showing only 3 reviews
}

onMounted(async () => {
  await fetchReviews()
})

watch(
  () => props.productId,
  async () => {
    await fetchReviews()
  },
  { deep: true },
)

const fetchReviews = async () => {
  if (!props.productId) {
    console.warn('No productId provided')
    loadingReviews.value = false
    return
  }

  loadingReviews.value = true
  fetchError.value = null

  try {
    console.log('Fetching product with ID:', props.productId)
    const response = await productService.getProductById(String(props.productId))
    const product = response.data

    console.log('Product data received:', product)

    reviews.value = product.ratings || []
    averageRating.value = product.averageRating || 0

    console.log('Reviews extracted:', reviews.value)
    console.log('Average rating:', averageRating.value)
  } catch (error: any) {
    console.error('Error fetching reviews:', error)
    fetchError.value = error.response?.data?.message || error.message || 'Failed to load reviews'
  } finally {
    loadingReviews.value = false
  }
}

const handleAddReview = () => {
  showReviewPopup.value = true
}

const handleClosePopup = () => {
  showReviewPopup.value = false
}

const handleSubmitReview = async (reviewData: any) => {
  if (!props.productId) {
    submitMessage.value = { type: 'error', text: 'Product ID not found' }
    return
  }

  isSubmitting.value = true
  submitMessage.value = null

  try {
    const ratingData = {
      stars: reviewData.rating,
      comment: reviewData.comment,
    }

    console.log('Submitting review to:', `/api/products/${props.productId}/ratings`)
    console.log('Review data:', ratingData)

    const response = await productService.submitProductReview(String(props.productId), ratingData)

    console.log('Review submitted successfully:', response.data)
    submitMessage.value = { type: 'success', text: 'Review submitted successfully!' }

    await fetchReviews()

    setTimeout(() => {
      showReviewPopup.value = false
      submitMessage.value = null
    }, 1500)
  } catch (error: any) {
    console.error('Error submitting review:', error)
    const errorMessage =
      error.response?.data?.message || error.message || 'Failed to submit review. Please try again.'
    submitMessage.value = { type: 'error', text: errorMessage }
  } finally {
    isSubmitting.value = false
  }
}

// Format date to readable format
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

// Get star display string
const getStarDisplay = (stars: number) => {
  return '★'.repeat(stars) + '☆'.repeat(5 - stars)
}
</script>
<template>
  <div class="container max-8xl mx-auto mb-20">
    <h1
      class="text-center luxurious-roman-regular font-bold text-[#280559] text-3xl md:text-4xl lg:text-5xl"
    >
      Reviews
    </h1>

    <div class="container w-full max-w-3xl mx-auto mt-10 px-5">
      <div class="w-full flex flex-col md:flex-row justify-between items-center md:items-start">
        <div class="flex flex-col text-black luxurious-roman-regular">
          <div v-if="reviews.length > 0" class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">5 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div
                class="h-4 bg-[#280559] rounded-base"
                :style="{
                  width: (reviews.filter((r) => r.stars === 5).length / reviews.length) * 100 + '%',
                }"
              ></div>
            </div>
            <span class="text-sm font-medium text-body">{{
              reviews.filter((r) => r.stars === 5).length
            }}</span>
          </div>
          <div v-if="reviews.length > 0" class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">4 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div
                class="h-4 bg-[#280559] rounded-base"
                :style="{
                  width: (reviews.filter((r) => r.stars === 4).length / reviews.length) * 100 + '%',
                }"
              ></div>
            </div>
            <span class="text-sm font-medium text-body">{{
              reviews.filter((r) => r.stars === 4).length
            }}</span>
          </div>
          <div v-if="reviews.length > 0" class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">3 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div
                class="h-4 bg-[#280559] rounded-base"
                :style="{
                  width: (reviews.filter((r) => r.stars === 3).length / reviews.length) * 100 + '%',
                }"
              ></div>
            </div>
            <span class="text-sm font-medium text-body">{{
              reviews.filter((r) => r.stars === 3).length
            }}</span>
          </div>
          <div v-if="reviews.length > 0" class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">2 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div
                class="h-4 bg-[#280559] rounded-base"
                :style="{
                  width: (reviews.filter((r) => r.stars === 2).length / reviews.length) * 100 + '%',
                }"
              ></div>
            </div>
            <span class="text-sm font-medium text-body">{{
              reviews.filter((r) => r.stars === 2).length
            }}</span>
          </div>
          <div v-if="reviews.length > 0" class="flex items-center mt-2">
            <a href="#" class="text-sm font-medium text-fg-brand hover:underline">1 star</a>
            <div class="w-54 h-4 mx-4 bg-gray-100 rounded-base">
              <div
                class="h-4 bg-[#280559] rounded-base"
                :style="{
                  width: (reviews.filter((r) => r.stars === 1).length / reviews.length) * 100 + '%',
                }"
              ></div>
            </div>
            <span class="text-sm font-medium text-body">{{
              reviews.filter((r) => r.stars === 1).length
            }}</span>
          </div>
          <div v-else class="text-gray-500 luxurious-roman-regular text-sm mt-4">
            No reviews yet. Be the first to review this product!
          </div>
        </div>
        <div class="flex text-black flex-col gap-5 mt-10 md:mt-0">
          <div class="flex flex-col luxurious-roman-regular">
            <div class="flex text-[#280559] text-2xl">
              {{ getStarDisplay(Math.round(averageRating)) }}
            </div>
            <p class="text-xl">{{ averageRating.toFixed(1) }} out of 5</p>
          </div>
          <div class="flex flex-col luxurious-roman-regular">
            <p class="text-base" v-if="totalReviews > 0">
              {{ Math.round((reviews.filter((r) => r.stars >= 4).length / totalReviews) * 100) }}%
              of reviewers recommend this product
            </p>
            <p class="text-base" v-else>No reviews yet</p>
            <div class="flex gap-10 mt-2">
              <p>{{ totalReviews }} {{ totalReviews === 1 ? 'review' : 'reviews' }}</p>
              <button
                @click="handleAddReview"
                class="flex items-center hover:border px-5 py-1 rounded-lg gap-2 cursor-pointer hover:bg-gray-100 transition"
              >
                <Plus class="w-5 h-5" /> Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container w-full mx-auto mt-16 flex flex-col gap-10 px-5">
      <!-- Loading state -->
      <div v-if="loadingReviews" class="text-center py-8">
        <div class="flex justify-center items-center gap-2">
          <div class="w-2 h-2 bg-[#280559] rounded-full animate-bounce"></div>
          <div
            class="w-2 h-2 bg-[#280559] rounded-full animate-bounce"
            style="animation-delay: 0.1s"
          ></div>
          <div
            class="w-2 h-2 bg-[#280559] rounded-full animate-bounce"
            style="animation-delay: 0.2s"
          ></div>
        </div>
        <p class="text-gray-500 mt-3">Loading reviews...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="fetchError" class="text-center py-8 bg-red-50 rounded-lg p-4">
        <p class="text-red-600">{{ fetchError }}</p>
        <button @click="fetchReviews" class="mt-3 text-[#280559] hover:underline font-semibold">
          Try Again
        </button>
      </div>

      <!-- No reviews state -->
      <div v-else-if="reviews.length === 0" class="text-center py-8 luxurious-roman-regular">
        <p class="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
      </div>

      <!-- Reviews list -->
      <div v-else class="max-h-96 overflow-y-auto">
        <div
          v-for="(review, index) in displayedReviews"
          :key="index"
          class="flex gap-4 md:gap-6 items-start pb-6 border-b border-gray-200 last:border-b-0"
        >
          <!-- Avatar placeholder since backend doesn't provide avatars -->
          <div class="shrink-0">
            <div
              class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-[#280559] to-[#3a0770] flex items-center justify-center text-white font-bold text-lg"
            >
              {{ review.userName?.charAt(0).toUpperCase() || '?' }}
            </div>
          </div>

          <div class="flex flex-col luxurious-roman-regular flex-1">
            <!-- Stars -->
            <div class="flex text-[#280559] text-xl mb-2">
              {{ getStarDisplay(review.stars) }}
            </div>

            <!-- Comment -->
            <p class="text-gray-800 italic leading-relaxed mb-3">
              {{ review.comment }}
            </p>

            <!-- Name and date -->
            <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-10 mt-1">
              <span class="font-bold text-gray-900">{{ review.userName }}</span>
              <span class="text-gray-500 text-sm">{{ formatDate(review.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More / Show Less Button -->
      <div v-if="reviews.length > 3" class="flex justify-center gap-4 mt-6">
        <button
          v-if="hasMoreReviews"
          @click="handleLoadMore"
          class="px-8 py-2 bg-[#280559] text-white font-semibold luxurious-roman-regular rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Load More
        </button>
        <button
          v-else
          @click="handleShowLess"
          class="px-8 py-2 bg-[#280559] text-white font-semibold luxurious-roman-regular rounded-lg transition hover:bg-opacity-90 duration-300"
        >
          Show Less
        </button>
      </div>
    </div>

    <!-- Success/Error Message -->
    <Transition name="fade">
      <div
        v-if="submitMessage"
        :class="[
          'fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold shadow-lg z-40',
          submitMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500',
        ]"
      >
        {{ submitMessage.text }}
      </div>
    </Transition>

    <!-- Review Popup Form -->
    <PopupFormReview
      :visible="showReviewPopup"
      :is-submitting="isSubmitting"
      @close="handleClosePopup"
      @submit="handleSubmitReview"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
