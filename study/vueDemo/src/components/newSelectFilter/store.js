
const state = {
  filterData:[],
  saveItems: [],
  customFilerConfig: []
}

const mutations = {
  M_getFilterData(state,data){
    state.filterData=data;
  },
  M_getcustomFiler(state,data){
    state.customFilerConfig=data;
  },
  M_setsaveItems(state,data){
    state.saveItems=data;
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
  },
  setsaveItems(context,data){
    context.commit("M_setsaveItems", data);
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

export const storeFilter={
  state,
  getters,
  actions,
  mutations
}