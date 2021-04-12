<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Trang Chủ',
            path: '/dashboard',

            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Cài Đặt Bàn',
            path: '/icons',
            icon: 'ni ni-planet text-blue',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Order Món Ăn',
            path: '/productlist',
            icon: 'ni ni-planet text-green',
          }"
        >
        </sidebar-item>
        <!-- v-if="curentadmin.superuser && curentadmin.admin" -->
        <sidebar-item
          :link="{
            name: 'Quản Lý Nhân Viên',
            path: '/usermanger',
            icon: 'ni ni-circle-08 text-red',
          }"
        >
        </sidebar-item>
        <!-- Cài đặt Món -->
        <sidebar-item
          :link="{
            name: 'Cài đặt menu',
            icon: 'ni ni-shop text-primary',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Danh sách món',
              path: '/maps',
              icon: 'ni ni-air-baloon text-green',
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: 'Cài đặt Món',
              path: '/viewproduct',
              icon: 'ni ni-pin-3 text-orange',
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: 'Cài đặt phân loại',
              path: '/viewspecies_product',
              icon: 'ni ni-pin-3 text-yellow',
            }"
          >
          </sidebar-item>
        </sidebar-item>
        <!-- Cài đặt nhà phân phối -->
        <sidebar-item
          :link="{
            name: 'Cài đặt nhà phân phối',
            icon: 'ni ni-pin-3 text-green',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Thiết lập nhà phân phối',
              path: '/tables',
              icon: 'ni ni-air-baloon text-green',
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: 'Thiết lập nguyên liệu',
              path: '/meterial',
              icon: 'ni ni-air-baloon text-green',
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: 'Nhập nguyên liệu',
              path: '/meterial_product',
              icon: 'ni ni-pin-3 text-orange',
            }"
          >
          </sidebar-item>
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Báo cáo',
            path: '/report',
            icon: 'ni ni-bullet-list-67 text-red',
          }"
        >
        </sidebar-item>

        <!--  <sidebar-item
          :link="{
            name: 'Đăng Xuất',
            path: '/login',
            icon: 'ni ni-key-25 text-info',
          }"
        >
        </sidebar-item>-->
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  data() {
    return {};
  },
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition,
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
  },
  mounted() {
    this.initScrollbar();
  },
  created() {
    //   supperuser = localStorage.getItem("superuser");
    //  admin = localStorage.getItem("admin");
  },
};
</script>
