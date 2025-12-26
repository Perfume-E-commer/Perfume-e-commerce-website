<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import SuccessFul from '@/components/customer/SuccessfulOrder/SuccessFul.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden bg-white">
    <header>
      <Navbar />
    </header>

    <main>
      <section>
        <SuccessFul />
      </section>
    </main>

    <footer>
      <Footer />
    </footer>
    <Scrolldown />
  </div>
</template>
