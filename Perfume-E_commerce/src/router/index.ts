import AboutUs from '@/views/customer/AboutUs.vue'
import BlogCollection from '@/views/customer/BlogCollection.vue'
import BlogPage from '@/views/customer/BlogPage.vue'
import HomePage from '@/views/customer/HomePage.vue'
import OurService from '@/views/customer/OurService.vue'
import ProductDetail from '@/views/customer/ProductDetail.vue'
import ProductList from '@/views/customer/ProductList.vue'
import MainDashboard from '@/views/admin/MainDashboard.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import DashboardAddProduct from '@/views/admin/DashboardAddProduct.vue'
import DashboardCategories from '@/views/admin/DashboardCategories.vue'
import DashboardOrderManagement from '@/views/admin/DashboardOrderManagement.vue'
import DashboardTransaction from '@/views/admin/DashboardTransaction.vue'
import DashboardCustomer from '../views/admin/DashboardCustomer.vue'
import LoginAuth from '@/views/auth/LoginAuth.vue'
import RegisterAuth from '@/views/auth/RegisterAuth.vue'
import CartView from '@/views/customer/CartView.vue'
import VerifyEmail from '@/views/auth/VerifyEmail.vue'
import CreateAdmin from '@/views/auth/CreateAdmin.vue'
import NotFound from '@/components/layout/NotFound.vue'
import CartView from '@/views/customer/CartView.vue'
import UserProfile from '@/views/customer/UserProfile.vue'
import ViewCategory from '@/views/components/viewCategory.vue'
import UpdateCategory from '@/views/admin/UpdateCategory.vue'

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { initFlowbite } from 'flowbite'
const routes: RouteRecordRaw[] = [
  // error pages
  // {
  //   path: '/:CatchAll(.*)',
  //   name: 'NotFound',
  //   component: NotFound,
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/NotFound',
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
    component: HomePage,
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: AboutUs,
  },
  {
    path: '/contact',
    name: 'contact',
    component: OurService,
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
      
    path: '/productdetail/:id',
    name: 'ProductDetail',
    component: () => import('@/views/customer/ProductDetail.vue'),
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
  {
    path: '/create-admin',
    name: 'createadmin',
    component: CreateAdmin,
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyEmail,
      
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
    name: 'admindashboard',
    component: MainDashboard,
    children: [
      {
        path: 'admindashboard',
        name: 'admindashboard',
        component: AdminDashboard,
      },
      {
        path: 'dashboardordermanagement',
        name: 'dashboardordermanagement',
        component: DashboardOrderManagement,
      },
      {
        path: 'dashboardcustomer',
        name: 'dashboardcustomer',
        component: DashboardCustomer,
      },
      {
        path: 'dashboardcategories',
        name: 'dashboardcategories',
        component: DashboardCategories,
        children: [
          {
            path: 'updatecategory/:id',
            name: 'updatecategory',
            component: UpdateCategory,
          },
        ],
      },
      {
        path: 'dashboardtransaction',
        name: 'dashboardtransaction',
        component: DashboardTransaction,
      },
      {
        path: 'dashboardaddproduct',
        name: 'dashboardaddproduct',
        component: DashboardAddProduct,
      },
      {
        path: 'dashboardaddproduct/:id',
        name: 'dashboardeditproduct',
        component: DashboardAddProduct,
      },
    ],
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
