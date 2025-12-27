<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import CartComponent from '@/components/customer/Cart/CartComponent.vue'
</script>

<template>
  <div class="flex flex-col overflow-hidden bg-white">
    <header>
      <Navbar />
    </header>
    <main>
      <CartComponent />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
