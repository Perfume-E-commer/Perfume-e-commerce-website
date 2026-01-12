<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import CheckoutProduct from '../../components/customer/Checkout/CheckoutProduct.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <header class="sticky top-0 z-50">
      <Navbar />
    </header>
    
    <main class="flex-grow">
      <CheckoutProduct />
    </main>
    
    <footer class="mt-auto">
      <Footer />
    </footer>
  </div>
</template>
