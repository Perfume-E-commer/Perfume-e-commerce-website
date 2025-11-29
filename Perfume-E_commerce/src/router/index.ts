import CartView from '@/views/customer/CartView.vue'
import VerifyEmail from '@/views/auth/VerifyEmail.vue'
import UserProfile from '@/views/customer/UserProfile.vue'

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  // error pages
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/layout/Error404.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/401',
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
  {
    path: '/productlist/:id',
    name: 'productdetail',
    component: () => import('@/views/customer/ProductDetail.vue'),
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
    path: '/admindashboard',
    name: 'admindashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
  },
  {
    path: '/dashboardaddproduct',
    name: 'dashboardaddproduct',
    component: () => import('@/views/admin/DashboardAddProduct.vue'),
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
  {
    path: '/dashboardtransaction',
    name: 'dashboardtransaction',
    component: () => import('@/views/admin/DashboardTransaction.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyEmail,
  },
  {
    path: '/account',
    name: 'account',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
