import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  count: 0,
  citys:["杭州","武汉"],
  foods:["西瓜","西红柿"]
}

const mutations = {
  addCity(state,city){
    state.citys.push(city);
  },
  addItem(state,{type,item}){
    state[type].push(item);
  }
}

const actions = {
  addCity:({ commit },city)=>commit('addCity',city),
  addItem:({ commit },{type,item})=>commit('addItem',{type,item}),
}

const getters = {
 
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})