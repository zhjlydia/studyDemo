import selectFilter from 'basePath/components/newSelectFilter/filter/app';
import netServices from 'basePath/netservices/net';
var html = require("./template.html");

export default {
  components: {
    selectFilter: selectFilter
  },
  template: html,
  data() {
    return {
      searchTypeList:[{
        value:"StuName",
        text:"学生姓名"
      },{
        value:"Telphone",
        text:"学生电话"
      }],
      searchParam:{
        SearchKey:"StuName",
        SearchValue:""
      },
      newFilterData: []
    }
  },
  computed: {
    searchPlaceHolder(){
      return "学生姓名"
    }

  },
  created: function () {
    var that = this;
    that.init();
  },
  methods: {
     init: function () {
      var that = this;
      that.getFilterData();
    },
    getFilterData: function () {
      var that = this;
      netServices.filterDemoServices.getSelectFilterData({}, function (res) {
        if(res.Status){
            that.newFilterData = res.Data;
        }
      })
    },
  }
}