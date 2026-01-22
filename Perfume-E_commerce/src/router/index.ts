import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import authService from '@/services/authService'
const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: '/404',
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/layout/Error404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },

  // CUSTOMER ROUTES (Public)
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/customer/HomePage.vue'),
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('@/views/customer/AboutUs.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/customer/Contact.vue'),
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/customer/ArticleDetail.vue'),
  },
  {
    path: '/productlist',
    name: 'productlist',
    component: () => import('@/views/customer/ProductList.vue'),
  },
  // {
  //   path: '/productlist/:id',
  //   name: 'productdetail',
  //   component: () => import('@/views/customer/ProductDetail.vue'),
  // },
  {
    path: '/productdetail/:id',
    name: 'ProductDetail',
    component: () => import('@/views/customer/ProductDetail.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/customer/CartView.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/customer/CheckOut.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/successful',
    name: 'successful',
    component: () => import('@/views/customer/SuccessfullOrder.vue'),
    meta: { requiresAuth: true },
  },

  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/views/auth/VerifyEmail.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/customer/UserProfile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/customer/UserProfile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/customer/CartView.vue'),
  },

  // AUTH ROUTES
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginAuth.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterAuth.vue'),
  },

  // admin
  {
    path: '/create-admin',
    name: 'create-admin',
    component: () => import('@/views/auth/CreateAdmin.vue'),
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/views/auth/VerifyEmail.vue'),
  },
  {
    path: '/account',
    component: () => import('../views/customer/AccountLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/account/profile',
      },
      {
        path: 'profile',
        name: 'My Profile',
        component: () => import('../views/customer/UserProfile.vue'),
      },
      {
        path: 'orders',
        name: 'My Orders',
        component: () => import('../views/customer/MyOrders.vue'),
      },
      // {
      //   path: 'returns',
      //   name: 'My Returns',
      //   component: () => import('@/views/customer/MyReturns.vue'),
      // },
      {
        path: 'wishlist',
        name: 'My Wishlist',
        component: () => import('@/views/customer/MyWishlist.vue'),
      },
      // {
      //   path: 'history',
      //   name: 'Order History',
      //   component: () => import('@/views/customer/OrderHistory.vue'),
      // }
    ],
  },

  // ADMIN DASHBOARD (Layout Wrapper)
  {
    path: '/admin',
    component: () => import('../views/admin/MainDashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-home',
        component: () => import('@/views/admin/AdminDashboard.vue'),
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
      },

      // Inventory
      {
        path: 'inventory',
        name: 'admin-inventory',
        component: () => import('@/views/admin/InventoryView.vue'),
      },

      // Profile
      {
        path: 'profile',
        name: 'admin-profile',
        component: () => import('@/views/admin/AdminProfile.vue'),
      },

      // Products
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('@/views/admin/ProductList.vue'),
      },
      {
        path: 'products/add',
        name: 'admin-product-add',
        component: () => import('@/views/admin/DashboardAddProduct.vue'),
      },
      {
        path: 'products/edit/:id',
        name: 'admin-product-edit',
        component: () => import('@/views/admin/DashboardAddProduct.vue'),
      },

      // Promotions
      {
        path: 'promotions',
        name: 'admin-promotions',
        component: () => import('@/views/admin/DashboardPromotion.vue'),
      },

      // Orders
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/views/admin/DashboardOrderManagement.vue'),
      },

      // Customers
      {
        path: 'customers',
        name: 'admin-customers',
        component: () => import('@/views/admin/DashboardCustomer.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated()
  const requiresAuth = to.meta.requiresAuth
  const isLoginPage = to.name === 'login'

  if (isAuthenticated && isLoginPage) {
    next({ name: 'admindashboard' })
  } else if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
