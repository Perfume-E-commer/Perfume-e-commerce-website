import { defineStore } from 'pinia'
import authService from '@/services/authService'
import router from '@/router'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from '@/stores/cartStore'

interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: localStorage.getItem('token') || '',
    loading: false,
    error: '',
  }),

  getters: {
    isAuthenticated(): boolean {
      return !!this.token && !!this.user
    },
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = ''

      try {
        const data = await authService.login(email, password)

        this.token = data.token
        this.user = { id: data.id, email: data.email, role: data.role }

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(this.user))

        // Load user-specific wishlist after login
        const wishlistStore = useWishlistStore()
        await wishlistStore.loadUserWishlist()

        if (data.role === 'ADMIN') {
          router.push({ name: 'admin-dashboard' })
        } else {
          router.push({ name: 'home' })
        }

        return true
      } catch (err: any) {
        this.error =
          err.response?.data?.message || err.response?.data || err.message || 'Login failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async register(firstName: string, lastName: string, email: string, password: string) {
      this.loading = true
      this.error = ''

      try {
        await authService.register(firstName, lastName, email, password)
        router.push('/login')
        return true
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Registration failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async verify(email: string, code: string) {
      this.loading = true
      this.error = ''
      try {
        await authService.verifyEmail(email, code)
        return true
      } catch (err: any) {
        this.error = err.response?.data || 'Verification failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async resend(email: string) {
      try {
        await authService.resendCode(email)
        return true
      } catch (err: any) {
        this.error = 'Failed to resend code'
        return false
      }
    },

    logout() {
      // Reset wishlist before clearing user data
      const wishlistStore = useWishlistStore()
      wishlistStore.resetWishlist()

      this.user = null
      this.token = ''
      authService.logout()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    },
  },
})
