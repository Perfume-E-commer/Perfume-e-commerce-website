<template>
  <div class="min-h-screen bg-gradient-to-br from-[#faf7ff] to-white font-lora">
    <!-- Top Navigation -->
    <header class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-8">
          <img src="https://via.placeholder.com/40" alt="ScentHaven Logo" class="h-10 w-10 rounded-full" />
          <span class="font-playfair text-xl text-[#280559] tracking-tight">ScentHaven</span>
        </div>

        <nav class="hidden md:flex space-x-6 text-gray-700">
          <a href="#" class="hover:text-[#280559] font-medium font-playfair">Shop</a>
          <a href="#" class="hover:text-[#280559] font-medium font-playfair">About Us</a>
          <a href="#" class="hover:text-[#280559] font-medium font-playfair">Contact</a>
        </nav>

        <div class="flex items-center gap-4">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Search data, users, or reports"
              class="w-64 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#280559] text-sm font-lora"
            />
            <svg class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <button class="p-2 hover:bg-gray-100 rounded-full">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a7 7 0 007 7h0a7 7 0 007-7V6a7 7 0 00-7-7h-7a7 7 0 00-7 7v8z"></path>
            </svg>
          </button>

          <button class="p-2 hover:bg-gray-100 rounded-full">
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10v8a2 2 0 002 2H5a2 2 0 002-2v-8zm5-1a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="container mx-auto px-6 py-6 flex gap-6">
      <!-- Left Sidebar -->
      <aside class="w-64 bg-white rounded-xl shadow-sm p-6 sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto">
        <div class="mb-8">
          <h3 class="text-xs uppercase tracking-wider text-gray-500 mb-4 font-playfair">My Account</h3>
          <ul class="space-y-3">
            <li>
              <router-link 
                to="/profile" 
                class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f3e8ff] hover:text-[#280559] font-lora"
              >
                My Profile
              </router-link>
            </li>
            <li>
              <router-link 
                to="/orders" 
                class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f3e8ff] hover:text-[#280559] font-lora"
              >
                My Orders
              </router-link>
            </li>
            <li>
              <router-link 
                to="/returns" 
                class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f3e8ff] hover:text-[#280559] font-lora"
              >
                My Returns
              </router-link>
            </li>
            <li>
              <router-link 
                to="/wishlist" 
                class="block px-3 py-2 rounded-lg text-gray-700 hover:bg-[#f3e8ff] hover:text-[#280559] font-lora"
              >
                My Wishlist
              </router-link>
            </li>
            <li>
              <router-link 
                to="/order-history" 
                class="block px-3 py-2 rounded-lg bg-[#f3e8ff] text-[#280559] font-medium font-lora"
              >
                Order History
              </router-link>
            </li>
          </ul>
        </div>

        <div class="mt-8 pt-6 border-t">
          <button class="w-full py-3 rounded-xl bg-[#280559] text-white font-medium font-playfair hover:bg-[#4c1d95] transition">
            Log Out
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1">
        <!-- Breadcrumb -->
        <div class="mb-6">
          <nav class="text-sm text-gray-500 font-lora">
            <span>Home</span> / 
            <span class="text-[#280559] font-playfair">My Account</span> / 
            <span class="text-[#280559] font-playfair font-medium">Order History</span>
          </nav>
        </div>

        <!-- Page Title & Stats -->
        <div class="mb-8">
          <h1 class="text-3xl font-playfair text-[#280559] mb-2 tracking-tight">Order History</h1>
          <p class="text-gray-500 font-lora">Your luxury perfume purchases</p>
          
          <!-- Simple Stats -->
          <div class="flex gap-4 mt-4">
            <div class="text-center p-3 rounded-lg bg-white shadow-sm border">
              <p class="text-sm text-gray-500 font-lora">Orders</p>
              <p class="text-xl font-bold text-[#280559] font-playfair">{{ orders.length }}</p>
            </div>
            <div class="text-center p-3 rounded-lg bg-white shadow-sm border">
              <p class="text-sm text-gray-500 font-lora">Total</p>
              <p class="text-xl font-bold text-[#280559] font-playfair">${{ totalSpent }}</p>
            </div>
          </div>
        </div>

        <!-- Premium Order Cards -->
        <div class="space-y-6">
          <div 
            v-for="order in orders" 
            :key="order.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <!-- Order Header with Gradient -->
            <div class="bg-gradient-to-r from-[#280559] to-[#4c1d95] text-white px-6 py-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-xs opacity-80 font-lora">ORDER #{{ order.id }}</p>
                  <p class="text-sm font-lora">{{ order.date }}</p>
                </div>
                <span :class="statusClass(order.status)" class="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm font-lora">
                  {{ order.status }}
                </span>
              </div>
            </div>

            <!-- Product Section -->
            <div class="p-6">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <img 
                    :src="order.product.image" 
                    :alt="order.product.name"
                    class="w-20 h-20 rounded-xl object-cover border-2 border-gray-100 shadow"
                  />
                  <!-- Premium Badge -->
                  <span v-if="order.total > 200" class="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-1 rounded-full font-lora">
                    PREMIUM
                  </span>
                </div>
                
                <div class="flex-1">
                  <h3 class="font-semibold text-lg text-[#280559] font-playfair">{{ order.product.name }}</h3>
                  <p class="text-sm text-gray-500 mt-1 font-lora">Quantity: {{ order.product.quantity }} • 100ml Eau de Parfum</p>
                  
                  <!-- Delivery Info -->
                  <div v-if="order.status !== 'Pending'" class="flex items-center gap-2 mt-3 text-sm font-lora">
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-600">
                      {{ order.status === 'Delivered' ? 'Delivered' : 'Shipped' }}
                    </span>
                  </div>
                </div>

                <!-- Total Price -->
                <div class="text-right">
                  <p class="text-sm text-gray-500 font-lora">Total</p>
                  <p class="text-2xl font-bold text-[#280559] font-playfair">${{ order.total }}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 mt-6 pt-5 border-t">
                <button 
                  @click="viewDetails(order)"
                  class="flex-1 py-3 rounded-xl border-2 border-[#280559] text-[#280559] font-medium font-playfair hover:bg-[#280559] hover:text-white transition-all duration-300"
                >
                  View Details
                </button>
                <button 
                  @click="buyAgain(order)"
                  class="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#280559] to-purple-700 text-white font-medium font-playfair hover:shadow-lg transition-all duration-300"
                >
                  Buy Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer class="bg-white border-t mt-12 py-10">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Logo + Newsletter -->
          <div>
            <img src="https://via.placeholder.com/40" alt="ScentHaven Logo" class="h-10 w-10 rounded-full mb-4" />
            <h3 class="font-playfair text-xl text-[#280559] mb-4 tracking-tight">ScentHaven</h3>
            <p class="text-gray-600 mb-4 font-lora">Subscribe to Our Newsletter</p>
            <p class="text-sm text-gray-500 mb-4 font-lora">Receive Updates on New Arrivals and Special Promotions!</p>
            <div class="flex">
              <input 
                type="email" 
                placeholder="Your email here" 
                class="flex-1 px-3 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#280559] font-lora"
              />
              <button class="px-4 py-2 bg-[#280559] text-white rounded-r-lg hover:bg-[#4c1d95] font-playfair">
                Submit
              </button>
            </div>
            <div class="flex gap-3 mt-4">
              <a href="#" class="text-gray-500 hover:text-[#280559]"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="text-gray-500 hover:text-[#280559]"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-gray-500 hover:text-[#280559]"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-gray-500 hover:text-[#280559]"><i class="fab fa-tiktok"></i></a>
            </div>
          </div>

          <!-- Categories -->
          <div>
            <h4 class="font-playfair font-medium text-gray-800 mb-4">Categories</h4>
            <ul class="space-y-2 text-sm text-gray-600 font-lora">
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">All Fragrance</a></li>
            </ul>
          </div>

          <!-- Shopping -->
          <div>
            <h4 class="font-playfair font-medium text-gray-800 mb-4">Shopping</h4>
            <ul class="space-y-2 text-sm text-gray-600 font-lora">
              <li><a href="#">Payments</a></li>
              <li><a href="#">Delivery options</a></li>
              <li><a href="#">Buyer protection</a></li>
            </ul>
          </div>

          <!-- Customer Care -->
          <div>
            <h4 class="font-playfair font-medium text-gray-800 mb-4">Customer care</h4>
            <ul class="space-y-2 text-sm text-gray-600 font-lora">
              <li><a href="#">Help center</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy & refund</a></li>
              <li><a href="#">Survey & feedback</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t mt-8 pt-6 text-center text-xs text-gray-500 font-lora">
          © 2025 ScentHaven. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Order {
  id: string
  date: string
  status: 'Delivered' | 'Shipped' | 'Pending'
  total: number
  product: {
    name: string
    quantity: number
    image: string
  }
}

const orders: Order[] = [
  {
    id: 'ORD-20489',
    date: '19 October 2025',
    status: 'Delivered',
    total: 289.86,
    product: {
      name: 'Dior J\'adore Eau de Parfum',
      quantity: 1,
      image: 'https://i0.wp.com/amore.com.gt/wp-content/uploads/2022/03/1-12.png?w=600&ssl=1'
    }
  },
  {
    id: 'ORD-20312',
    date: '12 October 2025',
    status: 'Shipped',
    total: 99.99,
    product: {
      name: 'Chanel No.5',
      quantity: 2,
      image: 'https://www.mkshopcambodia.com/wp-content/uploads/2022/02/s719260-main-zoom-768x768.jpg'
    }
  },
  {
    id: 'ORD-20201',
    date: '5 October 2025',
    status: 'Pending',
    total: 159.99,
    product: {
      name: 'Tom Ford Noir Extreme',
      quantity: 1,
      image: 'https://i0.wp.com/dperfumes.cl/wp-content/uploads/2023/12/neroli-portofino-edp-100-ml-tom-ford.webp?w=800&ssl=1'
    }
  }
]

const totalSpent = computed(() => {
  return orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)
})

const statusClass = (status: string) => {
  const classes = {
    'Delivered': 'text-green-300',
    'Shipped': 'text-blue-300',
    'Pending': 'text-yellow-300'
  }
  return classes[status as keyof typeof classes] || ''
}

// Interactive Functions
const viewDetails = (order: Order) => {
  console.log('Viewing order:', order)
  alert(`Order Details:\n\n${order.product.name}\nTotal: $${order.total}\nStatus: ${order.status}`)
}

const buyAgain = (order: Order) => {
  console.log('Buying again:', order)
  alert(`Added to cart: ${order.product.name}`)
}
</script>

<style scoped>
/* Smooth transitions */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:active {
  transform: scale(0.98);
}

/* Custom gradient */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Apply fonts globally */
.font-playfair {
  font-family: 'Playfair Display', serif;
}

.font-lora {
  font-family: 'Lora', serif;
}
</style>