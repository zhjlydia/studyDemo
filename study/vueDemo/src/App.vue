<template>
<div class="control-position market-filter">
    <SelecterFilter :items="filterData"></SelecterFilter>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SelecterFilter from './components/SelectFilter'
import netServices from './netservices/net'

export default {
  components:{
    SelecterFilter
  },
  data(){
    return{
      filterData:[]
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
.font-color1{color:#344c67;font-size:14px;line-height: 30px;}
.control-position{margin-bottom: 25px; text-align: left;}
</style>