<template>
<div style="height:800px;width:100%;padding:30px;background:#dfe3ed;">
<div class="control-position market-filter">
    <SelecterFilter :items="filterData" :config="filterConfig" v-on:change="clickSearchBtn"></SelecterFilter>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SelecterFilter from './components/SelectFilter/app'
import netServices from './netservices/net'

export default {
  components:{
    SelecterFilter
  },
  data(){
    return{
      filterData:[],
      filterConfig:{
        isHaveSearchButton:false,
        diffDay:30
      }
    }
  },
  computed: {

  },
  created: function() {
    var that=this;
    that.init();
    that.$store.subscribe(function (mutation, state) {
        if (mutation.type == "M_setsaveItems") {    //监听更改筛选条件的mutation
        console.log(that.$store.state.storeFilter.saveItems);
       }
    })
  },
  methods: {
    init:function(){
      var that=this;
      that.getFilterData();
    },
    getFilterData:function(){
      var that=this;
      netServices.filterDemoServices.GetAuditionFilter({},function(res){
        that.filterData=res.Data;
      })
    },
    clickSearchBtn:function(){
      console.log(this.filterData);
    }

  }
}
</script>
<style>
body{
  
  padding:30px;
}
.font-color1{color:#344c67;font-size:14px;line-height: 30px;}
.control-position{margin-bottom: 25px; text-align: left;}
</style>