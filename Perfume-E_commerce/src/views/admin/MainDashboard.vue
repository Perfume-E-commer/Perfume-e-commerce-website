<template>
  <div class="relative bg-gray-100 min-h-screen">
    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" @toggle="toggleSidebar" />

    <!-- Main content -->
    <div class="transition-all duration-300 ease-in-out" :class="isSidebarOpen ? 'ml-64' : 'ml-0'">
      <Navbar :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

      <main class="p-6 mt-16">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<!-- <script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Sidebar from '../layout/Sidebar.vue'
import Navbar from '../layout/Navbar.vue'

const isSidebarOpen = ref(true)
const isMobile = ref(window.innerWidth < 768)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleResize = () => {
  const newIsMobile = window.innerWidth < 768
  if (newIsMobile !== isMobile.value) {
    isMobile.value = newIsMobile
    // Auto-open sidebar on desktop, auto-close on mobile
    if (!newIsMobile) {
      isSidebarOpen.value = true
    } else {
      isSidebarOpen.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  // Set initial state based on screen size
  handleResize()
})

onUnmounted(() => window.removeEventListener('resize', handleResize))
</script> -->
<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from '../layout/Sidebar.vue'
import Navbar from '../layout/Navbar.vue'
export default {
  name: 'MainDashboard',
  components: { Sidebar, Navbar },
  data() {
    return {
      isSidebarOpen: true,
      isMobile: window.innerWidth < 768,
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    handleResize() {
      const newIsMobile = window.innerWidth < 768
      if (newIsMobile !== this.isMobile) {
        this.isMobile = newIsMobile
        // Auto-open sidebar on desktop, auto-close on mobile
        if (!newIsMobile) {
          this.isSidebarOpen = true
        } else {
          this.isSidebarOpen = false
        }
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    // Set initial state based on screen size
    this.handleResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>
