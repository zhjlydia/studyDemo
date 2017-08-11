import selectFilter from 'basePath/components/newSelectFilter/filter/app';
import netServices from 'basePath/netservices/net';
var consultBookServices = netServices.consultBook;
var html = require("./template.html");

export default {
  components: {
    selectFilter: selectFilter
  },
  template: html,
  data() {
    return {
      searchTypeList: [{
        value: "StuName",
        text: "学生姓名"
      }, {
        value: "Telphone",
        text: "学生电话"
      }],
      searchParam: {
        SearchKey: "StuName",
        SearchValue: ""
      },
      newFilterData: {}
    }
  },
  computed: {
    searchPlaceHolder() {
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
      consultBookServices.getConsultFilterData().then((res)=> {
        if (res.data.Status) {
          that.newFilterData = that.firstStrlowerCase(res.data.Data);
        }
      });
    },
    //首字母小写
    firstStrlowerCase: function (obj) {
      var strObj = JSON.stringify(obj)
      var strObj2 = strObj.replace(/(\")(\w*)(\"\:)/g, function ($0, $1, $2, $3) {
        return $1 + $2.substring(0, 1).toLowerCase() + $2.substring(1) + $3;
      })
      return JSON.parse(strObj2);
    }
  }
}