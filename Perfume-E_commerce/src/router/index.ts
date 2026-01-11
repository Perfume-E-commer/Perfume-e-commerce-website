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
    path: '/mainDashboard',
    name: 'mainDashboard',
    component: () => import('@/views/admin/MainDashboard.vue'),
    redirect: '/mainDashboard/admindashboard',
    children: [
      {
        path: 'inventory',
        name: 'inventory',
        component: () => import('@/views/admin/InventoryView.vue'), 
      },
      {
        path: 'admindashboard',
        name: 'admindashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
      },
      {
        path: 'adminprofile',
        name: 'adminprofile',
        component: () => import('@/views/admin/AdminProfile.vue'),
      },

      // --- PRODUCT MANAGEMENT (Cleaned Paths) ---
      {
        path: 'products',
        name: 'product-list',
        component: () => import('@/views/admin/ProductList.vue'),
      },
      {
        path: 'product/add',
        name: 'product-add',
        component: () => import('@/views/admin/DashboardAddProduct.vue'),
      },
      {
        path: 'product/edit/:id',
        name: 'product-edit',
        component: () => import('@/views/admin/DashboardAddProduct.vue'),
      },
      {
        path: 'dashboardpromotion',
        name: 'dashboardpromotion',
        component: () => import('@/views/admin/DashboardPromotion.vue'),
      },
      // {
      //   path: 'dashboardcategories',
      //   name: 'dashboardcategories',
      //   component: () => import('@/views/admin/ProductList.vue'),
      //   children: [
      //     {
      //       path: 'updatecategory/:id',
      //       name: 'updatecategory',
      //       component: () => import('@/views/admin/UpdateCategory.vue'),
      //     },
      //   ],
      // },
      {
        path: 'dashboardordermanagement',
        name: 'dashboardordermanagement',
        component: () => import('@/views/admin/DashboardOrderManagement.vue'),
      },
      {
        path: 'dashboardcustomer',
        name: 'dashboardcustomer',
        component: () => import('@/views/admin/DashboardCustomer.vue'),
      },
      // {
      //   path: 'dashboard-addproduct',
      //   name: 'dashboard-addproduct',
      //   component: () => import('@/views/admin/DashboardAddProduct.vue'),
      // },
      // {
      //   path: 'dashboard-addproduct/:id',
      //   name: 'dashboard-editproduct',
      //   component: () => import('@/views/admin/DashboardAddProduct.vue'),
      // },
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
