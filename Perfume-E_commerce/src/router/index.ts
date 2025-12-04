import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
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
    component: () => import('@/views/customer/OurService.vue'),
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
  {
    path: '/productdetail/:id',
    name: 'ProductDetail',
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
    name: 'admindashboard',
    component: () => import('@/views/admin/MainDashboard.vue'),
    children: [
      {
        path: 'admindashboard',
        name: 'admindashboard',
        component: () => import('@/views/admin/AdminDashboard.vue'),
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
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/customer/CartView.vue'),
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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
