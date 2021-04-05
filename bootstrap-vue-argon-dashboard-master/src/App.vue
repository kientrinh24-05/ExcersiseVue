<template>
  <router-view> </router-view>
</template>

<script>
// import Login from './views/Pages/Login.vue'
import axios from "axios";
export default {
  // components:{
  //   Login
  // }
  created() {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // this.$store.dispatch(logout)
          // console.log("Lỗi Cuu");
          console.log("121");
        }
        throw err;
      });
    });
  },
};
</script>

<style>
.modal-footer {
  display: none;
}
.img_food {
  width: 40px;
  height: 40px;
}
</style>
