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
import Toaster from 'v-toaster'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
// import stockInit from 'highcharts/modules/stock'
// import mapInit from 'highcharts/modules/map'
// import addWorldMap from './js/worldmap'
// stockInit(Highcharts)
// mapInit(Highcharts)
// addWorldMap(Highcharts)
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'
 
// optional set default imeout, the default is 10000 (10 seconds).

window.Vue = Vue;
// router setup
import router from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(Vuex)
Vue.use(Toaster, {timeout: 3000})
Vue.use(HighchartsVue)

Vue.prototype.moment = moment
Vue.prototype.$http = axios;

// Get token nếu có token thì call.
// const info = {};
// localStorage.setItem('auth', JSON.stringify(info));
// let token = localStorage.getItem('token') ;

let token = JSON.parse(window.localStorage.getItem('auth'))


if( token ){
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token.token
}




/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store

  
});
