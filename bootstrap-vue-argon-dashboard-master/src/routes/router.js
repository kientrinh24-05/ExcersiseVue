import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';
import NotFound from '@/views/NotFoundPage.vue';
import { xhr } from 'd3';

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  // routes, // short for routes: routes
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'Tổng Quát',
         
          component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue'),
          meta:{
            requiredRoles:['supperuser','admin']
          }
        },
        {
          path: '/icons',
          name: 'Quản Lý Bàn',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue'),
          // meta: {
          //   requiresAuth: true,
          //   is_supperuser: true,
          //   is_admin:true,
          // },
        },
        {
          path: '/profile',
          name: 'Thông tin người dùng',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue'),
          // meta: {
          //   requiresAuth: true
          // },
        },
        {
          path: '/maps',
          name: 'Danh sách món ăn ',
          component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue'),
          // meta: {
          //   requiresAuth: true
          // },
        },
        {
          path: '/tables',
          name: 'Quản Lý Nhà Cung Cấp',
          // meta: {
          //   requiresAuth: true
          // },
          component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
        },
        {
          path: '/usermanger',
          name: 'Quản Lý Nhân Viên',
          // meta: {
          //   requiresAuth: true,
          // },
          component: () => import(/* webpackChunkName: "demo" */ '../views/Usermanager.vue'),

          // beforeEnter(to, from, next) {
            
          //   if (supperuser = false  , admin = true) {
          //     console.log("Kane");
          //    next();
          //   }
          //   next("/");
          // }



        },
        {
          path: '/viewproduct',
          name: 'Quản Lý Món Ăn',
          meta: {
            requiresRoles:['supperuser','admin  ']
          },
          component: () => import(/* webpackChunkName: "demo" */ '../views/ViewProduct.vue')
        },
        {
          path: '/viewspecies_product',
          name: 'Quản Lý Thể Loại Món',
          // meta: {
          //   requiresAuth: true
          // },
          component: () => import(/* webpackChunkName: "demo" */ '../views/ViewSpeciesProduct.vue')
        },
        {
          path: '/meterial',
          name: 'Danh sách nguyên liệu',
          // meta: {
          //   requiresAuth: true
          // },
          component: () => import(/* webpackChunkName: "demo" */ '../views/Meterial.vue')
        },
        {
          path: '/meterial_product',
          name: 'Quản Lý Nhập Nguyên Liệu',
          // meta: {
          //   requiresAuth: true
          // },
          component: () => import(/* webpackChunkName: "demo" */ '../views/MeterialProduct.vue'),
          // meta: {
          //   requiresAuth: true
          // }
        },
        {
          path: '/report',
          name: 'Báo Cáo',
          // meta: {
          //   requiresAuth: true
          // },
          component: () => import(/* webpackChunkName: "demo" */ '../views/ReportProduct.vue')
        },
        {
          path: '/productlist',
          name: 'Thông tin bàn ăn',   
          // meta: {
          //   requiresAuth: true
          // },
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
  ],

  linkActiveClass: 'active',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Đăng Nhập' && !isAuthenticated) next({ name: 'Đăng Nhập' })
//   next()
// })
router.beforeEach((to, from, next) => {
 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    var token = localStorage.getItem('token')
    if (token) {
      next()
      return
    }
  
    
    next('/login')

  } else {
    next()
  }
})

export default router;
