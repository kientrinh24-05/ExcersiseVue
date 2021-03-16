import Vue from 'vue'
import { axios } from 'vue/types/umd'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   
  },

  getters:{
    a
  },
  actions: {
    reGisterUser({commit,state},user){
        axios.post('http://api.plos.org/search?q=title:%22Drosophila%22%20and%20body:%22RNA%22&fl=id&start=100&rows=100',user).then(response =>{
            console.log(response);
        })
    }
   },
   mutations: {
  
    
    
  },
  modules: {
  },
})
