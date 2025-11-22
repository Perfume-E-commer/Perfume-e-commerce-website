import AboutUs from '@/views/customer/AboutUs.vue'
import BlogCollection from '@/views/customer/BlogCollection.vue'
import BlogPage from '@/views/customer/BlogPage.vue'
import HomePage from '@/views/customer/HomePage.vue'
import OurService from '@/views/customer/OurService.vue'
import ProductDetail from '@/views/customer/ProductDetail.vue'
import ProductList from '@/views/customer/ProductList.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import DashboardAddProduct from '@/views/admin/DashboardAddProduct.vue'
import DashboardCategories from '@/views/admin/DashboardCategories.vue'
import DashboardCustomer from '@/views/admin/DashboardCustomer.vue'
import DashboardOrderManagement from '@/views/admin/DashboardOrderManagement.vue'
import DashboardTransaction from '@/views/admin/DashboardTransaction.vue'
import LoginAuth from '@/views/auth/LoginAuth.vue'
import RegisterAuth from '@/views/auth/RegisterAuth.vue'
import Error401 from '@/components/layout/Error401.vue'
import CartView from '@/views/customer/CartView.vue'
import VerifyEmail from '@/views/auth/VerifyEmail.vue'
import UserProfile from '@/views/customer/UserProfile.vue'

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  // error pages
  {
    path: '/401',
    name: '401',
    component: () => import('@/components/layout/Error401.vue'),
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
    component: CartView
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyEmail
  },
  {
  path: '/account',
  name: 'account',
  component: UserProfile,
  meta: { requiresAuth: true }
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
