
var html = require("./template.html");
export default {
  template: html,
  props: {
    config: {
          type:Array
      }
  },
  data() {
    return {
      isHaveCheckedAllButton:true//是否有选择全部的按钮
    }
  },
  computed: {
    pullData:function(){
          return this.config
    },
      // 读取和设置
    isCheckedAll: {
      // cache: false,
      get: function() {
        for (var i = 0; i < this.pullData.length; i++) {
          if (!this.pullData[i].isChecked) {
            return false;
          }
        }
        return true;
      },
      set: function(value) {
        for (var i = 0; i < this.pullData.length; i++) {
          this.pullData[i].isChecked = value;
        }
      }
    }
  },
  created() {
    // this.value = [this.config.start, this.config.end];
  },
  methods: {
    toggle(item){
      var that=this;
      item.isChecked=!item.isChecked;
    },
    checkedAll(){
      this.isCheckedAll=!this.isCheckedAll;
    }
  }
}