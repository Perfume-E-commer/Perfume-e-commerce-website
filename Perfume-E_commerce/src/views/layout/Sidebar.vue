<template>
  <aside
    :class="[
      'fixed top-0 left-0 h-full bg-white border-b border-gray-200 dark:bg-gray-800 shadow-2xl transform z-40 transition-all duration-300 ease-in-out overflow-hidden',
      isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0',
    ]"
  >
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between p-5 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <svg
            width="140"
            height="40"
            viewBox="0 0 173 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
             <text x="10" y="35" font-family="Arial" font-size="24" fill="#280559" font-weight="bold">ScentHaven<tspan fill="#6366f1">.</tspan></text>
          </svg>
        </div>
        <button
          class="text-gray-600 hover:text-indigo-600 rounded-lg p-1.5 transition-all duration-200"
          @click="closeSidebar"
          aria-label="Close sidebar"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto py-2">
        <ul class="px-3 space-y-1">
          <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-2 px-2">Main Menu</div>
          
          <ListSidebar
            :menuItems="[
              {
                name: 'Dashboard',
                link: '/admin/dashboard',
                icon: 'home' 
              },
              {
                name: 'Products',
                link: '/admin/products', 
                icon: 'box'
              },
              {
                name: 'Inventory',
                link: '/admin/inventory', 
                icon: 'clipboard'
              },
              {
                name: 'Orders & Billing', 
                link: '/admin/orders',
                icon: 'cart'
              },
              {
                name: 'Promotions',
                link: '/admin/promotions', 
                icon: 'tag'
              },
              {
                name: 'Customers',
                link: '/admin/customers',
                icon: 'users'
              },
            ]"
            @item-click="handleItemClick"
          />

          <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-6 px-2">Settings</div>
          <ListSidebar
            :menuItems="[{ name: 'Admin Profile', link: '/admin/profile', icon: 'cog' }]"
            @item-click="handleItemClick"
          />
        </ul>
      </nav>

      <div class="p-4 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center gap-3 mb-3">
          <img src="/me.jpg" class="w-10 h-10 rounded-full border border-gray-200" alt="Admin" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-gray-900 truncate">Kakashi Uchiha</p>
            <p class="text-xs text-gray-500 truncate">admin@scenthaven.com</p>
          </div>
        </div>
        
        <RouterLink to="/" class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
           View Storefront
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<script>
import ListSidebar from '../components/ListSidebar.vue'

export default {
  name: 'Sidebar',
  components: { ListSidebar },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['toggle'],
  data() {
    return {
      isMobile: window.innerWidth < 768,
    }
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth < 768
    },
    closeSidebar() {
      this.$emit('toggle')
    },
    handleItemClick() {
      if (this.isMobile) {
        this.closeSidebar()
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>