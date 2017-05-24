var html = require("./template.html");
export default {
  template: html,
  props: {
    config:{
      type:""
    }
  },
  data() {
    return {
      options: {
        shortcuts: [{
          text: '最近一周',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          }
        }, {
          text: '最近一个月',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          }
        }, {
          text: '最近三个月',
          value() {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          }
        }]
      }
    }
  },
  computed: {
  },
  created() {
    this.dateValue = [this.config.start, this.config.end];
  },
  methods: {
    dateChange:function(item){
      var that=this;
      that.config.start=item[0];
      that.config.end=item[1];
      this.$emit("change",{ dateArr: item,type:this.config.type});
    }
  }
}