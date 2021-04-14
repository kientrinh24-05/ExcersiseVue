<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }"
  >
    <a
      href="#"
      aria-current="page"
      class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active"
    >
      {{ $route.name }}
    </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
      <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
      <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main"
        >
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
    </b-navbar-nav>
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
      <b-form
        class="navbar-search form-inline mr-sm-3"
        :class="{
          'navbar-search-dark': type === 'default',
          'navbar-search-light': type === 'light',
        }"
        id="navbar-search-main"
      >
        <b-form-group class="mb-0">
          <b-input-group class="input-group-alternative input-group-merge">
            <b-form-input placeholder="Search" type="text"> </b-form-input>

            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
            </div>
          </b-input-group>
        </b-form-group>
      </b-form>
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" src="img/theme/team-4.jpg" />
            </span>
            <b-media-body class="ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">{{ info.username }}</span>
            </b-media-body>
          </b-media>
        </a>

        <template>
          <b-dropdown-header class="noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </b-dropdown-header>
          <b-dropdown-item href="http://localhost:8080/profile#/profile">
            <i class="ni ni-settings-gear-65"></i>
            <span>Thông tin</span>
          </b-dropdown-item>
          <b-dropdown-item href="http://localhost:8080/profile#/changepass">
            <i class="ni ni-settings-gear-65"></i>
            <span>Đổi mật khẩu</span>
          </b-dropdown-item>

          <div class="dropdown-divider"></div>
          <b-dropdown-item @click="LogOut">
            <i class="ni ni-user-run"></i>
            <span>Đăng Xuất</span>
          </b-dropdown-item>
        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";
import axios from "axios";

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description: "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
    menu: {
      type: Boolean,
      default: false,
      description:""
        
  },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  created() {
    var isUser = JSON.parse(localStorage.getItem("auth"));

    if (isUser.username) {
      this.ShowProfile(isUser.username);
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",

      info: null,
    };
  },
  methods: {
    ShowProfile(username) {
      axios
        .get(`http://127.0.0.1:8000/auth/change_profile/` + username)
        .then((response) => {
          this.info = response.data.data;
          console.log(this.info);
        });
    },
    LogOut() {
      localStorage.clear();
      this.$router.push(`/login`);
      delete axios.defaults.headers.common["Authorization"];
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
  },
};
</script>
