<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative">
    <div
      class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 relative z-10 border border-gray-100 text-center"
    >
      <div class="absolute top-6 left-6">
        <router-link
          to="/register"
          class="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </router-link>
      </div>

      <div class="mt-8 mb-6">
        <h1 class="luxurious-roman-regular text-2xl text-[#280559] mb-2">Check your email</h1>
        <p class="text-gray-500 text-sm">
          Please enter the 6-digit code we sent to <br />
          <span class="font-semibold text-[#280559]">{{ email }}</span>
        </p>
      </div>

      <div
        v-if="authStore.error"
        class="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg"
      >
        {{ authStore.error }}
      </div>

      <div class="flex justify-center gap-2 mb-8">
        <input
          v-for="(digit, index) in codeDigits"
          :key="index"
          ref="inputs"
          type="text"
          inputmode="numeric"
          maxlength="1"
          v-model="codeDigits[index]"
          @input="handleInput($event, index)"
          @keydown.delete="handleBackspace($event, index)"
          @paste="handlePaste"
          class="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#280559] focus:border-[#280559] outline-none transition bg-gray-50"
        />
      </div>

      <button
        @click="handleSubmit"
        :disabled="authStore.loading || !isComplete"
        class="w-full bg-[#280559] hover:bg-[#1a033a] text-white font-medium py-3.5 rounded-xl transition-all disabled:opacity-70 shadow-lg shadow-purple-900/20"
      >
        <span v-if="authStore.loading">Verifying...</span>
        <span v-else>Continue</span>
      </button>

      <p class="mt-6 text-sm text-gray-500">
        Didn’t get it?
        <button
          @click="handleResend"
          class="text-[#280559] font-bold hover:underline cursor-pointer"
        >
          Send me a new email
        </button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const email = ref((route.query.email as string) || 'your email')
const codeDigits = ref(['', '', '', '', '', ''])
const inputs = ref<HTMLInputElement[]>([])

const isComplete = computed(() => codeDigits.value.every((d) => d !== ''))

onMounted(() => {
  if (inputs.value[0]) inputs.value[0].focus()
})

const handleInput = (event: Event, index: number) => {
  const val = (event.target as HTMLInputElement).value

  if (
    val &&
    index < 5 &&
    inputs.value &&
    Array.isArray(inputs.value) &&
    inputs.value.length > index + 1
  ) {
    inputs.value[index + 1]?.focus()
  }
}

const handleBackspace = (event: KeyboardEvent, index: number) => {
  if (
    !codeDigits.value[index] &&
    index > 0 &&
    inputs.value &&
    Array.isArray(inputs.value) &&
    index - 1 >= 0 &&
    inputs.value.length > index - 1
  ) {
    inputs.value[index - 1]?.focus()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  const pasteData = event.clipboardData?.getData('text') || ''
  if (!/^\d{6}$/.test(pasteData)) return

  codeDigits.value = pasteData.split('')
  if (inputs.value && Array.isArray(inputs.value) && inputs.value.length > 5 && inputs.value[5]) {
    inputs.value[5].focus()
  }
}

const handleSubmit = async () => {
  const code = codeDigits.value.join('')
  const success = await authStore.verify(email.value, code)
  if (success) {
    alert('Account verified! Please login.')
    router.push('/login')
  }
}

const handleResend = async () => {
  await authStore.resend(email.value)
  alert('New code sent!')
}
</script>

<style scoped>
.luxurious-roman-regular {
  font-family: 'Luxurious Roman', serif;
}
</style>
