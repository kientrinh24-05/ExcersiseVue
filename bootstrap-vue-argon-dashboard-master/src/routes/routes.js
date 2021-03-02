import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      },
      {
        path: '/viewproduct',
        name: 'viewproduct',
        component: () => import(/* webpackChunkName: "demo" */ '../views/ViewProduct.vue')
      },
      {
        path: '/viewspecies_product',
        name: 'viewspecies_product',
        component: () => import(/* webpackChunkName: "demo" */ '../views/ViewSpeciesProduct.vue')
      },
      {
        path: '/meterial_product',
        name: 'meterial_product',
        component: () => import(/* webpackChunkName: "demo" */ '../views/MeterialProduct.vue')
      },
      {
        path: '/report',
        name: 'report',
        component: () => import(/* webpackChunkName: "demo" */ '../views/ReportProduct.vue')
      },
      {
        path: '/productlist',
        name: 'productlist',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Product-List.vue')
      },
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
