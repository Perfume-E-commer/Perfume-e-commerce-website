<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import { storeToRefs } from 'pinia'
import { Bell } from 'lucide-vue-next'

const store = useNotificationStore()
const { unreadCount, sortedNotifications } = storeToRefs(store)
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

const timeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const getTypeConfig = (type: string) => {
  const configs = {
    ORDER_UPDATE: {
      // Clean, flat backgrounds instead of gradients
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-700',
      label: 'Order Update',
    },
    STOCK_ALERT: {
      iconBg: 'bg-red-50',
      iconColor: 'text-red-700',
      label: 'Stock Alert',
    },
    PROMOTION: {
      // Use your brand color family here
      iconBg: 'bg-[#280559]/10',
      iconColor: 'text-[#280559]',
      label: 'Promotion',
    },
    SYSTEM: {
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      label: 'System',
    },
  }

  return configs[type as keyof typeof configs] || configs.SYSTEM
}

const markAsRead = (id: string) => {
  store.markRead(id)
}

onMounted(() => {
  store.fetchNotifications()
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click.stop="toggleDropdown"
      class="relative group flex items-center justify-center transition-colors"
      type="button"
    >
      <Bell
        stroke-width="1.5"
        class="w-6 h-6 xl:w-8 xl:h-8 text-black hover:text-[#280559] hover:scale-110 transition-all duration-300"
        :class="
          isOpen
            ? 'text-[#280559] fill-[#280559]/10'
            : 'text-black hover:bg-gray-200 rounded-full p-0.5'
        "
      />

      <div
        v-if="unreadCount > 0"
        class="absolute top-0 right-0 min-w-4.5 h-4.5 flex items-center justify-center rounded-full bg-red-600 border-2 border-white"
      >
        <span class="text-[10px] font-bold text-white leading-none">
          {{ unreadCount > 9 ? '9+' : unreadCount }}
        </span>
      </div>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-4 z-50 w-96 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 transform transition-all duration-200 ease-out origin-top-right"
    >
      <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 class="text-xl text-[#280559] luxurious-roman-regular">Notifications</h3>
          <p class="text-xs text-gray-400 mt-1 luxurious-roman-regular">
            {{ unreadCount > 0 ? `You have ${unreadCount} new messages` : 'No new notifications' }}
          </p>
        </div>

        <button
          @click="store.markAllRead()"
          class="text-xs font-medium text-gray-400 hover:text-[#280559] transition-colors underline-offset-2 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="unreadCount === 0"
        >
          Mark all read
        </button>
      </div>

      <div class="max-h-112 overflow-y-auto">
        <div v-if="sortedNotifications.length === 0" class="py-12 text-center">
          <Bell
            class="w-6 h-6 xl:w-8 xl:h-8 text-black hover:text-[#280559] hover:scale-110 transition-all duration-300"
            stroke-width="1"
          />
          <p class="text-gray-400 luxurious-roman-regular">Your notification list is empty</p>
        </div>

        <div v-for="note in sortedNotifications" :key="note.id">
          <a
            href="#"
            @click.prevent="markAsRead(note.id)"
            class="group block px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 relative"
          >
            <div
              v-if="!note.isRead"
              class="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#280559]"
            ></div>

            <div class="flex items-start space-x-4">
              <div
                class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                :class="getTypeConfig(note.type).iconBg"
              >
                <Bell
                  class="w-6 h-6 xl:w-8 xl:h-8 text-black hover:text-[#280559] hover:scale-110 transition-all duration-300"
                  :class="getTypeConfig(note.type).iconColor"
                  stroke-width="1.5"
                />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[10px] tracking-wider uppercase font-semibold text-gray-400">
                    {{ getTypeConfig(note.type).label }}
                  </span>
                  <span class="text-[10px] text-gray-400 font-medium">
                    {{ timeAgo(note.createdAt) }}
                  </span>
                </div>

                <p
                  class="text-sm leading-relaxed text-gray-600 line-clamp-2"
                  :class="{ 'text-gray-900 font-medium': !note.isRead }"
                >
                  {{ note.message }}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="p-2 bg-gray-50 rounded-b-xl text-center">
        <a
          href="#"
          class="block py-2 text-xs font-medium text-gray-500 hover:text-[#280559] transition-colors"
        >
          View All History
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
