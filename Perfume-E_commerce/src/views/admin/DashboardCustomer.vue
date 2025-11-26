<template>
  <div class="border-t border-gray-200 p-4">
    <Sidebar />
    <div class="flex items-center space-x-3 mb-3">
      <div class="flex-shrink-0">
        <img
          :src="userAvatar"
          alt="Avatar"
          class="w-10 h-10 rounded-full object-cover border-2 border-purple-300"
        />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
        <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
        <span
          :class="roleBadgeClasses"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
        >
          {{ userRoleText }}
        </span>
      </div>
    </div>

    <div class="space-y-1">
      <a
        href="/profile"
        @click="$emit('nav-click')"
        class="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
        Profile
      </a>

      <form method="POST" action="/logout" class="inline">
        <button
          type="submit"
          @click="$emit('nav-click')"
          class="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          Log Out
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import Sidebar from '@/views/layout/Sidebar.vue';

export default {
  name: 'UserProfileSection',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  emits: ['nav-click'],
  setup(props) {
    const userAvatar = computed(() => {
      return props.user.profile?.avatar
        ? `/storage/${props.user.profile.avatar}`
        : '/images/default-avatar.png'
    })

    const userRoleText = computed(() => {
      if (props.user.isSuperAdmin) return 'Super Admin'
      if (props.user.isRegularAdmin) return 'Admin'
      return 'User'
    })

    const roleBadgeClasses = computed(() => {
      if (props.user.isSuperAdmin) return 'bg-purple-100 text-purple-800'
      if (props.user.isRegularAdmin) return 'bg-red-100 text-red-800'
      return 'bg-blue-100 text-blue-800'
    })

    return {
      userAvatar,
      userRoleText,
      roleBadgeClasses,
    }
  },
}
</script>
