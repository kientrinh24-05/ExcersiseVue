/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import store from './store'
import Vuex from 'vuex';
import axios from 'axios' 
import moment from 'vue-moment'

window.Vue = Vue;
// router setup
import router from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(Vuex)

Vue.prototype.moment = moment
Vue.prototype.$http = axios;

// Get token nếu có token thì call.
let token = localStorage.getItem('token') ;

if( token ){
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token
}




/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store

  
});
