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
      {
        path: 'dashboardtransaction',
        name: 'dashboardtransaction',
        component: () => import('@/views/admin/DashboardTransaction.vue'),
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
export default router
