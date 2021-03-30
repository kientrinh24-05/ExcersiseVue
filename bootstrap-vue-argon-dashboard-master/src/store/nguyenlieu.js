import axios from 'axios'
const state = {
    nguyenlieu: []
}

const getters = {

}

const actions = {
    addnguyenlieu({ commit }, nguyenlieus) {
        commit('addnguyenlieu', nguyenlieus)
    },
}

const mutations = {
    addnguyenlieu: (state, nguyenlieus) => {
        state.nguyenlieu.unshift(nguyenlieus);
    }
}

export default { namespaced: true, state, actions, getters, mutations }