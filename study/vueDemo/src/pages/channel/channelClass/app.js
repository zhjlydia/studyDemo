import netServices from 'basePath/netservices/net';
import selectFilter from 'basePath/components/newSelectFilter/filter/app';
var consultBookServices = netServices.consultBook;
var html = require("./template.html");

export default {
  components: {
    selectFilter: selectFilter
  },
  template: html,
  data() {
    return {
      value2: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
      selectData: [{
        value: 'beijing',
        label: '北京',
        children: [{
          value: 'gugong',
          label: '故宫'
        }, {
          value: 'tiantan',
          label: '天坛'
        }, {
          value: 'wangfujing',
          label: '王府井'
        }]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [{
          value: 'nanjing',
          label: '南京',
          children: [{
            value: 'fuzimiao',
            label: '夫子庙',
          }]
        }, {
          value: 'suzhou',
          label: '苏州',
          children: [{
            value: 'zhuozhengyuan',
            label: '拙政园',
          }, {
            value: 'shizilin',
            label: '狮子林',
          }]
        }]
      }],
      cityList: [{
        value: 'beijing',
        label: '北京市'
      }, {
        value: 'shanghai',
        label: '上海市'
      }, {
        value: 'shenzhen',
        label: '深圳市'
      }, {
        value: 'hangzhou',
        label: '杭州市'
      }, {
        value: 'nanjing',
        label: '南京市'
      }, {
        value: 'chongqing',
        label: '重庆市'
      }],
      model10: [],
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
    this.init();
  },
  methods: {
    init() {
      var that = this;
      that.getFilterData();
    },
    changePage(page) {

    },
    changePageSize(pageSize) {

    },
    getFilterData() {
      var that = this;
      consultBookServices.getConsultFilterData().then((res) => {
        if (res.data.Status) {
          that.newFilterData = that.firstStrlowerCase(res.data.Data);
        }
      });
    },
    //首字母小写
    firstStrlowerCase(obj) {
      var strObj = JSON.stringify(obj)
      var strObj2 = strObj.replace(/(\")(\w*)(\"\:)/g, function ($0, $1, $2, $3) {
        return $1 + $2.substring(0, 1).toLowerCase() + $2.substring(1) + $3;
      })
      return JSON.parse(strObj2);
    }
  }
}