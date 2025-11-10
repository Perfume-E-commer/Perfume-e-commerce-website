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
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
const routes: RouteRecordRaw[] = [
  // Checking Error 404 or 401
  {
    path: '/401',
    name: '401',
    component: Error401,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/401', // redirect to 401 page
  },
  // customer
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: AboutUs,
  },
  {
    path: '/service',
    name: 'service',
    component: OurService,
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogCollection,
  },
  {
    path: '/blog/:id',
    name: 'blogpage',
    component: BlogPage,
  },
  {
    path: '/productlist',
    name: 'productlist',
    component: ProductList,
  },
  {
    path: '/productlist/:id',
    name: 'productdetail',
    component: ProductDetail,
  },

  // auth
  {
    path: '/login',
    name: 'login',
    component: LoginAuth,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterAuth,
  },

  // admin
  {
    path: '/admindashboard',
    name: 'admindashboard',
    component: AdminDashboard,
  },
  {
    path: '/dashboardaddproduct',
    name: 'dashboardaddproduct',
    component: DashboardAddProduct,
  },
  {
    path: '/dashboardcategories',
    name: 'dashboardcategories',
    component: DashboardCategories,
  },
  {
    path: '/dashboardcustomer',
    name: 'dashboardcustomer',
    component: DashboardCustomer,
  },
  {
    path: '/dashboardordermanagement',
    name: 'dashboardordermanagement',
    component: DashboardOrderManagement,
  },
  {
    path: '/dashboardtransaction',
    name: 'dashboardtransaction',
    component: DashboardTransaction,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
