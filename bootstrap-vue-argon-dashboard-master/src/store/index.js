import Vue from 'vue'
import Vuex from 'vuex'
import nguyenlieu from './nguyenlieu'

Vue.use(Vuex)

const store= new Vuex.Store({
    // modules:{
    //   nguyenlieu
    // }
     state : {
      nguyenlieu: []
  },
  
  getters : {
  
  },
  
   actions : {
      addnguyenlieu({ commit }, nguyenlieus) {
          commit('addnguyenlieu', nguyenlieus)
      },
  },
  
  mutations : {
      addnguyenlieu: (state, nguyenlieus) => {
          state.nguyenlieu.unshift(nguyenlieus);
      }
  }
  
})

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
// export default { namespaced: true, state, actions, mutations }

    
