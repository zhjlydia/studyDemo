import moment from 'moment'
import startEndDatePicker from './../../components/startEndDatePicker/app'
import pullDownList from './../../components/pullDownList/app'
var html = require("./template.html");
export default {
  components: {
    startEndDatePicker,
    pullDownList
  },
  template: html,
  props: {
    items: {
      type: Array
    },
    differDays: {
      type: Number
    },
    config: {
      isHaveSearchButton: true
    }
  },
  data() {
    return {
      selectItems: [],
      saveItems: [],
      isCompare: true,
      customFilerConfig: [],
      filterFieldAndIsShowRef: {}
      // customFilerConfig:[{
      //           key: "schoolId",
      //           isDisabled: false,
      //           text: "校区",
      //           isChecked: true
      //       },
      //       {
      //           key: "courseId",
      //           isDisabled: false,
      //           text: "课程",
      //           isChecked: true
      //       }]
    }
  },
  computed: {
    sortsData: function () {
      return this.items
    }
  },
  created: function () {
    var that = this;
    that.sortsData.forEach(function (value, index) {
      var tempObj = {
        key: value.sortvalue,
        isDisabled: false,
        text: value.sortname,
        isChecked: true
      }
      that.customFilerConfig.push(tempObj);
    });
    that.resetFilterFieldAndIsShowRef();
  },
  methods: {
    selectThisItem(item, fatherItem) {
      var that = this;
      that.$set(item, 'select', !item.select);
      if (!item.select) {
        var index = that.selectItems.indexOf(item);
        if (index !== -1) {
          that.selectItems.splice(index, 1);
        }
      } else {
        that.selectItems.push(item);
      }
      fatherItem.unLimit = false;
      if (!that.config.isHaveSearchButton) {
        that.emitGoSearch();
      }
    },
    emitGoSearch: _.throttle(function() {
      var that=this;
      that.onSearchBtnClicked();
    }, 2000),
    setDateItem(item) {
      var that = this;
      if (that.differDays > 0) {
        // if(index==0){//开始时间

        // }
      }
      console.log(item);
    },
    delSelectedItem(item) {
      var that = this;
      var index = that.selectItems.indexOf(item);
      if (index !== -1) {
        that.selectItems.splice(index, 1);
      }
      item.select = false;
    },
    clearAll() {
      var that = this;
      that.selectItems.forEach(function (value, index) {
        value.select = false;
      });
      that.selectItems = [];
    },
    unLimit(item) {
      var that = this;
      that.$set(item, 'unLimit', !item.unLimit);
      that.sortsData.forEach(function (value, index) {
        if (value.unLimit) {
          value.lables.forEach(function (item, index) {
            that.delSelectedItem(item);
          })
        }
      })
    },
    compare(item) {
      var that = this;
      that.$set(item, 'isCompare', !item.isCompare);
    },
    toggleShowAll(item) {
      var that = this;
      that.$set(item, 'isShowAll', !item.isShowAll);
    },
    onSearchBtnClicked() {
      var that = this;
      var temparr = [];
      that.saveItems = [];
      var saveObj = {
        type: "",
        value: ""
      }
      that.sortsData.forEach(function (value, index) {
        temparr = [];
        value.lables.forEach(function (item, index) {
          if (item.IsDate) {
            return;
          } else if (item.select) {
            temparr.push(item.lablevalue);
          }
        });
        saveObj = {
          type: value.sortvalue,
          value: temparr.join(",")
        }
        that.saveItems.push(saveObj);
      });
      console.log(that.saveItems);
    },
    changeEvent1(dateArr) {
      console.log(dateArr);
    },
    changeEvent2(dateArr) {
      console.log(dateArr);
    },
    resetFilterFieldAndIsShowRef() {
      var that = this;
      that.filterFieldAndIsShowRef = {};
      that.customFilerConfig.forEach(function (value, index) {
        that.filterFieldAndIsShowRef[value.key] = value.isChecked;
      });
    },
    changeCostomFilterEvent() {
      var that = this;
      that.resetFilterFieldAndIsShowRef();
    }
  }
}