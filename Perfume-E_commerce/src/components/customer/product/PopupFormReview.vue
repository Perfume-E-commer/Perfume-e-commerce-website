<script setup lang="ts">
import { ref } from 'vue'
import { Star, X } from 'lucide-vue-next'

interface ReviewFormData {
  rating: number
  comment: string
}

const props = defineProps<{
  visible: boolean
  isSubmitting?: boolean
}>()

const emit = defineEmits(['close', 'submit'])

const formData = ref<ReviewFormData>({
  rating: 5,
  comment: '',
})

const errors = ref<Partial<ReviewFormData>>({})
const isSubmitting = ref(false)

const closeModal = () => {
  resetForm()
  emit('close')
}

const resetForm = () => {
  formData.value = {
    rating: 5,
    comment: '',
  }
  errors.value = {}
}

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.comment.trim()) {
    errors.value.comment = 'Please share your thoughts'
  }

  return Object.keys(errors.value).length === 0
}

const submitReview = async () => {
  if (validateForm()) {
    isSubmitting.value = true
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      emit('submit', formData.value)
      resetForm()
    } finally {
      isSubmitting.value = false
    }
  }
}

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => i < rating)
}
</script>
<template>
  <Transition name="modal-fade">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-6"
    >
      <Transition name="modal-scale">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="relative bg-linear-to-r from-[#280559] to-[#3a0770] px-8 py-10 text-white">
            <button
              @click="closeModal"
              class="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
            >
              <X class="w-5 h-5" />
            </button>

            <h2 class="text-3xl font-bold mb-2 luxurious-roman-regular">Share Your Experience</h2>
            <p class="text-white/80 text-sm">Help others discover great products</p>
          </div>

          <form @submit.prevent="submitReview" class="px-8 py-8 space-y-6">
            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-700"> Your Rating </label>
              <div
                class="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border-2 border-gray-200"
              >
                <div class="flex gap-2">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    @click="formData.rating = star"
                    class="transition-transform hover:scale-110"
                  >
                    <Star
                      :class="[
                        'w-7 h-7 transition-all',
                        star <= formData.rating ? 'fill-[#280559] text-[#280559]' : 'text-gray-300',
                      ]"
                    />
                  </button>
                </div>
                <span class="ml-auto text-sm font-semibold text-gray-600">
                  {{ formData.rating }} out of 5
                </span>
              </div>
            </div>

            <div class="space-y-2">
              <label for="comment" class="block text-sm font-semibold text-gray-700">
                Your Review
              </label>
              <textarea
                id="comment"
                v-model="formData.comment"
                placeholder="Tell us what you think about this product..."
                rows="5"
                :class="[
                  'w-full px-4 py-3 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none resize-none',
                  errors.comment
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-[#280559] focus:ring-2 focus:ring-purple-100',
                ]"
              ></textarea>
              <div class="flex justify-between items-center">
                <p
                  v-if="errors.comment"
                  class="text-red-500 text-xs font-medium flex items-center gap-1"
                >
                  <span>✕</span> {{ errors.comment }}
                </p>
                <p class="text-gray-400 text-xs">{{ formData.comment.length }}/500</p>
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                :disabled="props.isSubmitting"
                class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="props.isSubmitting"
                class="flex-1 px-6 py-3 bg-linear-to-r from-[#280559] to-[#3a0770] text-white rounded-lg font-semibold hover:from-[#3a0770] hover:to-[#4a0980] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span v-if="!props.isSubmitting">Submit Review</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <span
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                  ></span>
                  Submitting...
                </span>
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  transform: scale(0.9);
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}
</style>
