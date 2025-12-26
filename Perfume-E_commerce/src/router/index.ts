import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import authService from '@/Services/authService'
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

  // customer
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

  // auth
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
    name: 'createadmin',
    component: () => import('@/views/auth/CreateAdmin.vue'),
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('@/views/auth/VerifyEmail.vue'),
  },
  {
    path: '/dashboardcategories',
    name: 'dashboardcategories',
    component: () => import('@/views/admin/DashboardCategories.vue'),
  },
  {
    path: '/dashboardcustomer',
    name: 'dashboardcustomer',
    // @ts-ignore: implicit any for .vue import; add a proper Vue shim (src/shims-vue.d.ts) to remove this ignore
    component: () => import('@/views/admin/DashboardCustomer.vue'),
  },
  {
    path: '/dashboardordermanagement',
    name: 'dashboardordermanagement',
    component: () => import('@/views/admin/DashboardOrderManagement.vue'),
  },

  // admin
  {
    path: '/mainDashboard',
    name: 'mainDashboard',
    component: () => import('@/views/admin/MainDashboard.vue'),
    children: [
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
      {
        path: 'dashboardcategories',
        name: 'dashboardcategories',
        component: () => import('@/views/admin/DashboardCategories.vue'),
        children: [
          {
            path: 'updatecategory/:id',
            name: 'updatecategory',
            component: () => import('@/views/admin/UpdateCategory.vue'),
          },
        ],
      },
      {
        path: 'dashboardtransaction',
        name: 'dashboardtransaction',
        component: () => import('@/views/admin/DashboardTransaction.vue'),
      },
      {
        path: 'dashboardaddproduct',
        name: 'dashboardaddproduct',
        component: () => import('@/views/admin/DashboardAddProduct.vue'),
      },
      {
        path: 'dashboardaddproduct/:id',
        name: 'dashboardeditproduct',
        component: () => import('@/views/admin/DashboardAddProduct.vue'),
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
