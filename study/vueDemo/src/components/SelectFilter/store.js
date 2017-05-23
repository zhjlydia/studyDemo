import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  filterData:[],
  selectItems: [],
  saveItems: [],
  customFilerConfig: []
}

const mutations = {
  M_getFilterData(state,data){
    state.filterData=data;
  },
  M_getcustomFiler(state,data){
    state.customFilerConfig=data;
  }
}

const actions = {
  getFilterData(context,data){
    context.commit("M_getFilterData", data);
  },
  getcustomFiler(context,data){
    var tempData=[];
    data.forEach(function (value, index) {
      var tempObj = {
        key: value.sortvalue,
        isDisabled: false,
        text: value.sortname,
        isChecked: true
      }
      tempData.push(tempObj);
    });
    context.commit("M_getcustomFiler", tempData);
  }
}

const getters = {
   filterFieldAndIsShowRef(state){
     var filterFieldAndIsShowRef = {};
      state.customFilerConfig.forEach(function (value, index) {
        filterFieldAndIsShowRef[value.key] = value.isChecked;
      });
      return filterFieldAndIsShowRef;
   }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})