import Vue from 'vue'
import Vuex from 'vuex'
import nguyenlieu from './nguyenlieu'
import axios from 'axios'
Vue.use(Vuex)

const store= new Vuex.Store({
    // modules:{
    //   nguyenlieu
    // }
     state : {
    //   nguyenlieu: []
    status: '',
    token: localStorage.getItem('token') || '',
    username : {},
    admin:"",
    superuser:"",
  },
  
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  
   actions : {
    //   addnguyenlieu({ commit }, nguyenlieus) {
    //       commit('addnguyenlieu', nguyenlieus)
    //   },

    login({commit}, username){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://127.0.0.1:8000/auth/login/', data: username, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const username = resp.data.username
            const admin = resp.data.admin
            const superuser = resp.data.superuser
            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            localStorage.setItem('admin', admin)
            localStorage.setItem('superuser', superuser)
            console.log(token);
          
            axios.defaults.headers.common['Authorization'] = 'Bearer '+token
            commit('auth_success', token, username)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
    },
    register({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: 'http://127.0.0.1:8000/auth/register/', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            // axios.defaults.headers.common['Authorization'] = token
            axios.defaults.headers.common['Authorization'] = 'Bearer '+token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
    logout({commit}){
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      },

  },
  
  mutations : {
    //   addnguyenlieu: (state, nguyenlieus) => {
    //       state.nguyenlieu.unshift(nguyenlieus);
    //   }
    auth_request(state){
        state.status = 'loading'
        console.log(status);
      },
      auth_success(state, token, username){
        state.status = 'success'
        state.token = token
        state.username = username
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
      },
  },
 
})
// export default { namespaced: true, state, actions, mutations }
export default store



//   const state = {
//     user,
//     nguyenlieu: []
//   };

//   const actions= {
//     reGisterUser({commit,state},user){
//         axios.post('http://api.plos.org/search?q=title:%22Drosophila%22%20and%20body:%22RNA%22&fl=id&start=100&rows=100',user).then(response =>{
//             console.log(response);
//         })
//     },
//     addnguyenlieu({commit}, nguyenlieu){
//       commit('addNguyenlieu', nguyenlieu);
//     }
    
//    };
//    const mutations= {
//     addNguyenlieu: (state, nguyenlieu) => {
//       state.nguyenlieu.unshift(nguyenlieu);
//   }
// };


    
