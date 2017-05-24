import Vue from 'vue'
import Vuex from 'vuex'
import {storeFilter} from './components/SelectFilter/store'
Vue.use(Vuex)

const state = {
}

const mutations = {
}

const actions = {
}

const getters = {
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    storeFilter
  }
})