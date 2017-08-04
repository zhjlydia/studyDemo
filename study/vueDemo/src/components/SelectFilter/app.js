import startEndDatePicker from 'basePath/components/startEndDatePicker/app'
import pullDownList from 'basePath/components/pullDownList/app'
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
    config: {
      isHaveSearchButton: true,
      diffDay:""
    }
  },
  data() {
    return {
      selectItems: [],
      isCompare: true
    }
  },
  computed: {
    sortsData: function () {
      return this.items
    },
    customFilerConfig(){
      return this.$store.state.storeFilter.customFilerConfig;
    },
    filterFieldAndIsShowRef(){
      return this.$store.getters.filterFieldAndIsShowRef;
    }
  },
  created: function () {
    var that = this;
    console.log(that.sortsData);
    console.log(that.$store);
    that.$store.dispatch("getFilterData",that.sortsData);
    that.$store.dispatch("getcustomFiler",that.sortsData);
    
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
        that.onSearchBtnClicked();
      }
    },
    // emitGoSearch: _.throttle(function() {
    //   var that=this;
    //   that.onSearchBtnClicked();
    // }, 2000),
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
      var saveItems = [];
      var saveObj = {
        type: "",
        value: ""
      }
      that.sortsData.forEach(function (value, index) {
        temparr = [];
        value.lables.forEach(function (item, index) {
          if (item.IsDate) {
            temparr.push(item.lablevalue);
          } else if (item.select) {
            temparr.push(item.lablevalue);
          }
        });
        saveObj = {
          type: value.sortvalue,
          value: temparr
        }
        saveItems.push(saveObj);
      });
      that.$store.dispatch("setsaveItems",saveItems);
    },
    changeDateEvent1(dateItem) {
      var that=this;
       that.sortsData.forEach(function (value, index) {
         if(value.sortvalue===dateItem.type){
           value.lables[0].lablevalue=dateItem.dateArr[0];
           value.lables[1].lablevalue=dateItem.dateArr[1];
         }
      });
    },
    changeDateEvent2(dateItem) {
      var that=this;
      that.sortsData.forEach(function (value, index) {
         if(value.sortvalue===dateItem.type){
           value.lables[2].lablevalue=dateItem.dateArr[0];
           value.lables[3].lablevalue=dateItem.dateArr[1];
         }
      });
    }
  }
}