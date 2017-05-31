import { mapGetters, mapActions } from 'vuex'
import SelecterFilter from './../../../components/SelectFilter/app'
import netServices from './../../../netservices/net'
var html = require("./template.html");

export default {
  components:{
    SelecterFilter
  },
  template: html,
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