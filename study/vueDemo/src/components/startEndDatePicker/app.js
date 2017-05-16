import moment from 'moment'
var html = require("./template.html");
export default {
  template: html,
  props: {
    initValue:"",
    config:{
      maxSpace:31
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
    // this.value = [this.config.start, this.config.end];
  },
  methods: {
    dateChange:function(item){
      this.$emit("change",{ dateArr: item });
    }
  }
}