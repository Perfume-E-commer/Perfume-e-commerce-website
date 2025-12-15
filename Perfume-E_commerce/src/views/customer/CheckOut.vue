<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import CheckoutProduct from '@/components/customer/Checkout/CheckoutProduct.vue'
</script>
<template>
  <div class="flex flex-col overflow-hidden bg-white">
    <header>
      <Navbar />
    </header>
    <main>
      <CheckoutProduct />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
