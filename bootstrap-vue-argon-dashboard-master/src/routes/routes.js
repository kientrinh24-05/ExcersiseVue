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
        name: 'Tổng Quát',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'Quản Lý Bàn',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'Thông tin người dùng',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'Danh sách món ăn ',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'Quản Lý Nhà Cung Cấp',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      },
      {
        path: '/viewproduct',
        name: 'Quản Lý Món Ăn',
        component: () => import(/* webpackChunkName: "demo" */ '../views/ViewProduct.vue')
      },
      {
        path: '/viewspecies_product',
        name: 'Quản Lý Thể Loại Món',
        component: () => import(/* webpackChunkName: "demo" */ '../views/ViewSpeciesProduct.vue')
      },
      {
        path: '/meterial',
        name: 'Quản Lý Nguyên Liệu',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Meterial.vue')
      },
        
      {
        path: '/meterial_product',
        name: 'Nhập Nguyên Liệu',
        component: () => import(/* webpackChunkName: "demo" */ '../views/MeterialProduct.vue')
      },
      {
        path: '/report',
        name: 'Báo Cáo',
        component: () => import(/* webpackChunkName: "demo" */ '../views/ReportProduct.vue')
      },
      {
        path: '/productlist',
        name: 'Thông tin bàn ăn',
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
        name: 'Đăng Nhập',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'Đăng Ký',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      {
        path: '/changepass',
        name: 'Đổi Mật Khẩu',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/ChangePass.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
