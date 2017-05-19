<template>
<div style="height:800px;width:100%;padding:30px;background:#dfe3ed;">
<div class="control-position market-filter">
    <SelecterFilter :items="filterData" :config="filterConfig"></SelecterFilter>
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
        isHaveSearchButton:false
      }
    }
  },
  computed: {

  },
  created: function() {
    var that=this;
    that.init();
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