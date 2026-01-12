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

  // {
  //   path: '/dashboardcategories',
  //   name: 'dashboardcategories',
  //   component: () => import('@/views/admin/ProductList.vue'),
  // },
  // {
  //   path: '/dashboardcustomer',
  //   name: 'dashboardcustomer',
  //   component: () => import('@/views/admin/DashboardCustomer.vue'),
  // },
  // {
  //   path: '/dashboardordermanagement',
  //   name: 'dashboardordermanagement',
  //   component: () => import('@/views/admin/DashboardOrderManagement.vue'),
  // },

  // ADMIN DASHBOARD (Layout Wrapper)
  {
    path: '/admin',
    component: () => import('../views/admin/MainDashboard.vue'),
    meta: { requiresAuth: true }, // Protects all admin routes
    children: [
      {
        path: '', // Default route: /admin -> AdminDashboard
        name: 'admin-home',
        component: () => import('@/views/admin/AdminDashboard.vue'),
      },
      {
        path: 'dashboard', // /admin/dashboard
        name: 'admin-dashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
      },

      // 1. Inventory
      {
        path: 'inventory', // /admin/inventory
        name: 'admin-inventory',
        component: () => import('@/views/admin/InventoryView.vue'),
      },

      // 2. Profile
      {
        path: 'profile', // /admin/profile
        name: 'admin-profile',
        component: () => import('@/views/admin/AdminProfile.vue'),
      },

      // 3. Products
      {
        path: 'products', // /admin/products
        name: 'admin-products',
        component: () => import('@/views/admin/ProductList.vue'),
      },
      {
        path: 'products/add', // /admin/products/add
        name: 'admin-product-add',
        component: () => import('@/views/admin/DashboardAddProduct.vue'),
      },
      {
        path: 'products/edit/:id', // /admin/products/edit/123
        name: 'admin-product-edit',
        component: () => import('@/views/admin/DashboardAddProduct.vue'),
      },

      // 4. Promotions
      {
        path: 'promotions', // /admin/promotions
        name: 'admin-promotions',
        component: () => import('@/views/admin/DashboardPromotion.vue'),
      },

      // 5. Orders
      {
        path: 'orders', // /admin/orders
        name: 'admin-orders',
        component: () => import('@/views/admin/DashboardOrderManagement.vue'),
      },

      // 6. Customers
      {
        path: 'customers', // /admin/customers
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
