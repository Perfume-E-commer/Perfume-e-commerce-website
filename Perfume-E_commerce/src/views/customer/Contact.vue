<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import { ref } from 'vue'
import { contactService } from '@/services/contactService'

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSend = async () => {
  const payload = {
    name: formData.value.name.trim(),
    email: formData.value.email.trim(),
    subject: formData.value.subject.trim(),
    message: formData.value.message.trim()
  }

  if (!payload.name || !payload.email || !payload.message) {
    errorMessage.value = "Please fill in all required fields."
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await contactService.sendMessage(payload)
    successMessage.value = "Message sent successfully!"
    formData.value = { name: '', email: '', subject: '', message: '' }
  } catch (error: any) {
    console.error(error)
    errorMessage.value = error.response?.data || "Failed to send message."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden bg-white">
    <header class="bg-white z-50">
      <Navbar />
    </header>
    <section class="pt-24 px-6 text-sm text-gray-600 flex items-center mt-10 gap-1">
      <RouterLink
        to="/"
        class="luxurious-roman-regular text-gray-600 hover:text-[#280559] hover:underline cursor-pointer"
      >
        Home
      </RouterLink>
      <span>/</span>
      <RouterLink
        to="/contact"
        class="luxurious-roman-regular text-gray-800 hover:text-[#280559] hover:underline cursor-pointer"
      >
        Contact
      </RouterLink>
    </section>
    <section class="w-full text-center mt-10 mb-10">
      <h1 class="luxurious-roman-regular text-4xl lg:text-5xl text-[#000000] tracking-wide">
        CONTACT SCENT HAVEN
      </h1>
    </section>
    <section class="w-full flex flex-col lg:flex-row justify-center gap-12 px-6 mt-10 mb-20">
      <div class="max-w-md space-y-5 luxurious-roman-regular text-black">
        <h2 class="text-2xl font-semibold">Get in Touch</h2>
        <p class="text-gray-600">
          Have a question or feedback? We’d love to hear from you. Reach out using the info below or
          fill out the form.
        </p>
        <div class="space-y-4 text-gray-700 luxurious-roman-regular">
          <div class="flex items-center gap-3">
            <img src="/Image/Contact/streamline_phone-solid.png" class="w-6 h-6" />
            <span>+855 99 623 668</span>
          </div>
          <div class="flex items-center gap-3">
            <img src="/Image/Contact/material-symbols_mail.png" class="w-6 h-6" />
            <span>ScentHaven@gmail.com</span>
          </div>
          <div class="flex items-center gap-3">
            <img src="/Image/Contact/mdi_location.png" class="w-6 h-6" />
            <span>644st, Samdech Monireth Blvd(217), Phnom Penh, Cambodia</span>
          </div>
          <div class="flex items-center gap-3">
            <img src="/Image/Contact/image 335.png" class="w-6 h-6" />
            <span>https://t.me/+ScentHaven</span>
          </div>
        </div>
        <div>
          <iframe
            class="w-full h-64 rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.435663008442!2d104.8886!3d11.5564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e5e654e63f%3A0xeca8c6a3d6f0e8f4!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1700000000000"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <div class="w-full max-w-lg luxurious-roman-regular text-black space-y-5">
        <div
          v-if="successMessage"
          class="p-3 bg-green-50 text-green-700 border border-green-200 rounded"
        >
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="p-3 bg-red-50 text-red-700 border border-red-200 rounded">
          {{ errorMessage }}
        </div>
        <div class="flex gap-4">
          <input
            v-model="formData.name"
            type="text"
            placeholder="Your Name"
            class="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#280559] focus:ring-1 outline-none"
          />
          <input
            v-model="formData.email"
            type="email"
            placeholder="Your Email"
            class="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#280559] focus:ring-1 outline-none"
          />
        </div>
        <input
          v-model="formData.subject"
          type="text"
          placeholder="Subject"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#280559] focus:ring-1 outline-none"
        />
        <textarea
          v-model="formData.message"
          placeholder="Message"
          rows="5"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#280559] focus:ring-1 outline-none"
        ></textarea>
        <button
          @click="handleSend"
          :disabled="isLoading"
          class="mt-2 px-6 py-3 bg-[#280559] text-white rounded-lg hover:bg-[#3a067e] transition-all disabled:opacity-70 flex items-center gap-2"
        >
          <span v-if="isLoading">Sending...</span>
          <span v-else>Send Message</span>
        </button>
      </div>
    </section>
    <footer class="bg-gray-50 z-50 mt-auto">
      <Footer />
    </footer>
  </div>
</template>
