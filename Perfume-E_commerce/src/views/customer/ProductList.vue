<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
<template>
  <div class="flex flex-col min-h-screen overflow-hidden bg-white">
    <header class="bg-white z-50">
      <Navbar />
    </header>
    <main>
      <section></section>
    </main>
    <footer class="bg-gray-50 z-50">
      <Footer />
    </footer>
  </div>
</template>
