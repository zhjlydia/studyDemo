import SelecterFilter from 'basePath/components/SelectFilter/app'
import netServices from 'basePath/netservices/net'
var html = require("./template.html");

export default {
  components: {
    SelecterFilter
  },
  template: html,
  data() {
    return {
      filterData: [],
      filterConfig: {
        isHaveSearchButton: false,
        diffDay: 30
      },
      customOption: {
        salesMan1: {
          text: "销售员1",
          isSelected: false
        },
        salesMan2: {
          text: "销售员2",
          isSelected: false
        },
        salesMan3: {
          text: "销售员3",
          isSelected: false
        }
      },
      consultList:[{
        StuName:"哈哈",
        salesManList:[{
          Id:1,
          Name:"电话销售"
        },{
          Id:2,
          Name:"销售员"
        },{
          Id:3,
          Name:"采单员"
        }]
      },{
        StuName:"草拟吗",
        salesManList:[{
          Id:1,
          Name:"电话销售"
        },{
          Id:2,
          Name:"销售员"
        },{
          Id:3,
          Name:"采单员"
        }]
      },{
        StuName:"李俊傻逼",
        salesManList:[{
          Id:1,
          Name:"电话销售"
        },{
          Id:2,
          Name:"销售员"
        },{
          Id:3,
          Name:"采单员"
        }]
      }]
    }
  },
  computed: {

  },
  created: function () {
    var that = this;
    that.init();
    that.$store.subscribe(function (mutation, state) {
      if (mutation.type == "M_setsaveItems") {    //监听更改筛选条件的mutation
        console.log(that.$store.state.storeFilter.saveItems);
      }
    })
  },
  methods: {
    init: function () {
      var that = this;
      that.getFilterData();
    },
    getFilterData: function () {
      var that = this;
      netServices.filterDemoServices.GetAuditionFilter({}, function (res) {
        that.filterData = res.Data;
      })
    },
    clickSearchBtn: function () {
      console.log(this.filterData);
    }

  }
}