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
        requiresAuth: true,
        access: []
      },
      children: [
        {
          path: '/dashboard',
          name: 'Tổng Quát',
         
          component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue'),
          meta:{
            requiredRoles:['superuser','admin','user']
          }
        },
        {
          path: '/icons',
          name: 'Quản Lý Bàn',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue'),
          meta:{
            requiredRoles:['superuser','admin','user']
          }
        },
        {
          path: '/profile',
          name: 'Thông tin người dùng',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue'),
          meta:{
            requiredRoles:['superuser','admin','user']
          }
        },
        {
          path: '/maps',
          name: 'Danh sách món ăn ',
          component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue'),
          meta:{
            requiredRoles:['superuser','admin']
          }
          
        },
        {
          path: '/tables',
          name: 'Quản Lý Nhà Cung Cấp',
        
          component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue'),
          meta:{
            requiredRoles:['superuser','admin']
          }
        },
        {
          path: '/usermanger',
          name: 'Quản Lý Nhân Viên',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Usermanager.vue'),
          meta: {
            requiredRoles:['superuser']
          }
        },
      
        {
          path: '/viewproduct',
          name: 'Quản Lý Món Ăn',
          meta: {
            requiresRoles:['supperuser','admin']
          },
          component: () => import(/* webpackChunkName: "demo" */ '../views/ViewProduct.vue')
        },
        {
          path: '/viewspecies_product',
          name: 'Quản Lý Thể Loại Món',
        
          component: () => import(/* webpackChunkName: "demo" */ '../views/ViewSpeciesProduct.vue'),
          meta:{
            requiredRoles:['superuser','admin']
          }
        },
        {
          path: '/meterial',
          name: 'Danh sách nguyên liệu',
         
          component: () => import(/* webpackChunkName: "demo" */ '../views/Meterial.vue'),
          meta:{
            requiredRoles:['superuser','admin']
          }
        },
        {
          path: '/meterial_product',
          name: 'Quản Lý Nhập Nguyên Liệu',
       
          component: () => import(/* webpackChunkName: "demo" */ '../views/MeterialProduct.vue'),
          meta:{
            requiredRoles:['superuser','admin']
          }
        },
        {
          path: '/report',
          name: 'Báo Cáo',
         
          component: () => import(/* webpackChunkName: "demo" */ '../views/ReportProduct.vue'),
          meta:{
            requiredRoles:['superuser','admin']
          }
        },
        {
          path: '/productlist',
          name: 'Thông tin bàn ăn',   
          meta:{
            requiredRoles:['superuser','admin','user']
          },
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
    },
    {
      path: '/404',
      redirect: '404',
      component: AuthLayout
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
  var auth = JSON.parse(localStorage.getItem('auth'));
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth) {
      if(Object.hasOwnProperty.call(to.meta, 'requiredRoles')) {
        if(to.meta.requiredRoles.includes(auth.role)) {
          next()
        } else {
          next('/*')
        }
      } else {
        next()
      }
      next()
      return;
    }
   
    next('/login');
  }
  
  else {
    next()
  }

})

export default router;
